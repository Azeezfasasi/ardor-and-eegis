import { connectDB } from '@/app/server/db/connect.js';
import Programme from '@/app/server/models/Programme';
import ProgrammeRegistration from '@/app/server/models/ProgrammeRegistration';
import { NextResponse } from 'next/server';

// GET /api/programmes/[id]/enrollments
// Get enrolled users count and details for a programme
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Programme ID is required' },
        { status: 400 }
      );
    }

    // Get programme details
    const programme = await Programme.findById(id);

    if (!programme) {
      return NextResponse.json(
        { success: false, message: 'Programme not found' },
        { status: 404 }
      );
    }

    // Get count of active registrations (pending + confirmed)
    const activeRegistrations = await ProgrammeRegistration.countDocuments({
      programmeName: programme.programmeName,
      registrationStatus: { $in: ['pending', 'confirmed'] },
    });

    // Get all registrations with details
    const registrations = await ProgrammeRegistration.find({
      programmeName: programme.programmeName,
      registrationStatus: { $in: ['pending', 'confirmed'] },
    }).select('believerID firstName lastName email phoneNumber registrationStatus registeredAt');

    // Sync the registered count if different
    if (programme.registeredCount !== activeRegistrations) {
      programme.registeredCount = activeRegistrations;
      await programme.save();
    }

    return NextResponse.json(
      {
        success: true,
        programme: {
          id: programme._id,
          name: programme.programmeName,
          registeredCount: activeRegistrations,
          capacity: programme.capacity,
          isFull: programme.capacity ? activeRegistrations >= programme.capacity : false,
        },
        registrations,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get enrollments error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch enrollments',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// POST /api/programmes/[id]/enrollments/sync
// Manually sync registered count based on active registrations
export async function POST(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Programme ID is required' },
        { status: 400 }
      );
    }

    const programme = await Programme.findById(id);

    if (!programme) {
      return NextResponse.json(
        { success: false, message: 'Programme not found' },
        { status: 404 }
      );
    }

    // Count active registrations
    const count = await ProgrammeRegistration.countDocuments({
      programmeName: programme.programmeName,
      registrationStatus: { $in: ['pending', 'confirmed'] },
    });

    // Update programme
    programme.registeredCount = count;
    await programme.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Enrolled count synced successfully',
        programme: {
          id: programme._id,
          name: programme.programmeName,
          registeredCount: count,
          capacity: programme.capacity,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Sync enrollments error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to sync enrolled count',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
