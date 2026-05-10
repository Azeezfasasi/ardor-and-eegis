'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

// Toast Component
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg text-white font-semibold z-50 animate-slideIn ${
        type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
      }`}
    >
      {type === 'success' && '✓'} {type === 'error' && '✕'} {type === 'info' && 'ℹ'} {message}
    </div>
  );
}

export default function ManageMessageSlider() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    content: '',
    description: '',
    isActive: true,
    priority: 0,
    backgroundColor: '#6B21A8',
    textColor: '#FFFFFF',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
  });

  // Fetch messages
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/message?admin=true&limit=100');
      if (response.data.success) {
        setMessages(response.data.messages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      showToast('Failed to load messages', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.content.trim()) {
      showToast('Message content is required', 'error');
      return;
    }

    if (!user || !user._id) {
      showToast('You must be logged in to create messages', 'error');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...formData,
        userId: user._id || user.id,
        messageId: editingId,
      };

      if (editingId) {
        // Update
        await axios.put('/api/message', payload);
        showToast('Message updated successfully!', 'success');
      } else {
        // Create
        await axios.post('/api/message', payload);
        showToast('Message created successfully!', 'success');
      }

      setFormData({
        content: '',
        description: '',
        isActive: true,
        priority: 0,
        backgroundColor: '#6B21A8',
        textColor: '#FFFFFF',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
      });
      setEditingId(null);
      setShowModal(false);
      fetchMessages();
    } catch (error) {
      console.error('Error saving message:', error);
      const errorMsg = error.response?.data?.message || 'Error saving message. Please try again.';
      showToast(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (message) => {
    setFormData({
      content: message.content,
      description: message.description || '',
      isActive: message.isActive,
      priority: message.priority,
      backgroundColor: message.backgroundColor,
      textColor: message.textColor,
      startDate: new Date(message.startDate).toISOString().split('T')[0],
      endDate: message.endDate ? new Date(message.endDate).toISOString().split('T')[0] : '',
    });
    setEditingId(message._id);
    setShowModal(true);
  };

  const handleDelete = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      setLoading(true);
      await axios.delete(`/api/message?messageId=${messageId}`);
      showToast('Message deleted successfully!', 'success');
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
      showToast('Error deleting message. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      content: '',
      description: '',
      isActive: true,
      priority: 0,
      backgroundColor: '#6B21A8',
      textColor: '#FFFFFF',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Message Slider</h1>
        <p className="text-gray-600">Create and manage news/messages that display on the landing page marquee</p>
      </div>

      {/* Add New Message Button */}
      <button
        onClick={() => setShowModal(true)}
        className="mb-6 bg-[#7B542F] hover:bg-[#7B542F]/80 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-200"
      >
        + Add New Message
      </button>

      {/* Message Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingId ? 'Edit Message' : 'Create New Message'}
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Enter the message content (max 500 characters)"
                  maxLength="500"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#7B542F] resize-none"
                  rows="3"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.content.length}/500</p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description (optional)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Add a brief description or additional context"
                  maxLength="1000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#7B542F] resize-none"
                  rows="2"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.description.length}/1000</p>
              </div>

              {/* Colors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Background Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      name="backgroundColor"
                      value={formData.backgroundColor}
                      onChange={handleInputChange}
                      className="h-12 w-20 border-2 border-gray-200 rounded cursor-pointer"
                    />
                    <span className="text-gray-600">{formData.backgroundColor}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Text Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      name="textColor"
                      value={formData.textColor}
                      onChange={handleInputChange}
                      className="h-12 w-20 border-2 border-gray-200 rounded cursor-pointer"
                    />
                    <span className="text-gray-600">{formData.textColor}</span>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#7B542F]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    End Date (optional)
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#7B542F]"
                  />
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Priority (higher numbers show first)
                </label>
                <input
                  type="number"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  min="0"
                  max="1000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#7B542F]"
                />
              </div>

              {/* Active Status */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  id="isActive"
                  className="w-5 h-5 cursor-pointer"
                />
                <label htmlFor="isActive" className="text-sm font-semibold text-gray-700 cursor-pointer">
                  Active (Message will be displayed)
                </label>
              </div>

              {/* Preview */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-3">Preview:</p>
                <div
                  className="p-4 rounded text-sm font-medium"
                  style={{
                    backgroundColor: formData.backgroundColor,
                    color: formData.textColor,
                  }}
                >
                  📢 {formData.content || 'Your message here'}
                  {formData.description && <div className="text-xs mt-2">• {formData.description}</div>}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#7B542F] hover:bg-[#7B542F]/80 text-white font-bold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingId ? 'Update Message' : 'Create Message'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Messages List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            Messages ({messages.length})
          </h2>
        </div>

        {loading && !showModal ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#7B542F]"></div>
            <p className="mt-2 text-gray-600">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="p-8 text-center text-gray-600">
            <p className="text-lg">No messages yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Content</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Priority</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Start Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Created By</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: message.backgroundColor }}
                        />
                        <div className="line-clamp-2 text-sm text-gray-800">{message.content}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          message.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {message.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-semibold">{message.priority}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(message.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {message.createdBy?.firstName} {message.createdBy?.lastName}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(message)}
                          className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-2 px-3 rounded transition duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(message._id)}
                          className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2 px-3 rounded transition duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
