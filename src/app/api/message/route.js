import { connectDB } from '@/app/server/db/connect';
import Message from '@/app/server/models/Message';
import User from '@/app/server/models/User';
import { NextResponse } from 'next/server';

// GET - Fetch all active messages or all messages (admin)
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get('admin') === 'true';
    const limit = parseInt(searchParams.get('limit')) || 10;
    const page = parseInt(searchParams.get('page')) || 1;
    const skip = (page - 1) * limit;

    let query = {};

    // For non-admin users, only show active messages
    if (!isAdmin) {
      query.isActive = true;
      query.startDate = { $lte: new Date() };
      query.$or = [{ endDate: null }, { endDate: { $gte: new Date() } }];
    }

    const messages = await Message.find(query)
      .populate('createdBy', 'firstName lastName email')
      .populate('updatedBy', 'firstName lastName email')
      .sort({ priority: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalCount = await Message.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json(
      {
        success: true,
        messages,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          limit,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get messages error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch messages',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// POST - Create new message (admin only)
export async function POST(req) {
  try {
    await connectDB();

    const { content, description, isActive, priority, backgroundColor, textColor, startDate, endDate, userId } = await req.json();

    // Basic validation
    if (!content || !userId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: content, userId',
        },
        { status: 400 }
      );
    }

    const newMessage = new Message({
      content,
      description,
      isActive: isActive ?? true,
      priority: priority ?? 0,
      backgroundColor: backgroundColor || '#6B21A8',
      textColor: textColor || '#FFFFFF',
      startDate: startDate || new Date(),
      endDate,
      createdBy: userId,
    });

    await newMessage.save();
    await newMessage.populate('createdBy', 'firstName lastName email');

    return NextResponse.json(
      {
        success: true,
        message: 'Message created successfully',
        data: newMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create message error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create message',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// PUT - Update message (admin only)
export async function PUT(req) {
  try {
    await connectDB();

    const { messageId, content, description, isActive, priority, backgroundColor, textColor, startDate, endDate, userId } = await req.json();

    if (!messageId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Message ID is required',
        },
        { status: 400 }
      );
    }

    const updateData = {
      ...(content && { content }),
      ...(description !== undefined && { description }),
      ...(isActive !== undefined && { isActive }),
      ...(priority !== undefined && { priority }),
      ...(backgroundColor && { backgroundColor }),
      ...(textColor && { textColor }),
      ...(startDate && { startDate }),
      ...(endDate !== undefined && { endDate }),
      ...(userId && { updatedBy: userId }),
    };

    const updatedMessage = await Message.findByIdAndUpdate(messageId, updateData, { new: true }).populate('createdBy', 'firstName lastName email').populate('updatedBy', 'firstName lastName email');

    if (!updatedMessage) {
      return NextResponse.json(
        {
          success: false,
          message: 'Message not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message updated successfully',
        data: updatedMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update message error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update message',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete message (admin only)
export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const messageId = searchParams.get('messageId');

    if (!messageId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Message ID is required',
        },
        { status: 400 }
      );
    }

    const deletedMessage = await Message.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return NextResponse.json(
        {
          success: false,
          message: 'Message not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete message error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete message',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
