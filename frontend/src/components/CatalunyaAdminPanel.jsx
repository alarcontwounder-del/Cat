import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Settings, FileText, LayoutGrid, Save, Pencil, Plus, Eye, EyeOff, Lock, LogOut, X, Trash2 } from 'lucide-react';

var API = process.env.REACT_APP_BACKEND_URL;
var ADMIN_USER = 'admin';
var ADMIN_PASS = 'golfgate2026';

export default function CatalunyaAdminPanel() {
  var authState = useState(false);
  var isAuth = authState[0];
  var setIsAuth = authState[1];
  var tabState = useState('courses');
  var tab = tabState[0];
  var setTab = tabState[1];

  // Check session
  useEffect(function() {
    var session = sessionStorage.getItem('golfgate_admin');
    if (session === 'true') setIsAuth(true);
  }, []);

  function handleLogout() {
    sessionStorage.removeItem('golfgate_admin');
    setIsAuth(false);
  }

  if (!isAuth) return <AdminLogin onSuccess={function() { sessionStorage.setItem('golfgate_admin', 'true'); setIsAuth(true); }} />;

  return (
    <div className="min-h-screen bg-stone-50" data-testid="admin-panel">
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
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </nav>

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

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        {tab === 'courses' && <CoursesTab />}
        {tab === 'blog' && <BlogTab />}
      </div>
    </div>
  );
}

