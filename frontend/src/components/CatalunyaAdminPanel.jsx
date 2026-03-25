import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Settings, FileText, LayoutGrid, Save, Pencil, Trash2, Plus, Eye, EyeOff } from 'lucide-react';

var API = process.env.REACT_APP_BACKEND_URL;

export default function CatalunyaAdminPanel() {
  var tabState = useState('courses');
  var tab = tabState[0];
  var setTab = tabState[1];

  return (
    <div className="min-h-screen bg-stone-50" data-testid="admin-panel">
      {/* Admin Navbar */}
      <nav className="sticky top-0 z-40 bg-[#1a1a1a] shadow-lg">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-white/60 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#CCFF00]" />
              <h1 className="text-white font-bold text-lg">Admin Panel</h1>
            </div>
          </div>
          <Link to="/" className="text-sm text-white/60 hover:text-white transition-colors">
            Back to Site
          </Link>
        </div>
      </nav>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-6">
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm border border-stone-200 w-fit">
          <button
            onClick={function() { setTab('courses'); }}
            className={'px-5 py-2.5 rounded-lg text-sm font-medium transition-all ' + (tab === 'courses' ? 'bg-[#1a1a1a] text-[#CCFF00] shadow-sm' : 'text-stone-600 hover:bg-stone-50')}
            data-testid="admin-tab-courses"
          >
            <span className="flex items-center gap-2"><LayoutGrid className="w-4 h-4" /> Course Cards</span>
          </button>
          <button
            onClick={function() { setTab('blog'); }}
            className={'px-5 py-2.5 rounded-lg text-sm font-medium transition-all ' + (tab === 'blog' ? 'bg-[#1a1a1a] text-[#CCFF00] shadow-sm' : 'text-stone-600 hover:bg-stone-50')}
            data-testid="admin-tab-blog"
          >
            <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Blog Posts</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        {tab === 'courses' && <CoursesTab />}
        {tab === 'blog' && <BlogTab />}
      </div>
    </div>
  );
}

function CoursesTab() {
  var coursesState = useState([]);
  var courses = coursesState[0];
  var setCourses = coursesState[1];
  var loadingState = useState(true);
  var loading = loadingState[0];
  var setLoading = loadingState[1];
  var editState = useState(null);
  var editingId = editState[0];
  var setEditingId = editState[1];
  var editDataState = useState({});
  var editData = editDataState[0];
  var setEditData = editDataState[1];

  useEffect(function() {
    fetchCourses();
  }, []);

  function fetchCourses() {
    setLoading(true);
    axios.get(API + '/api/catalunya-courses?include_inactive=true')
      .then(function(res) { setCourses(res.data); })
      .catch(function(err) { console.error(err); })
      .finally(function() { setLoading(false); });
  }

  function startEdit(course) {
    setEditingId(course.id);
    setEditData({
      name: course.name,
      location: course.location,
      price_from: course.price_from,
      holes: course.holes,
      par: course.par,
      active: course.active,
      booking_url: course.booking_url
    });
  }

  function saveEdit(courseId) {
    axios.patch(API + '/api/admin/catalunya-course/' + courseId, editData)
      .then(function() {
        setEditingId(null);
        fetchCourses();
      })
      .catch(function(err) { alert('Error saving: ' + err.message); });
  }

  function toggleActive(courseId, currentActive) {
    axios.patch(API + '/api/admin/catalunya-course/' + courseId, { active: !currentActive })
      .then(function() { fetchCourses(); })
      .catch(function(err) { alert('Error: ' + err.message); });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-stone-300 border-t-[#CCFF00] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4" data-testid="admin-courses-list">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-stone-900">Course Cards ({courses.length})</h2>
      </div>
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Course</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Location</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Holes</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Price</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {courses.map(function(course) {
                var isEditing = editingId === course.id;
                return (
                  <tr key={course.id} className={'hover:bg-stone-50/50 transition-colors ' + (!course.active ? 'opacity-50' : '')}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={course.image} alt="" className="w-12 h-9 rounded-lg object-cover" />
                        {isEditing ? (
                          <input
                            type="text"
                            value={editData.name}
                            onChange={function(e) { setEditData(Object.assign({}, editData, { name: e.target.value })); }}
                            className="text-sm font-medium text-stone-900 border border-stone-300 rounded px-2 py-1 w-full"
                          />
                        ) : (
                          <span className="text-sm font-medium text-stone-900">{course.name}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.location}
                          onChange={function(e) { setEditData(Object.assign({}, editData, { location: e.target.value })); }}
                          className="text-sm border border-stone-300 rounded px-2 py-1 w-full"
                        />
                      ) : (
                        <span className="text-sm text-stone-600">{course.location}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm text-stone-600">{course.holes}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editData.price_from}
                          onChange={function(e) { setEditData(Object.assign({}, editData, { price_from: parseInt(e.target.value) || 0 })); }}
                          className="text-sm border border-stone-300 rounded px-2 py-1 w-20 text-center"
                        />
                      ) : (
                        <span className="text-sm font-medium text-stone-800">&euro;{course.price_from}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={function() { toggleActive(course.id, course.active); }}
                        className={'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ' + (course.active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200')}
                        data-testid={'toggle-active-' + course.id}
                      >
                        {course.active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {course.active ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {isEditing ? (
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={function() { saveEdit(course.id); }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#CCFF00] text-black rounded-lg text-xs font-medium hover:bg-[#DFFF00] transition-colors"
                          >
                            <Save className="w-3 h-3" /> Save
                          </button>
                          <button
                            onClick={function() { setEditingId(null); }}
                            className="px-3 py-1.5 text-stone-500 hover:text-stone-800 text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={function() { startEdit(course); }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg text-xs transition-colors"
                          data-testid={'edit-course-' + course.id}
                        >
                          <Pencil className="w-3 h-3" /> Edit
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function BlogTab() {
  return (
    <div className="space-y-4" data-testid="admin-blog-list">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-stone-900">Blog Posts</h2>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] text-[#CCFF00] rounded-lg text-sm font-medium hover:bg-black/80 transition-colors" data-testid="add-blog-btn">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>
      <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
        <FileText className="w-12 h-12 text-stone-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-stone-700 mb-2">Blog Management Coming Soon</h3>
        <p className="text-sm text-stone-500 max-w-md mx-auto">
          This section will allow you to create, edit, and publish blog posts for GOLFGATE Catalunya. Similar to the GIM blog system.
        </p>
      </div>
    </div>
  );
}
