import WhyRayob from "../models/WhyRayob";
import { connectDB } from "../../server/db/connect";

// GET all why rayob content
export async function getWhyRayobContent() {
  await connectDB();
  let content = await WhyRayob.findOne();

  // Initialize if doesn't exist
  if (!content) {
    const defaultReasons = [
      {
        id: 1,
        title: "Unmatched Expertise in Security Solutions",
        description:
          "Ardor Aegis boasts a team of highly skilled professionals with extensive experience across security and protection..",
        icon: "Zap",
        order: 1,
      },
      {
        id: 2,
        title: "Proven Track Record of Successful Project Delivery",
        description:
          "With a portfolio of successful projects across various sectors, Ardor Aegis has consistently demonstrated its ability to deliver high-quality security solutions that meet and exceed client expectations.",
        icon: "Target",
        order: 2,
      },
      {
        id: 3,
        title: "Strong Project Management and Delivery Discipline",
        description:
          "Ardor Aegis employs rigorous security approaches and disciplined execution to ensure that communities are protected.",
        icon: "Briefcase",
        order: 3,
      },
      {
        id: 4,
        title: "Commitment to Quality, Safety, and Compliance",
        description:
          "Quality assurance and safety are non-negotiable at Ardor Aegis. The company adheres to the highest industry standards and regulatory requirements, ensuring that all projects are executed with a strong focus on safety, reliability, and compliance.",
        icon: "Shield",
        order: 4,
      },
      {
        id: 5,
        title: "Client-Centric and Solution-Driven Approach",
        description:
          "Ardor Aegis prioritizes client satisfaction and works closely with clients to understand their unique security needs. The company is dedicated to providing tailored solutions that address specific challenges and deliver tangible results, fostering long-term partnerships based on trust and mutual success.",
        icon: "Users",
        order: 5,
      },
      {
        id: 6,
        title: "Strong Technical Leadership and Skilled Workforce",
        description:
          "Ardor Aegis is led by experienced professionals with deep industry knowledge and a commitment to excellence. The company invests in continuous training and development to ensure that its workforce remains at the forefront of security technology and best practices.",
        icon: "Target",
        order: 6,
      },
      {
        id: 7,
        title: "Integrity, Reliability, and Long-Term Partnership Focus",
        description:
          "Ardor Aegis operates with a strong culture of integrity, professionalism, and accountability. Clients can rely on honest communication, dependable delivery, and ethical business practices, making Ardor Aegis not just a service provider, but a trusted partner in security solutions.",
        icon: "Handshake",
        order: 7,
      },
    ];

    content = await WhyRayob.create({
      reasons: defaultReasons,
    });
  }

  return content;
}

// UPDATE heading and subheading
export async function updateWhyRayobHeading(data) {
  await connectDB();

  let content = await WhyRayob.findOne();
  if (!content) {
    content = await WhyRayob.create(data);
  } else {
    if (data.heading) content.heading = data.heading;
    if (data.subheading) content.subheading = data.subheading;
    await content.save();
  }

  return content;
}

// CREATE new reason
export async function createReason(reasonData) {
  await connectDB();

  const newReason = {
    ...reasonData,
  };

  let content = await WhyRayob.findOne();
  if (!content) {
    content = await WhyRayob.create({ reasons: [newReason] });
  } else {
    const nextId = Math.max(...content.reasons.map((r) => r.id || 0), 0) + 1;
    const maxOrder =
      content.reasons.length > 0
        ? Math.max(...content.reasons.map((r) => r.order || 0))
        : 0;

    newReason.id = nextId;
    newReason.order = maxOrder + 1;
    content.reasons.push(newReason);
    await content.save();
  }

  return newReason;
}

// UPDATE reason
export async function updateReason(reasonId, reasonData) {
  await connectDB();

  const content = await WhyRayob.findOne();
  if (!content) {
    throw new Error("WhyRayob content not found");
  }

  const reason = content.reasons.id(reasonId);
  if (!reason) {
    throw new Error("Reason not found");
  }

  if (reasonData.title) reason.title = reasonData.title;
  if (reasonData.description) reason.description = reasonData.description;
  if (reasonData.icon) reason.icon = reasonData.icon;

  await content.save();
  return reason;
}

// DELETE reason
export async function deleteReason(reasonId) {
  await connectDB();

  const content = await WhyRayob.findOne();
  if (!content) {
    throw new Error("WhyRayob content not found");
  }

  content.reasons.id(reasonId).deleteOne();
  await content.save();

  return { success: true };
}

// REORDER reasons
export async function reorderReasons(reorderedReasons) {
  await connectDB();

  const content = await WhyRayob.findOne();
  if (!content) {
    throw new Error("WhyRayob content not found");
  }

  // Update order for each reason
  reorderedReasons.forEach((item) => {
    const reason = content.reasons.id(item._id);
    if (reason) {
      reason.order = item.order;
      reason.id = item.id;
    }
  });

  await content.save();
  return content;
}

// UPDATE CTA content
export async function updateCTAContent(data) {
  await connectDB();

  let content = await WhyRayob.findOne();
  if (!content) {
    content = await WhyRayob.create(data);
  } else {
    if (data.ctaHeading) content.ctaHeading = data.ctaHeading;
    if (data.ctaDescription) content.ctaDescription = data.ctaDescription;
    if (data.ctaButton1) content.ctaButton1 = data.ctaButton1;
    if (data.ctaButton2) content.ctaButton2 = data.ctaButton2;
    await content.save();
  }

  return content;
}
