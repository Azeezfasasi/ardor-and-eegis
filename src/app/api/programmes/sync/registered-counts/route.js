import { connectDB } from '@/app/server/db/connect.js';
import Programme from '@/app/server/models/Programme';
import ProgrammeRegistration from '@/app/server/models/ProgrammeRegistration';
import { NextResponse } from 'next/server';

// POST /api/programmes/sync/registered-counts
// Recalculate and sync all programme registered counts
export async function POST(req) {
  try {
    await connectDB();

    // Get all unique programme names
    const programmes = await Programme.find({});

    if (programmes.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: 'No programmes to sync',
          updated: 0,
        },
        { status: 200 }
      );
    }

    let updated = 0;

    // For each programme, recalculate registered count
    for (const programme of programmes) {
      const count = await ProgrammeRegistration.countDocuments({
        programmeName: programme.programmeName,
        registrationStatus: { $in: ['pending', 'confirmed'] },
      });

      if (programme.registeredCount !== count) {
        programme.registeredCount = count;
        await programme.save();
        updated++;
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `Synced registered counts for ${programmes.length} programmes`,
        updated,
        total: programmes.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Sync registered counts error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to sync registered counts',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// GET /api/programmes/sync/registered-counts
// Get sync status and details for all programmes
export async function GET(req) {
  try {
    await connectDB();

    const programmes = await Programme.find({}).select('programmeName registeredCount capacity');

    const syncDetails = await Promise.all(
      programmes.map(async (programme) => {
        const actualCount = await ProgrammeRegistration.countDocuments({
          programmeName: programme.programmeName,
          registrationStatus: { $in: ['pending', 'confirmed'] },
        });

        return {
          name: programme.programmeName,
          storedCount: programme.registeredCount || 0,
          actualCount,
          capacity: programme.capacity,
          isSynced: programme.registeredCount === actualCount,
        };
      })
    );

    const outOfSync = syncDetails.filter((p) => !p.isSynced);

    return NextResponse.json(
      {
        success: true,
        total: syncDetails.length,
        synced: syncDetails.filter((p) => p.isSynced).length,
        outOfSync: outOfSync.length,
        programmes: syncDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get sync status error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to get sync status',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
