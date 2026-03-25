"""
GOLFGATE Catalunya API Tests - Iteration 26
Tests for: Course cards, Blog CRUD, Admin endpoints
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://golfcat-preview.preview.emergentagent.com')

class TestCatalunyaCourses:
    """Tests for Catalunya golf courses API"""
    
    def test_get_all_courses_returns_20(self):
        """GET /api/catalunya-courses should return exactly 20 active courses"""
        response = requests.get(f"{BASE_URL}/api/catalunya-courses")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 20, f"Expected 20 courses, got {len(data)}"
        print(f"✓ GET /api/catalunya-courses returns {len(data)} courses")
    
    def test_no_duplicate_peralada(self):
        """Verify no duplicate peralada-2 course exists"""
        response = requests.get(f"{BASE_URL}/api/catalunya-courses")
        assert response.status_code == 200
        data = response.json()
        course_ids = [c['id'] for c in data]
        assert 'peralada-2' not in course_ids, "Duplicate peralada-2 should not exist"
        assert 'peralada' in course_ids, "Original peralada should exist"
        print("✓ No duplicate peralada-2 course")
    
    def test_course_has_required_fields(self):
        """Each course should have required fields for card display"""
        response = requests.get(f"{BASE_URL}/api/catalunya-courses")
        assert response.status_code == 200
        data = response.json()
        
        required_fields = ['id', 'name', 'location', 'image', 'holes', 'par', 'price_from', 'description', 'booking_url', 'full_address']
        
        for course in data[:3]:  # Check first 3 courses
            for field in required_fields:
                assert field in course, f"Course {course.get('id')} missing field: {field}"
        print("✓ Courses have all required fields")
    
    def test_get_single_course(self):
        """GET /api/catalunya-courses/{id} returns single course"""
        response = requests.get(f"{BASE_URL}/api/catalunya-courses/camiral-stadium")
        assert response.status_code == 200
        data = response.json()
        assert data['id'] == 'camiral-stadium'
        assert data['name'] == 'Camiral Golf & Wellness - Stadium Course'
        assert data['holes'] == 18
        assert data['par'] == 72
        assert data['price_from'] == 137
        print(f"✓ GET /api/catalunya-courses/camiral-stadium returns correct data")
    
    def test_course_full_address_for_maps(self):
        """Courses should have full_address for Google Maps links"""
        response = requests.get(f"{BASE_URL}/api/catalunya-courses/camiral-stadium")
        assert response.status_code == 200
        data = response.json()
        assert 'full_address' in data
        assert 'Camiral Golf & Wellness' in data['full_address']
        assert 'Caldes de Malavella' in data['full_address']
        print(f"✓ Course has full_address: {data['full_address'][:50]}...")


class TestAdminCourseEndpoints:
    """Tests for admin course management"""
    
    def test_patch_course_updates_fields(self):
        """PATCH /api/admin/catalunya-course/{id} updates course fields"""
        # Get original value
        original = requests.get(f"{BASE_URL}/api/catalunya-courses/gaudi-reus").json()
        original_price = original['price_from']
        
        # Update price
        new_price = 40 if original_price != 40 else 35
        response = requests.patch(
            f"{BASE_URL}/api/admin/catalunya-course/gaudi-reus",
            json={"price_from": new_price}
        )
        assert response.status_code == 200
        data = response.json()
        assert data['price_from'] == new_price
        
        # Restore original
        requests.patch(
            f"{BASE_URL}/api/admin/catalunya-course/gaudi-reus",
            json={"price_from": original_price}
        )
        print(f"✓ PATCH /api/admin/catalunya-course/gaudi-reus works")


class TestBlogPostsCRUD:
    """Tests for blog posts CRUD operations"""
    
    def test_get_blog_posts(self):
        """GET /api/admin/blog-posts returns array"""
        response = requests.get(f"{BASE_URL}/api/admin/blog-posts")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ GET /api/admin/blog-posts returns {len(data)} posts")
    
    def test_create_blog_post(self):
        """POST /api/admin/blog-posts creates new post"""
        post_data = {
            "title": "TEST_Blog Post Title",
            "content": "This is test content for the blog post.",
            "category": "course-guides",
            "author": "Test Author",
            "published": False
        }
        response = requests.post(
            f"{BASE_URL}/api/admin/blog-posts",
            json=post_data
        )
        assert response.status_code == 200
        data = response.json()
        assert 'id' in data
        assert data['title'] == post_data['title']
        assert data['author'] == post_data['author']
        assert data['category'] == post_data['category']
        assert data['published'] == False
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/admin/blog-posts/{data['id']}")
        print(f"✓ POST /api/admin/blog-posts creates post with ID: {data['id']}")
    
    def test_update_blog_post(self):
        """PUT /api/admin/blog-posts/{id} updates post"""
        # Create a post first
        create_response = requests.post(
            f"{BASE_URL}/api/admin/blog-posts",
            json={"title": "TEST_Original Title", "content": "Original content", "author": "Author", "category": "travel-tips", "published": False}
        )
        post_id = create_response.json()['id']
        
        # Update it
        update_response = requests.put(
            f"{BASE_URL}/api/admin/blog-posts/{post_id}",
            json={"title": "TEST_Updated Title", "published": True}
        )
        assert update_response.status_code == 200
        data = update_response.json()
        assert data['title'] == "TEST_Updated Title"
        assert data['published'] == True
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/admin/blog-posts/{post_id}")
        print(f"✓ PUT /api/admin/blog-posts/{post_id} updates post")
    
    def test_delete_blog_post(self):
        """DELETE /api/admin/blog-posts/{id} deletes post"""
        # Create a post first
        create_response = requests.post(
            f"{BASE_URL}/api/admin/blog-posts",
            json={"title": "TEST_To Delete", "content": "Will be deleted", "author": "Author", "category": "lifestyle", "published": False}
        )
        post_id = create_response.json()['id']
        
        # Delete it
        delete_response = requests.delete(f"{BASE_URL}/api/admin/blog-posts/{post_id}")
        assert delete_response.status_code == 200
        data = delete_response.json()
        assert data['deleted'] == True
        
        # Verify it's gone
        get_response = requests.get(f"{BASE_URL}/api/admin/blog-posts")
        posts = get_response.json()
        post_ids = [p['id'] for p in posts]
        assert post_id not in post_ids
        print(f"✓ DELETE /api/admin/blog-posts/{post_id} removes post")


class TestHealthAndBasicEndpoints:
    """Basic health and API tests"""
    
    def test_api_root(self):
        """GET /api/ returns success"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        print("✓ GET /api/ returns 200")
    
    def test_courses_endpoint_performance(self):
        """Courses endpoint responds quickly"""
        import time
        start = time.time()
        response = requests.get(f"{BASE_URL}/api/catalunya-courses")
        elapsed = time.time() - start
        assert response.status_code == 200
        assert elapsed < 3.0, f"Response took {elapsed:.2f}s, expected < 3s"
        print(f"✓ Courses endpoint responded in {elapsed:.2f}s")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
