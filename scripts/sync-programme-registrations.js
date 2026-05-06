const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://hayzedboy20_db_user:bridge20@potter-house.eme5gg0.mongodb.net/?appName=potter-house';

// Programme Schema
const programmeSchema = new mongoose.Schema({
  programmeName: String,
  registeredCount: { type: Number, default: 0 },
  capacity: Number,
});

// Registration Schema
const registrationSchema = new mongoose.Schema({
  programmeName: String,
  registrationStatus: String,
});

const Programme = mongoose.model('Programme', programmeSchema, 'programmes');
const ProgrammeRegistration = mongoose.model('ProgrammeRegistration', registrationSchema, 'programmeregistrations');

async function syncProgrammeRegistrations() {
  try {
    console.log('🔄 Starting sync of programme registrations...\n');
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get all unique programme names from registrations with active status
    const registrations = await ProgrammeRegistration.aggregate([
      {
        $match: {
          registrationStatus: { $in: ['pending', 'confirmed'] }
        }
      },
      {
        $group: {
          _id: '$programmeName',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    console.log(`Found ${registrations.length} programmes with active registrations:\n`);

    let updated = 0;
    let syncReport = [];

    for (const reg of registrations) {
      const programme = await Programme.findOne({ programmeName: reg._id });

      if (!programme) {
        console.log(`⚠️  Programme not found: "${reg._id}" (${reg.count} registrations)`);
        continue;
      }

      const oldCount = programme.registeredCount || 0;
      const newCount = reg.count;

      if (oldCount !== newCount) {
        programme.registeredCount = newCount;
        await programme.save();
        updated++;

        console.log(
          `✅ Updated: "${reg._id}"\n   Old: ${oldCount} | New: ${newCount} registrations\n`
        );

        syncReport.push({
          programme: reg._id,
          oldCount,
          newCount,
          capacity: programme.capacity,
          percentFull: programme.capacity
            ? Math.round((newCount / programme.capacity) * 100)
            : 'N/A'
        });
      } else {
        console.log(
          `✓ Already synced: "${reg._id}" (${newCount} registrations)\n`
        );
      }
    }

    // Check for programmes with registeredCount but no active registrations
    const programmesWithCount = await Programme.find({ registeredCount: { $gt: 0 } });

    for (const prog of programmesWithCount) {
      const activeCount = await ProgrammeRegistration.countDocuments({
        programmeName: prog.programmeName,
        registrationStatus: { $in: ['pending', 'confirmed'] }
      });

      if (activeCount === 0 && prog.registeredCount > 0) {
        console.log(
          `🔧 Resetting: "${prog.programmeName}" (was ${prog.registeredCount}, now 0)\n`
        );
        prog.registeredCount = 0;
        await prog.save();
        updated++;
      }
    }

    console.log('\n📊 SYNC REPORT:');
    console.log('═'.repeat(70));
    syncReport.forEach((item) => {
      console.log(`
Programme: ${item.programme}
  Registrations: ${item.newCount} / ${item.capacity || 'Unlimited'}
  Capacity: ${item.percentFull}%
    `);
    });

    console.log('═'.repeat(70));
    console.log(`\n✅ Sync complete! Updated ${updated} programmes\n`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }
}

syncProgrammeRegistrations();
