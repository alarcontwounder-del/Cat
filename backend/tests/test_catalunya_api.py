"""
Test suite for GOLFGATE Catalunya API endpoints
Tests: GET /api/catalunya-courses, GET /api/catalunya-courses/{id}, PATCH /api/admin/catalunya-course/{id}
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://golfgate-cat.preview.emergentagent.com')


class TestCatalunyaCoursesAPI:
    """Tests for Catalunya golf courses endpoints"""
    
    def test_get_active_courses_returns_20(self):
        """GET /api/catalunya-courses should return 20 active courses"""
        response = requests.get(f"{BASE_URL}/api/catalunya-courses")
        assert response.status_code == 200
        courses = response.json()
        assert len(courses) == 20, f"Expected 20 active courses, got {len(courses)}"
        print(f"✓ GET /api/catalunya-courses returns {len(courses)} active courses")
    
    def test_get_all_courses_with_inactive_returns_21(self):
        """GET /api/catalunya-courses?include_inactive=true should return 21 courses"""
        response = requests.get(f"{BASE_URL}/api/catalunya-courses?include_inactive=true")
        assert response.status_code == 200
        courses = response.json()
        assert len(courses) == 21, f"Expected 21 total courses, got {len(courses)}"
        print(f"✓ GET /api/catalunya-courses?include_inactive=true returns {len(courses)} courses")
    
    def test_courses_have_required_fields(self):
        """Each course should have required fields: id, name, location, holes, par, price_from, full_address"""
        response = requests.get(f"{BASE_URL}/api/catalunya-courses")
        assert response.status_code == 200
        courses = response.json()
        
        required_fields = ['id', 'name', 'location', 'holes', 'par', 'price_from', 'full_address', 'booking_url', 'image']
        for course in courses:
            for field in required_fields:
                assert field in course, f"Course {course.get('id', 'unknown')} missing field: {field}"
        print(f"✓ All {len(courses)} courses have required fields")
    
    def test_courses_have_proper_full_address(self):
        """Courses should have proper full_address (not generic addresses like banks)"""
        response = requests.get(f"{BASE_URL}/api/catalunya-courses")
        assert response.status_code == 200
        courses = response.json()
        
        for course in courses:
            full_address = course.get('full_address', '')
            # Check that address contains golf-related terms or course name
            assert full_address, f"Course {course['id']} has empty full_address"
            # Ensure it's not a generic/wrong address
            assert 'bank' not in full_address.lower(), f"Course {course['id']} has suspicious address containing 'bank': {full_address}"
            assert 'caixa' not in full_address.lower(), f"Course {course['id']} has suspicious address containing 'caixa': {full_address}"
        print(f"✓ All courses have proper full_address fields (no generic addresses)")
    
    def test_get_single_course_by_id(self):
        """GET /api/catalunya-courses/camiral-stadium should return the course"""
        response = requests.get(f"{BASE_URL}/api/catalunya-courses/camiral-stadium")
        assert response.status_code == 200
        course = response.json()
        assert course['id'] == 'camiral-stadium'
        assert course['name'] == 'Camiral Golf & Wellness - Stadium Course'
        assert course['holes'] == 18
        assert course['par'] == 72
        assert 'Caldes de Malavella' in course['full_address']
        print(f"✓ GET /api/catalunya-courses/camiral-stadium returns correct course")
    
    def test_get_nonexistent_course_returns_404(self):
        """GET /api/catalunya-courses/nonexistent should return 404"""
        response = requests.get(f"{BASE_URL}/api/catalunya-courses/nonexistent-course-xyz")
        assert response.status_code == 404
        print(f"✓ GET /api/catalunya-courses/nonexistent returns 404")


class TestCatalunyaAdminAPI:
    """Tests for Catalunya admin endpoints"""
    
    def test_patch_course_updates_price(self):
        """PATCH /api/admin/catalunya-course/{id} should update course fields"""
        # Update price
        response = requests.patch(
            f"{BASE_URL}/api/admin/catalunya-course/camiral-stadium",
            json={"price_from": 150}
        )
        assert response.status_code == 200
        updated = response.json()
        assert updated['price_from'] == 150
        print(f"✓ PATCH updated price_from to 150")
        
        # Verify the change persisted
        get_response = requests.get(f"{BASE_URL}/api/catalunya-courses/camiral-stadium")
        assert get_response.status_code == 200
        course = get_response.json()
        assert course['price_from'] == 150
        print(f"✓ GET confirms price_from is 150")
        
        # Revert the change
        revert_response = requests.patch(
            f"{BASE_URL}/api/admin/catalunya-course/camiral-stadium",
            json={"price_from": 137}
        )
        assert revert_response.status_code == 200
        reverted = revert_response.json()
        assert reverted['price_from'] == 137
        print(f"✓ Reverted price_from back to 137")
    
    def test_patch_course_toggle_active(self):
        """PATCH /api/admin/catalunya-course/{id} should toggle active status"""
        # Get current state
        get_response = requests.get(f"{BASE_URL}/api/catalunya-courses?include_inactive=true")
        courses = get_response.json()
        peralada2 = next((c for c in courses if c['id'] == 'peralada-2'), None)
        assert peralada2 is not None
        original_active = peralada2.get('active', False)
        
        # Toggle active
        response = requests.patch(
            f"{BASE_URL}/api/admin/catalunya-course/peralada-2",
            json={"active": not original_active}
        )
        assert response.status_code == 200
        updated = response.json()
        assert updated['active'] == (not original_active)
        print(f"✓ PATCH toggled active from {original_active} to {not original_active}")
        
        # Revert
        revert_response = requests.patch(
            f"{BASE_URL}/api/admin/catalunya-course/peralada-2",
            json={"active": original_active}
        )
        assert revert_response.status_code == 200
        print(f"✓ Reverted active back to {original_active}")
    
    def test_patch_nonexistent_course_returns_404(self):
        """PATCH /api/admin/catalunya-course/nonexistent should return 404"""
        response = requests.patch(
            f"{BASE_URL}/api/admin/catalunya-course/nonexistent-course-xyz",
            json={"price_from": 100}
        )
        assert response.status_code == 404
        print(f"✓ PATCH nonexistent course returns 404")
    
    def test_patch_with_invalid_fields_returns_400(self):
        """PATCH with only invalid fields should return 400"""
        response = requests.patch(
            f"{BASE_URL}/api/admin/catalunya-course/camiral-stadium",
            json={"invalid_field": "value"}
        )
        assert response.status_code == 400
        print(f"✓ PATCH with invalid fields returns 400")


class TestCatalunyaCourseDataQuality:
    """Tests for data quality of Catalunya courses"""
    
    def test_all_courses_have_valid_booking_urls(self):
        """All courses should have valid booking URLs"""
        response = requests.get(f"{BASE_URL}/api/catalunya-courses")
        courses = response.json()
        
        for course in courses:
            booking_url = course.get('booking_url', '')
            assert booking_url.startswith('http'), f"Course {course['id']} has invalid booking_url: {booking_url}"
        print(f"✓ All courses have valid booking URLs")
    
    def test_all_courses_have_valid_images(self):
        """All courses should have valid image URLs"""
        response = requests.get(f"{BASE_URL}/api/catalunya-courses")
        courses = response.json()
        
        for course in courses:
            image = course.get('image', '')
            assert image.startswith('http'), f"Course {course['id']} has invalid image URL: {image}"
        print(f"✓ All courses have valid image URLs")
    
    def test_courses_sorted_by_display_order(self):
        """Courses should be sorted by display_order"""
        response = requests.get(f"{BASE_URL}/api/catalunya-courses")
        courses = response.json()
        
        display_orders = [c.get('display_order', 0) for c in courses]
        assert display_orders == sorted(display_orders), "Courses are not sorted by display_order"
        print(f"✓ Courses are sorted by display_order")
    
    def test_camiral_stadium_is_first(self):
        """Camiral Stadium should be the first course (display_order=1)"""
        response = requests.get(f"{BASE_URL}/api/catalunya-courses")
        courses = response.json()
        
        assert courses[0]['id'] == 'camiral-stadium', f"First course should be camiral-stadium, got {courses[0]['id']}"
        print(f"✓ Camiral Stadium is the first course")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
