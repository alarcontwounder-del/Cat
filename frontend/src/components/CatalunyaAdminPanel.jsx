import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Settings, FileText, LayoutGrid, Save, Pencil, Plus, Eye, EyeOff, Lock, LogOut, X, Trash2, Search, MapPin, ExternalLink, Image, Upload } from 'lucide-react';

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
    <div className="min-h-screen bg-stone-100" data-testid="admin-panel">
      {/* GIM Header */}
      <div className="bg-[#1a1a1a] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-stone-700 flex items-center justify-center">
            <Settings className="w-5 h-5 text-stone-300" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}>Admin Dashboard</h1>
            <p className="text-stone-400 text-xs">Golfgatecatalunya.es</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-white text-sm font-medium">Admin</p>
            <p className="text-stone-400 text-xs">golfgatecatalunya.es</p>
          </div>
          <Link to="/" className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-white transition-colors">
            <ExternalLink className="w-4 h-4" />
          </Link>
          <button onClick={handleLogout} className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* GIM Tab Navigation */}
      <div className="bg-white border-b border-stone-200 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-0">
          <button
            onClick={function() { setTab('courses'); }}
            className={'px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ' + (tab === 'courses' ? 'border-blue-500 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-600')}
            data-testid="admin-tab-courses"
          >
            <LayoutGrid className="w-4 h-4" /> Content Manager
          </button>
          <button
            onClick={function() { setTab('blog'); }}
            className={'px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ' + (tab === 'blog' ? 'border-blue-500 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-600')}
            data-testid="admin-tab-blog"
          >
            <FileText className="w-4 h-4" /> Blog Posts
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {tab === 'courses' && <CoursesTab />}
        {tab === 'blog' && <BlogTab />}
      </div>

      {/* Bottom Stats Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-16 px-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-stone-800">20</p>
            <p className="text-xs text-stone-400 uppercase tracking-wider">Courses</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-stone-800">3</p>
            <p className="text-xs text-stone-400 uppercase tracking-wider">Blog Posts</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-500">0</p>
            <p className="text-xs text-stone-400 uppercase tracking-wider">Pending Reviews</p>
          </div>
        </div>
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
            <input type="text" value={user} onChange={function(e) { setUser(e.target.value); setError(''); }} className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#CCFF00]" placeholder="Enter username" data-testid="admin-username" />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1.5">Password</label>
            <input type="password" value={pass} onChange={function(e) { setPass(e.target.value); setError(''); }} className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#CCFF00]" placeholder="Enter password" data-testid="admin-password" />
          </div>
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <button type="submit" className="w-full bg-[#1a1a1a] text-[#CCFF00] py-2.5 rounded-lg font-semibold text-sm hover:bg-black transition-colors" data-testid="admin-login-btn">Sign In</button>
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
  var editingCourse = editState[0];
  var setEditingCourse = editState[1];
  var searchState = useState('');
  var search = searchState[0];
  var setSearch = searchState[1];
  var showHiddenState = useState(false);
  var showHidden = showHiddenState[0];
  var setShowHidden = showHiddenState[1];

  useEffect(function() { fetchCourses(); }, []);

  function fetchCourses() {
    setLoading(true);
    axios.get(API + '/api/catalunya-courses')
      .then(function(res) { setCourses(res.data); })
      .catch(function() {})
      .finally(function() { setLoading(false); });
  }

  function startEdit(course) {
    setEditingCourse({
      id: course.id,
      name: course.name,
      location: course.location,
      price_from: course.price_from,
      holes: course.holes,
      par: course.par,
      booking_url: course.booking_url,
      full_address: course.full_address || '',
      image: course.image || ''
    });
  }

  function saveEdit() {
    axios.patch(API + '/api/admin/catalunya-course/' + editingCourse.id, editingCourse)
      .then(function() { setEditingCourse(null); fetchCourses(); })
      .catch(function(err) { alert('Error: ' + err.message); });
  }

  var filtered = courses.filter(function(c) {
    if (!search) return true;
    return c.name.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase());
  });
  var activeCount = filtered.length;
  var hiddenCount = 0;

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-stone-300 border-t-blue-500 rounded-full animate-spin" /></div>;
  }

  return (
    <div className="pb-24" data-testid="admin-courses-list">
      {/* GIM Sub-tabs */}
      <div className="bg-white rounded-t-xl border border-b-0 border-stone-200 px-6 pt-4">
        <div className="flex items-center gap-6 border-b border-stone-100 pb-3">
          <button className="flex items-center gap-2 text-sm font-medium text-stone-900 border-b-2 border-stone-900 pb-3 -mb-3">
            <LayoutGrid className="w-4 h-4" /> Golf Courses
          </button>
        </div>
      </div>

      {/* GIM Search/Filter Bar */}
      <div className="bg-white border-x border-stone-200 px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={search}
                onChange={function(e) { setSearch(e.target.value); }}
                placeholder="Search golf courses..."
                className="pl-9 pr-4 py-2 rounded-lg border border-stone-200 text-sm text-stone-700 w-[220px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                data-testid="admin-search"
              />
            </div>
            <button
              onClick={function() { setShowHidden(!showHidden); }}
              className={'flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm transition-colors ' + (showHidden ? 'border-blue-300 text-blue-600 bg-blue-50' : 'border-stone-200 text-stone-500 hover:bg-stone-50')}
            >
              <EyeOff className="w-3.5 h-3.5" /> Show Hidden
            </button>
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm" data-testid="admin-add-new">
            <Plus className="w-4 h-4" /> Add New
          </button>
        </div>
      </div>

      {/* Active/Hidden Count */}
      <div className="bg-white border-x border-stone-200 px-6 pb-3">
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-green-500" /> <strong>{activeCount}</strong> <span className="text-stone-400">active</span></span>
          <span className="flex items-center gap-1.5"><EyeOff className="w-3.5 h-3.5 text-stone-400" /> <strong>{hiddenCount}</strong> <span className="text-stone-400">hidden</span></span>
        </div>
      </div>

      {/* GIM 2-Column Card Grid */}
      <div className="bg-white rounded-b-xl border border-t-0 border-stone-200 px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(function(course, index) {
            return (
              <div key={course.id} className="flex items-center gap-3 p-3 rounded-xl border border-stone-100 hover:border-stone-300 hover:shadow-sm transition-all cursor-pointer" onClick={function() { startEdit(course); }} data-testid={'admin-course-' + course.id}>
                {/* Position */}
                <div className="flex-shrink-0 w-10 text-center">
                  <div className="text-sm font-bold text-stone-700 border border-stone-200 rounded px-1.5 py-0.5">{index}</div>
                  <p className="text-[10px] text-stone-400 mt-0.5">Pos</p>
                </div>
                {/* Thumbnail */}
                <img src={course.image} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-stone-900 truncate" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{course.name}</h3>
                    <Eye className="w-4 h-4 text-green-500 flex-shrink-0" />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-stone-400 mt-0.5">
                    <MapPin className="w-3 h-3" /> {course.location}
                  </div>
                  <a href={course.booking_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline mt-0.5 block truncate" onClick={function(e) { e.stopPropagation(); }}>
                    {course.booking_url ? new URL(course.booking_url).hostname : ''}
                  </a>
                  <span className="text-xs font-semibold text-green-600 mt-0.5">{course.holes}H</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Modal */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={function() { setEditingCourse(null); }} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-stone-900">Edit Course</h3>
              <button onClick={function() { setEditingCourse(null); }} className="text-stone-400 hover:text-stone-600"><X className="w-5 h-5" /></button>
            </div>

            {/* Image preview + URL */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-stone-600 mb-1.5">Course Image</label>
              {editingCourse.image && (
                <div className="mb-2 rounded-xl overflow-hidden border border-stone-200">
                  <img src={editingCourse.image} alt="Preview" className="w-full h-40 object-cover" />
                </div>
              )}
              <div className="flex gap-2">
                <input type="text" value={editingCourse.image} onChange={function(e) { setEditingCourse(Object.assign({}, editingCourse, { image: e.target.value })); }} className="flex-1 px-3 py-2 rounded-lg border border-stone-300 text-sm" placeholder="Image URL or drop image here" />
                <label className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer text-xs font-medium text-stone-600 transition-colors border border-stone-200">
                  <Upload className="w-3.5 h-3.5" /> Upload
                  <input type="file" accept="image/*" className="hidden" onChange={function(e) {
                    var file = e.target.files[0];
                    if (file) {
                      var reader = new FileReader();
                      reader.onloadend = function() {
                        setEditingCourse(Object.assign({}, editingCourse, { image: reader.result }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }} />
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Course Name</label>
                <input type="text" value={editingCourse.name} onChange={function(e) { setEditingCourse(Object.assign({}, editingCourse, { name: e.target.value })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Location</label>
                  <input type="text" value={editingCourse.location} onChange={function(e) { setEditingCourse(Object.assign({}, editingCourse, { location: e.target.value })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Price From</label>
                  <input type="number" value={editingCourse.price_from} onChange={function(e) { setEditingCourse(Object.assign({}, editingCourse, { price_from: parseInt(e.target.value) || 0 })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Holes</label>
                  <input type="number" value={editingCourse.holes} onChange={function(e) { setEditingCourse(Object.assign({}, editingCourse, { holes: parseInt(e.target.value) || 18 })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Par</label>
                  <input type="number" value={editingCourse.par} onChange={function(e) { setEditingCourse(Object.assign({}, editingCourse, { par: parseInt(e.target.value) || 72 })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Full Address</label>
                <input type="text" value={editingCourse.full_address} onChange={function(e) { setEditingCourse(Object.assign({}, editingCourse, { full_address: e.target.value })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Booking URL</label>
                <input type="text" value={editingCourse.booking_url} onChange={function(e) { setEditingCourse(Object.assign({}, editingCourse, { booking_url: e.target.value })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" />
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={saveEdit} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
                <button onClick={function() { setEditingCourse(null); }} className="px-6 py-2.5 text-stone-600 hover:text-stone-800 text-sm rounded-lg border border-stone-300">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
    axios[method](url, { title: post.title, content: post.content, category: post.category, author: post.author, published: post.published, image: post.image, excerpt: post.excerpt })
      .then(function() {
        setEditingPost(null);
        axios.get(API + '/api/admin/blog-posts').then(function(r) { setPosts(r.data); }).catch(function() {});
      })
      .catch(function(err) { alert('Error: ' + err.message); });
  }

  function deletePost(postId) {
    if (!window.confirm('Delete this post?')) return;
    axios.delete(API + '/api/admin/blog-posts/' + postId)
      .then(function() { setPosts(posts.filter(function(p) { return p.id !== postId; })); })
      .catch(function(err) { alert('Error: ' + err.message); });
  }

  return (
    <div className="space-y-4 pb-24" data-testid="admin-blog-list">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-stone-900">Blog Posts ({posts.length})</h2>
        <button
          onClick={function() { setEditingPost({ _isNew: true, title: '', content: '', category: 'course-guides', author: 'GOLFGATE Catalunya', published: false, image: '', excerpt: '' }); }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
          data-testid="add-blog-btn"
        >
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={function() { setEditingPost(null); }} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-stone-900">{editingPost._isNew ? 'New Blog Post' : 'Edit Post'}</h3>
              <button onClick={function() { setEditingPost(null); }} className="text-stone-400 hover:text-stone-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Title</label>
                <input type="text" value={editingPost.title} onChange={function(e) { setEditingPost(Object.assign({}, editingPost, { title: e.target.value })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" placeholder="Blog post title" />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Image URL</label>
                {editingPost.image && <img src={editingPost.image} alt="" className="w-full h-32 object-cover rounded-lg mb-2 border border-stone-200" />}
                <input type="text" value={editingPost.image || ''} onChange={function(e) { setEditingPost(Object.assign({}, editingPost, { image: e.target.value })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" placeholder="https://..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Author</label>
                  <input type="text" value={editingPost.author} onChange={function(e) { setEditingPost(Object.assign({}, editingPost, { author: e.target.value })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" />
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
              <button onClick={function() { savePost(editingPost); }} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
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
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map(function(post) {
            return (
              <div key={post.id} className="bg-white rounded-xl border border-stone-100 p-4 hover:shadow-sm transition-shadow">
                <div className="flex gap-3">
                  {post.image && <img src={post.image} alt="" className="w-20 h-16 rounded-lg object-cover flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-stone-900 truncate">{post.title}</h3>
                      <span className={'inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0 ' + (post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700')}>
                        {post.published ? 'Live' : 'Draft'}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 mt-0.5">{post.category} &middot; {post.author}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={function() { setEditingPost(Object.assign({}, post)); }} className="text-xs text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1"><Pencil className="w-3 h-3" /> Edit</button>
                      <button onClick={function() { deletePost(post.id); }} className="text-xs text-red-400 hover:text-red-600 font-medium flex items-center gap-1"><Trash2 className="w-3 h-3" /> Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
