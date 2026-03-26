import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Settings, FileText, LayoutGrid, Save, Pencil, Plus, Eye, EyeOff, Lock, LogOut, X, Trash2, Search, MapPin, ExternalLink, Image, Upload } from 'lucide-react';

var API = process.env.REACT_APP_BACKEND_URL;

export default function CatalunyaAdminPanel() {
  var authState = useState(null); // null=checking, true=auth, false=not auth
  var isAuth = authState[0];
  var setIsAuth = authState[1];
  var userState = useState(null);
  var user = userState[0];
  var setUser = userState[1];
  var tabState = useState('courses');
  var tab = tabState[0];
  var setTab = tabState[1];
  var location = useLocation();
  var hasProcessed = useRef(false);

  // Handle OAuth callback - session_id in URL hash
  useEffect(function() {
    if (hasProcessed.current) return;
    var hash = window.location.hash;
    if (hash && hash.includes('session_id=')) {
      hasProcessed.current = true;
      var sessionId = hash.split('session_id=')[1];
      // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
      axios.post(API + '/api/auth/session', { session_id: sessionId }, { withCredentials: true })
        .then(function(res) {
          setUser(res.data);
          setIsAuth(true);
          window.history.replaceState(null, '', window.location.pathname);
        })
        .catch(function() {
          setIsAuth(false);
          window.history.replaceState(null, '', window.location.pathname);
        });
      return;
    }

    // Check existing session
    axios.get(API + '/api/auth/me', { withCredentials: true })
      .then(function(res) { setUser(res.data); setIsAuth(true); })
      .catch(function() { setIsAuth(false); });
  }, []);

  function handleLogout() {
    axios.post(API + '/api/auth/logout', {}, { withCredentials: true })
      .then(function() { setUser(null); setIsAuth(false); })
      .catch(function() { setUser(null); setIsAuth(false); });
  }

  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-stone-300 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuth) return <AdminLogin />;

  return (
    <div className="min-h-screen bg-stone-100" data-testid="admin-panel">
      {/* GIM Header */}
      <div className="bg-[#1a1a1a] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-stone-700 flex items-center justify-center overflow-hidden">
            {user && user.picture ? <img src={user.picture} alt="" className="w-full h-full object-cover" /> : <Settings className="w-5 h-5 text-stone-300" />}
          </div>
          <div>
            <h1 className="text-white font-bold text-xl" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}>Admin Dashboard</h1>
            <p className="text-stone-400 text-xs">Golfgatecatalunya.es</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-white text-sm font-medium">{user ? user.name : 'Admin'}</p>
            <p className="text-stone-400 text-xs">{user ? user.email : 'golfgatecatalunya.es'}</p>
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
            className={'px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ' + (tab === 'courses' || tab === 'hotels' ? 'border-blue-500 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-600')}
            data-testid="admin-tab-content"
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

      {/* Content Manager Sub-tabs (GIM style) */}
      {(tab === 'courses' || tab === 'hotels') && (
        <div className="bg-white border-b border-stone-100 px-6">
          <div className="max-w-6xl mx-auto flex items-center gap-6 py-3">
            <button onClick={function() { setTab('courses'); }} className={'flex items-center gap-2 text-sm font-medium pb-2 border-b-2 -mb-3 transition-colors ' + (tab === 'courses' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-600')}>
              <LayoutGrid className="w-4 h-4" /> Golf Courses
            </button>
            <button onClick={function() { setTab('hotels'); }} className={'flex items-center gap-2 text-sm font-medium pb-2 border-b-2 -mb-3 transition-colors ' + (tab === 'hotels' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-600')}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/><path d="m9 16 .348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16"/><path d="M8 7h.01"/><path d="M16 7h.01"/><path d="M12 7h.01"/><path d="M12 11h.01"/><path d="M16 11h.01"/><path d="M8 11h.01"/></svg> Hotels
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-6">
        {tab === 'courses' && <CoursesTab />}
        {tab === 'hotels' && <HotelsTab />}
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

function AdminLogin() {
  function handleGoogleLogin() {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    var redirectUrl = window.location.origin + '/admin';
    window.location.href = 'https://auth.emergentagent.com/?redirect=' + encodeURIComponent(redirectUrl);
  }

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4" data-testid="admin-login">
      <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/golfgate-logo-nav.png" alt="GOLFGATE Catalunya" className="h-14 w-auto mx-auto mb-5" />
          <h2 className="font-heading text-2xl text-stone-900 mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}>Admin Dashboard</h2>
          <p className="text-stone-400 text-sm">Sign in to manage your site</p>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 transition-colors shadow-sm"
          data-testid="google-login-btn"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span className="text-sm font-medium text-stone-700">Sign in with Google</span>
        </button>
        <p className="text-center text-stone-400 text-xs mt-6">Only authorized administrators can access this panel.</p>
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


function HotelsTab() {
  var hotelsState = useState([]);
  var hotels = hotelsState[0];
  var setHotels = hotelsState[1];
  var loadingState = useState(true);
  var loading = loadingState[0];
  var setLoading = loadingState[1];
  var editState = useState(null);
  var editingHotel = editState[0];
  var setEditingHotel = editState[1];
  var searchState = useState('');
  var search = searchState[0];
  var setSearch = searchState[1];

  useEffect(function() { fetchHotels(); }, []);

  function fetchHotels() {
    setLoading(true);
    axios.get(API + '/api/admin/catalunya-hotels')
      .then(function(res) { setHotels(res.data); })
      .catch(function() {})
      .finally(function() { setLoading(false); });
  }

  function startEdit(hotel) {
    setEditingHotel(Object.assign({}, hotel));
  }

  function saveEdit() {
    var data = Object.assign({}, editingHotel);
    delete data.id;
    delete data._id;
    if (editingHotel._isNew) {
      axios.post(API + '/api/admin/catalunya-hotels', editingHotel)
        .then(function() { setEditingHotel(null); fetchHotels(); })
        .catch(function(err) { alert('Error: ' + err.message); });
    } else {
      axios.patch(API + '/api/admin/catalunya-hotel/' + editingHotel.id, data)
        .then(function() { setEditingHotel(null); fetchHotels(); })
        .catch(function(err) { alert('Error: ' + err.message); });
    }
  }

  var filtered = hotels.filter(function(h) {
    if (!search) return true;
    return h.name.toLowerCase().includes(search.toLowerCase()) || h.location.toLowerCase().includes(search.toLowerCase());
  });

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-stone-300 border-t-blue-500 rounded-full animate-spin" /></div>;
  }

  return (
    <div className="pb-24" data-testid="admin-hotels-list">
      {/* Search + Add New */}
      <div className="bg-white rounded-xl border border-stone-200 px-6 py-4 mb-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input type="text" value={search} onChange={function(e) { setSearch(e.target.value); }} placeholder="Search hotels..." className="pl-9 pr-4 py-2 rounded-lg border border-stone-200 text-sm text-stone-700 w-[220px] focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
          <button onClick={function() { setEditingHotel({ _isNew: true, name: '', location: '', description: '', image: '', stars: 4, price_from: 0, price_original: 0, discount: '', nearest_golf: '', booking_url: '', features: [], active: true, display_order: hotels.length }); }} className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> Add New
          </button>
        </div>
        <div className="flex items-center gap-4 text-sm mt-3">
          <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-green-500" /> <strong>{filtered.filter(function(h) { return h.active; }).length}</strong> <span className="text-stone-400">active</span></span>
          <span className="flex items-center gap-1.5"><EyeOff className="w-3.5 h-3.5 text-stone-400" /> <strong>{filtered.filter(function(h) { return !h.active; }).length}</strong> <span className="text-stone-400">hidden</span></span>
        </div>
      </div>

      {/* 2-Column Card Grid - GIM style */}
      <div className="bg-white rounded-xl border border-stone-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(function(hotel, index) {
            return (
              <div key={hotel.id} className="flex items-center gap-3 p-3 rounded-xl border border-stone-100 hover:border-stone-300 hover:shadow-sm transition-all cursor-pointer" onClick={function() { startEdit(hotel); }} data-testid={'admin-hotel-' + hotel.id}>
                <div className="flex-shrink-0 w-10 text-center">
                  <div className="text-sm font-bold text-stone-700 border border-stone-200 rounded px-1.5 py-0.5">{index}</div>
                  <p className="text-[10px] text-stone-400 mt-0.5">Pos</p>
                </div>
                <img src={hotel.image} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-stone-900 truncate" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{hotel.name}</h3>
                    {hotel.active ? <Eye className="w-4 h-4 text-green-500 flex-shrink-0" /> : <EyeOff className="w-4 h-4 text-stone-300 flex-shrink-0" />}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-stone-400 mt-0.5">
                    <MapPin className="w-3 h-3" /> {hotel.location}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-semibold text-amber-500">{'*'.repeat(hotel.stars || 4)}</span>
                    <span className="text-xs text-green-600 font-medium">&euro;{hotel.price_from}/night</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Modal */}
      {editingHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={function() { setEditingHotel(null); }} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-stone-900">{editingHotel._isNew ? 'Add New Hotel' : 'Edit Hotel'}</h3>
              <button onClick={function() { setEditingHotel(null); }} className="text-stone-400 hover:text-stone-600"><X className="w-5 h-5" /></button>
            </div>

            {/* Image */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-stone-600 mb-1.5">Hotel Image</label>
              {editingHotel.image && <img src={editingHotel.image} alt="" className="w-full h-40 object-cover rounded-xl mb-2 border border-stone-200" />}
              <div className="flex gap-2">
                <input type="text" value={editingHotel.image} onChange={function(e) { setEditingHotel(Object.assign({}, editingHotel, { image: e.target.value })); }} className="flex-1 px-3 py-2 rounded-lg border border-stone-300 text-sm" placeholder="Image URL" />
                <label className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer text-xs font-medium text-stone-600 transition-colors border border-stone-200">
                  <Upload className="w-3.5 h-3.5" /> Upload
                  <input type="file" accept="image/*" className="hidden" onChange={function(e) { var file = e.target.files[0]; if (file) { var reader = new FileReader(); reader.onloadend = function() { setEditingHotel(Object.assign({}, editingHotel, { image: reader.result })); }; reader.readAsDataURL(file); } }} />
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Hotel Name</label>
                <input type="text" value={editingHotel.name} onChange={function(e) { setEditingHotel(Object.assign({}, editingHotel, { name: e.target.value })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Location</label>
                  <input type="text" value={editingHotel.location} onChange={function(e) { setEditingHotel(Object.assign({}, editingHotel, { location: e.target.value })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Stars</label>
                  <select value={editingHotel.stars} onChange={function(e) { setEditingHotel(Object.assign({}, editingHotel, { stars: parseInt(e.target.value) })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm">
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Price From</label>
                  <input type="number" value={editingHotel.price_from} onChange={function(e) { setEditingHotel(Object.assign({}, editingHotel, { price_from: parseInt(e.target.value) || 0 })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Original Price</label>
                  <input type="number" value={editingHotel.price_original} onChange={function(e) { setEditingHotel(Object.assign({}, editingHotel, { price_original: parseInt(e.target.value) || 0 })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Discount</label>
                  <input type="text" value={editingHotel.discount} onChange={function(e) { setEditingHotel(Object.assign({}, editingHotel, { discount: e.target.value })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" placeholder="Save 25%" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Nearest Golf Course</label>
                <input type="text" value={editingHotel.nearest_golf} onChange={function(e) { setEditingHotel(Object.assign({}, editingHotel, { nearest_golf: e.target.value })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" placeholder="2km to..." />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Description</label>
                <textarea value={editingHotel.description} onChange={function(e) { setEditingHotel(Object.assign({}, editingHotel, { description: e.target.value })); }} rows="3" className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Booking URL</label>
                <input type="text" value={editingHotel.booking_url} onChange={function(e) { setEditingHotel(Object.assign({}, editingHotel, { booking_url: e.target.value })); }} className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="hotel-active" checked={editingHotel.active} onChange={function(e) { setEditingHotel(Object.assign({}, editingHotel, { active: e.target.checked })); }} />
                <label htmlFor="hotel-active" className="text-sm text-stone-600">Active (visible on site)</label>
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={saveEdit} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                  <Save className="w-4 h-4" /> {editingHotel._isNew ? 'Create Hotel' : 'Save Changes'}
                </button>
                <button onClick={function() { setEditingHotel(null); }} className="px-6 py-2.5 text-stone-600 hover:text-stone-800 text-sm rounded-lg border border-stone-300">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