function AdminLogin(props) {
  var userState = useState('');
  var user = userState[0];
  var setUser = userState[1];
  var passState = useState('');
  var pass = passState[0];
  var setPass = passState[1];
  var errorState = useState('');
  var error = errorState[0];
  var setError = errorState[1];

  function handleSubmit(e) {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      props.onSuccess();
    } else {
      setError('Invalid credentials');
    }
  }

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4" data-testid="admin-login">
      <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-[#1a1a1a] rounded-xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-[#CCFF00]" />
          </div>
          <h2 className="font-heading text-2xl text-stone-900 mb-1">Admin Access</h2>
          <p className="text-stone-500 text-sm">GOLFGATE Catalunya</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1.5">Username</label>
            <input
              type="text"
              value={user}
              onChange={function(e) { setUser(e.target.value); setError(''); }}
              className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent"
              placeholder="Enter username"
              data-testid="admin-username"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1.5">Password</label>
            <input
              type="password"
              value={pass}
              onChange={function(e) { setPass(e.target.value); setError(''); }}
              className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent"
              placeholder="Enter password"
              data-testid="admin-password"
            />
          </div>
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#1a1a1a] text-[#CCFF00] py-2.5 rounded-lg font-semibold text-sm hover:bg-black transition-colors"
            data-testid="admin-login-btn"
          >
            Sign In
          </button>
        </form>
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

  useEffect(function() { fetchCourses(); }, []);

  function fetchCourses() {
    setLoading(true);
    axios.get(API + '/api/catalunya-courses')
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
      booking_url: course.booking_url,
      full_address: course.full_address || ''
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

      {/* Editing modal */}
      {editingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={function() { setEditingId(null); }} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-stone-900">Edit Course</h3>
              <button onClick={function() { setEditingId(null); }} className="text-stone-400 hover:text-stone-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Course Name</label>
                <input type="text" value={editData.name} onChange={function(e) { setEditData(Object.assign({}, editData, { name: e.target.value })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Location</label>
                  <input type="text" value={editData.location} onChange={function(e) { setEditData(Object.assign({}, editData, { location: e.target.value })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Price From (&euro;)</label>
                  <input type="number" value={editData.price_from} onChange={function(e) { setEditData(Object.assign({}, editData, { price_from: parseInt(e.target.value) || 0 })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Holes</label>
                  <input type="number" value={editData.holes} onChange={function(e) { setEditData(Object.assign({}, editData, { holes: parseInt(e.target.value) || 18 })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Par</label>
                  <input type="number" value={editData.par} onChange={function(e) { setEditData(Object.assign({}, editData, { par: parseInt(e.target.value) || 72 })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Full Address (for Google Maps)</label>
                <input type="text" value={editData.full_address} onChange={function(e) { setEditData(Object.assign({}, editData, { full_address: e.target.value })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Booking URL</label>
                <input type="text" value={editData.booking_url} onChange={function(e) { setEditData(Object.assign({}, editData, { booking_url: e.target.value })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" />
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={function() { saveEdit(editingId); }} className="flex-1 flex items-center justify-center gap-2 bg-[#1a1a1a] text-[#CCFF00] py-2.5 rounded-lg text-sm font-semibold hover:bg-black transition-colors">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
                <button onClick={function() { setEditingId(null); }} className="px-6 py-2.5 text-stone-600 hover:text-stone-800 text-sm rounded-lg border border-stone-300">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Course</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Location</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Holes</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Price</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {courses.map(function(course) {
                return (
                  <tr key={course.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={course.image} alt="" className="w-12 h-9 rounded-lg object-cover" />
                        <span className="text-sm font-medium text-stone-900">{course.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-stone-600">{course.location}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm text-stone-600">{course.holes}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-medium text-stone-800">&euro;{course.price_from}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={function() { startEdit(course); }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg text-xs transition-colors"
                        data-testid={'edit-course-' + course.id}
                      >
                        <Pencil className="w-3 h-3" /> Edit
                      </button>
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
  var postsState = useState([]);
  var posts = postsState[0];
  var setPosts = postsState[1];
  var editState = useState(null);
  var editingPost = editState[0];
  var setEditingPost = editState[1];

  useEffect(function() {
    axios.get(API + '/api/admin/blog-posts')
      .then(function(res) { setPosts(res.data); })
      .catch(function() { setPosts([]); });
  }, []);

  function savePost(post) {
    var method = post._isNew ? 'post' : 'put';
    var url = post._isNew ? API + '/api/admin/blog-posts' : API + '/api/admin/blog-posts/' + post.id;
    axios[method](url, { title: post.title, content: post.content, category: post.category, author: post.author, published: post.published })
      .then(function(res) {
        setEditingPost(null);
        // Refresh
        axios.get(API + '/api/admin/blog-posts').then(function(r) { setPosts(r.data); }).catch(function() {});
      })
      .catch(function(err) { alert('Error: ' + err.message); });
  }

  function deletePost(postId) {
    if (!window.confirm('Delete this post?')) return;
    axios.delete(API + '/api/admin/blog-posts/' + postId)
      .then(function() {
        setPosts(posts.filter(function(p) { return p.id !== postId; }));
      })
      .catch(function(err) { alert('Error: ' + err.message); });
  }

  return (
    <div className="space-y-4" data-testid="admin-blog-list">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-stone-900">Blog Posts ({posts.length})</h2>
        <button
          onClick={function() { setEditingPost({ _isNew: true, title: '', content: '', category: 'course-guides', author: '', published: false }); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] text-[#CCFF00] rounded-lg text-sm font-medium hover:bg-black/80 transition-colors"
          data-testid="add-blog-btn"
        >
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {/* Edit modal */}
      {editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={function() { setEditingPost(null); }} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-stone-900">{editingPost._isNew ? 'New Blog Post' : 'Edit Post'}</h3>
              <button onClick={function() { setEditingPost(null); }} className="text-stone-400 hover:text-stone-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Title</label>
                <input type="text" value={editingPost.title} onChange={function(e) { setEditingPost(Object.assign({}, editingPost, { title: e.target.value })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" placeholder="Blog post title" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Author</label>
                  <input type="text" value={editingPost.author} onChange={function(e) { setEditingPost(Object.assign({}, editingPost, { author: e.target.value })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" placeholder="Author name" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Category</label>
                  <select value={editingPost.category} onChange={function(e) { setEditingPost(Object.assign({}, editingPost, { category: e.target.value })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm">
                    <option value="course-guides">Course Guides</option>
                    <option value="travel-tips">Travel Tips</option>
                    <option value="lifestyle">Lifestyle</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Content</label>
                <textarea value={editingPost.content} onChange={function(e) { setEditingPost(Object.assign({}, editingPost, { content: e.target.value })); }} rows="8" className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" placeholder="Write your blog post..." />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="published" checked={editingPost.published} onChange={function(e) { setEditingPost(Object.assign({}, editingPost, { published: e.target.checked })); }} />
                <label htmlFor="published" className="text-sm text-stone-600">Published</label>
              </div>
              <button onClick={function() { savePost(editingPost); }} className="w-full flex items-center justify-center gap-2 bg-[#1a1a1a] text-[#CCFF00] py-2.5 rounded-lg text-sm font-semibold hover:bg-black transition-colors">
                <Save className="w-4 h-4" /> {editingPost._isNew ? 'Create Post' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {posts.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
          <FileText className="w-12 h-12 text-stone-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-stone-700 mb-2">No Blog Posts Yet</h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto mb-4">
            Create your first blog post about golf in Catalunya using the "New Post" button above.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-stone-500 uppercase">Title</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-stone-500 uppercase">Category</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-stone-500 uppercase">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-stone-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {posts.map(function(post) {
                return (
                  <tr key={post.id} className="hover:bg-stone-50/50">
                    <td className="px-4 py-3 text-sm font-medium text-stone-900">{post.title}</td>
                    <td className="px-4 py-3 text-sm text-stone-600">{post.category}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={'inline-flex px-2 py-0.5 rounded-full text-xs font-medium ' + (post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700')}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={function() { setEditingPost(Object.assign({}, post)); }} className="px-2 py-1 text-stone-500 hover:text-stone-800 text-xs"><Pencil className="w-3 h-3" /></button>
                        <button onClick={function() { deletePost(post.id); }} className="px-2 py-1 text-red-400 hover:text-red-600 text-xs"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
