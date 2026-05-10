import { authenticate, isAdmin } from "@/app/server/middleware/auth.js";
import User from "@/app/server/models/User.js";
import Programme from "@/app/server/models/Programme.js";
import ProgrammeRegistration from "@/app/server/models/ProgrammeRegistration.js";
import { Subscriber } from "@/app/server/models/Newsletter.js";
import Blog from "@/app/server/models/Blog.js";
import Quote from "@/app/server/models/Quote.js";
import Contact from "@/app/server/models/Contact.js";
import { connectDB } from "@/app/server/db/connect.js";
import { NextResponse } from "next/server";


// GET /api/dashboard/stats
// Fetch aggregated statistics from all collections
export async function GET(req) {
  return authenticate(req, async () => {
    return isAdmin(req, async () => {
      try {
        await connectDB();

        // Fetch counts from all collections in parallel
        const [
          activeUsersCount,
          adminsCount,
          staffMembersCount,
          totalBlogsCount,
          pendingQuoteRequestsCount,
          pendingContactFormsCount,
          totalSubscribersCount,
        ] = await Promise.all([
          // Active users: exclude admins (matching old logic)
          User.countDocuments({ isActive: true, role: { $ne: "admin" } }),
          User.countDocuments({ role: "admin" }),
          User.countDocuments({ role: "staff-member" }),
          // Total blogs (published)
          Blog.countDocuments({ status: "published" }),
          Quote.countDocuments({ status: "pending" }),
          Contact.countDocuments({ status: "pending" }),
          Subscriber.countDocuments({ subscriptionStatus: "active" }),
        ]);

        const stats = {
          activeUsers: activeUsersCount,
          admins: adminsCount,
          staffMembers: staffMembersCount,
          totalBlogs: totalBlogsCount,
          pendingQuoteRequests: pendingQuoteRequestsCount,
          pendingContactForms: pendingContactFormsCount,
          totalSubscribers: totalSubscribersCount,
        };



        return NextResponse.json(
          {
            success: true,
            stats,
            timestamp: new Date().toISOString(),
          },
          { status: 200 }
        );
      } catch (error) {
        console.error("Dashboard stats error:", error);
        return NextResponse.json(
          {
            success: false,
            message: "Failed to fetch dashboard statistics",
            error: error.message,
          },
          { status: 500 }
        );
      }
    });
  });
}
