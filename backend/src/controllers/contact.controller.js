const Contact = require('../models/Contact');
const ApiResponse = require('../utils/ApiResponse');
const { getPagination, getPaginationData } = require('../utils/pagination');
const sendEmail = require('../utils/sendEmail');

/**
 * @desc    Submit a new contact form inquiry
 * @route   POST /api/contacts
 * @access  Public
 */
const submitContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    // Attempt to send notification email to admin — non-blocking
    try {
      await sendEmail({
        to: process.env.SMTP_USER,
        subject: `New Contact Inquiry from ${contact.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Phone:</strong> ${contact.phone || 'N/A'}</p>
          <p><strong>Subject:</strong> ${contact.subject || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${contact.message}</p>
        `,
      });
    } catch (emailError) {
      console.warn('Failed to send contact notification email:', emailError.message);
    }

    return ApiResponse.success(res, 201, 'Contact inquiry submitted successfully', {
      contact,
    });
  } catch (error) {
    console.error('Submit contact error:', error.message);
    return ApiResponse.error(res, 500, 'Server error submitting contact inquiry');
  }
};

/**
 * @desc    Get all contacts with pagination and optional status filter
 * @route   GET /api/contacts
 * @access  Private (Admin only)
 */
const getAllContacts = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);

    // Build filter object
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // Execute query with pagination
    const [contacts, total] = await Promise.all([
      Contact.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Contact.countDocuments(filter),
    ]);

    return ApiResponse.success(res, 200, 'Contacts fetched successfully', {
      contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get all contacts error:', error.message);
    return ApiResponse.error(res, 500, 'Server error fetching contacts');
  }
};

/**
 * @desc    Get a single contact by ID
 * @route   GET /api/contacts/:id
 * @access  Private (Admin only)
 */
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return ApiResponse.error(res, 404, 'Contact not found');
    }

    return ApiResponse.success(res, 200, 'Contact fetched successfully', {
      contact,
    });
  } catch (error) {
    console.error('Get contact by ID error:', error.message);
    return ApiResponse.error(res, 500, 'Server error fetching contact');
  }
};

/**
 * @desc    Update contact status and/or notes
 * @route   PUT /api/contacts/:id
 * @access  Private (Admin only)
 */
const updateContact = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return ApiResponse.error(res, 404, 'Contact not found');
    }

    return ApiResponse.success(res, 200, 'Contact updated successfully', {
      contact,
    });
  } catch (error) {
    console.error('Update contact error:', error.message);
    return ApiResponse.error(res, 500, 'Server error updating contact');
  }
};

/**
 * @desc    Delete a contact
 * @route   DELETE /api/contacts/:id
 * @access  Private (Admin only)
 */
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return ApiResponse.error(res, 404, 'Contact not found');
    }

    return ApiResponse.success(res, 200, 'Contact deleted successfully');
  } catch (error) {
    console.error('Delete contact error:', error.message);
    return ApiResponse.error(res, 500, 'Server error deleting contact');
  }
};

/**
 * @desc    Get contact statistics (count by status, total, last 30 days)
 * @route   GET /api/contacts/stats
 * @access  Private (Admin only)
 */
const getContactStats = async (req, res) => {
  try {
    // Count contacts grouped by status
    const statusCounts = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Total count of all contacts
    const total = await Contact.countDocuments();

    // Count of contacts from the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const last30Days = await Contact.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    });

    // Format status counts into a cleaner object
    const byStatus = {};
    statusCounts.forEach((item) => {
      byStatus[item._id] = item.count;
    });

    return ApiResponse.success(res, 200, 'Contact stats fetched successfully', {
      stats: {
        total,
        last30Days,
        byStatus,
      },
    });
  } catch (error) {
    console.error('Get contact stats error:', error.message);
    return ApiResponse.error(res, 500, 'Server error fetching contact stats');
  }
};

module.exports = {
  submitContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  getContactStats,
};
