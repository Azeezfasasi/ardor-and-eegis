import CompanyOverview from '../models/CompanyOverview.js';
import { connectDB } from '../db/connect.js';

const DEFAULT_COMPANY_OVERVIEW = {
  companyInfo: {
    title: 'Who We Are',
    image: '/images/fibre1.jpeg',
    paragraphs: [
      {
        text: 'Ardor Aegis security company is a dynamic strong protector and a trusted partner in the security industry. We are committed to providing top-notch security solutions that safeguard our clients\' assets, people, and information. With a team of highly trained professionals and cutting-edge technology, we offer comprehensive security services tailored to meet the unique needs of each client.',
        order: 0,
      },
      {
        text: 'We understand that security is not just about protection; it\'s about peace of mind. That\'s why we go above and beyond to ensure that our clients feel safe and secure in their environments. Whether it\'s physical security, cybersecurity, or risk management, we are dedicated to delivering exceptional service and innovative solutions that exceed expectations.',
        order: 1,
      },
      {
        text: 'Our commitment to excellence, integrity, and customer satisfaction drives us to continuously improve and adapt to the ever-evolving security landscape. At Ardor Aegis, we are not just a security company; we are a partner you can trust to protect what matters most.',
        order: 2,
      },
      {
        text: 'With a strong focus on professionalism, reliability, and client-centric solutions, Ardor Aegis is your go-to security company for all your protection needs. We are proud to serve a diverse range of clients across various industries, and we look forward to continuing to provide exceptional security services that make a difference.',
        order: 3,
      },
    ],
  },
  vision: {
    title: 'Our Vision',
    description: 'To Be the Leading Security Company Known for Excellence, Innovation, and Unwavering Commitment to Protecting Our Clients\' Assets and People.',
  },
  mission: {
    title: 'Our Mission',
    description: 'To Provide Comprehensive, Tailored Security Solutions That Ensure the Safety and Peace of Mind of Our Clients, While Upholding the Highest Standards of Integrity, Professionalism, and Customer Satisfaction.',
  },
  coreValues: [
    { name: 'Excellence', description: 'We strive for the highest standards in everything we do.', color: 'indigo', order: 0 },
    { name: 'Integrity', description: 'We act with honesty and transparency in all our dealings.', color: 'blue', order: 1 },
    { name: 'Innovation', description: 'We embrace new ideas and technologies to stay ahead.', color: 'green', order: 2 },
    { name: 'Professionalism', description: 'We maintain the highest standards of professionalism in all our activities.', color: 'yellow', order: 3 },
    { name: 'Customer-centric', description: 'We prioritize our clients\' needs and satisfaction in everything we do.', color: 'pink', order: 4 },
  ],
};

export async function getCompanyOverview() {
  try {
    await connectDB();

    let overviewData = await CompanyOverview.findOne();

    if (!overviewData) {
      overviewData = await CompanyOverview.create(DEFAULT_COMPANY_OVERVIEW);
    }

    return {
      success: true,
      data: overviewData,
    };
  } catch (error) {
    console.error('Error fetching company overview:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function updateCompanyOverview(updateData) {
  try {
    await connectDB();

    let overviewData = await CompanyOverview.findOne();

    if (!overviewData) {
      overviewData = await CompanyOverview.create(DEFAULT_COMPANY_OVERVIEW);
    }

    // Update fields
    if (updateData.companyInfo) {
      overviewData.companyInfo = updateData.companyInfo;
    }
    if (updateData.vision) {
      overviewData.vision = updateData.vision;
    }
    if (updateData.mission) {
      overviewData.mission = updateData.mission;
    }
    if (updateData.coreValues) {
      overviewData.coreValues = updateData.coreValues;
    }

    overviewData.updatedAt = new Date();
    await overviewData.save();

    return {
      success: true,
      data: overviewData,
    };
  } catch (error) {
    console.error('Error updating company overview:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function updateCompanyInfo(companyInfoData) {
  try {
    await connectDB();

    let overviewData = await CompanyOverview.findOne();
    if (!overviewData) {
      overviewData = await CompanyOverview.create(DEFAULT_COMPANY_OVERVIEW);
    }

    overviewData.companyInfo = companyInfoData;
    overviewData.updatedAt = new Date();
    await overviewData.save();

    return {
      success: true,
      data: overviewData,
    };
  } catch (error) {
    console.error('Error updating company info:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function updateVision(visionData) {
  try {
    await connectDB();

    let overviewData = await CompanyOverview.findOne();
    if (!overviewData) {
      overviewData = await CompanyOverview.create(DEFAULT_COMPANY_OVERVIEW);
    }

    overviewData.vision = visionData;
    overviewData.updatedAt = new Date();
    await overviewData.save();

    return {
      success: true,
      data: overviewData,
    };
  } catch (error) {
    console.error('Error updating vision:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function updateMission(missionData) {
  try {
    await connectDB();

    let overviewData = await CompanyOverview.findOne();
    if (!overviewData) {
      overviewData = await CompanyOverview.create(DEFAULT_COMPANY_OVERVIEW);
    }

    overviewData.mission = missionData;
    overviewData.updatedAt = new Date();
    await overviewData.save();

    return {
      success: true,
      data: overviewData,
    };
  } catch (error) {
    console.error('Error updating mission:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function updateCoreValues(coreValuesData) {
  try {
    await connectDB();

    let overviewData = await CompanyOverview.findOne();
    if (!overviewData) {
      overviewData = await CompanyOverview.create(DEFAULT_COMPANY_OVERVIEW);
    }

    overviewData.coreValues = coreValuesData;
    overviewData.updatedAt = new Date();
    await overviewData.save();

    return {
      success: true,
      data: overviewData,
    };
  } catch (error) {
    console.error('Error updating core values:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}
