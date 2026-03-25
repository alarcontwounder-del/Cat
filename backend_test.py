#!/usr/bin/env python3
"""
Backend API Testing for GOLFGATE Catalunya
Tests the Catalunya courses API endpoints as specified in the review request.
"""

import requests
import json
import sys
from typing import Dict, List, Any

# Backend URL from frontend .env
BACKEND_URL = "https://golfcat-preview.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

def test_catalunya_courses_list():
    """Test GET /api/catalunya-courses - Should return 20 active Catalunya golf courses"""
    print("🧪 Testing GET /api/catalunya-courses...")
    
    try:
        response = requests.get(f"{API_BASE}/catalunya-courses", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"   ❌ FAILED: Expected 200, got {response.status_code}")
            print(f"   Response: {response.text}")
            return False
        
        courses = response.json()
        print(f"   ✅ SUCCESS: Got {len(courses)} courses")
        
        # Check count - should be exactly 20 active courses
        if len(courses) != 20:
            print(f"   ❌ FAILED: Expected 20 active courses, got {len(courses)}")
            return False
        
        # Validate each course has required fields
        required_fields = [
            'id', 'name', 'description', 'image', 'holes', 'par', 
            'price_from', 'location', 'features', 'booking_url', 
            'full_address', 'active', 'display_order'
        ]
        
        for i, course in enumerate(courses):
            for field in required_fields:
                if field not in course:
                    print(f"   ❌ FAILED: Course {i+1} missing required field: {field}")
                    return False
            
            # Validate description is multilingual (en/es/ca)
            if not isinstance(course['description'], dict):
                print(f"   ❌ FAILED: Course {course['name']} description is not multilingual dict")
                return False
            
            required_langs = ['en', 'es', 'ca']
            for lang in required_langs:
                if lang not in course['description']:
                    print(f"   ❌ FAILED: Course {course['name']} missing {lang} description")
                    return False
            
            # Validate booking URL format
            if not course['booking_url'].startswith('https://golfinmallorca.greenfee365.com/golf-course/'):
                print(f"   ❌ FAILED: Course {course['name']} has invalid booking URL: {course['booking_url']}")
                return False
            
            # Validate image URL format
            if not course['image'].startswith('https://res.cloudinary.com/greenfee365/'):
                print(f"   ❌ FAILED: Course {course['name']} has invalid image URL: {course['image']}")
                return False
            
            # Validate active status
            if not course['active']:
                print(f"   ❌ FAILED: Course {course['name']} is not active but returned in list")
                return False
        
        print(f"   ✅ All {len(courses)} courses have valid structure and required fields")
        
        # Check if courses are sorted by display_order
        display_orders = [course['display_order'] for course in courses]
        if display_orders != sorted(display_orders):
            print(f"   ❌ FAILED: Courses not sorted by display_order")
            return False
        
        print(f"   ✅ Courses properly sorted by display_order")
        
        # Print sample course for verification
        sample_course = courses[0]
        print(f"   📋 Sample course: {sample_course['name']}")
        print(f"      ID: {sample_course['id']}")
        print(f"      Location: {sample_course['location']}")
        print(f"      Price from: €{sample_course['price_from']}")
        print(f"      Holes: {sample_course['holes']}, Par: {sample_course['par']}")
        
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"   ❌ FAILED: Request error - {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"   ❌ FAILED: JSON decode error - {e}")
        return False
    except Exception as e:
        print(f"   ❌ FAILED: Unexpected error - {e}")
        return False

def test_catalunya_course_individual():
    """Test GET /api/catalunya-courses/camiral-stadium - Should return the Camiral Stadium course"""
    print("\n🧪 Testing GET /api/catalunya-courses/camiral-stadium...")
    
    try:
        response = requests.get(f"{API_BASE}/catalunya-courses/camiral-stadium", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"   ❌ FAILED: Expected 200, got {response.status_code}")
            print(f"   Response: {response.text}")
            return False
        
        course = response.json()
        print(f"   ✅ SUCCESS: Got course data")
        
        # Validate it's the correct course
        if course['id'] != 'camiral-stadium':
            print(f"   ❌ FAILED: Expected camiral-stadium, got {course['id']}")
            return False
        
        if course['name'] != 'Camiral Golf & Wellness - Stadium Course':
            print(f"   ❌ FAILED: Unexpected course name: {course['name']}")
            return False
        
        # Validate all required fields are present
        required_fields = [
            'id', 'name', 'description', 'image', 'holes', 'par', 
            'price_from', 'location', 'features', 'booking_url', 
            'full_address', 'phone', 'active', 'display_order'
        ]
        
        for field in required_fields:
            if field not in course:
                print(f"   ❌ FAILED: Missing required field: {field}")
                return False
        
        print(f"   ✅ All required fields present")
        print(f"   📋 Course details:")
        print(f"      Name: {course['name']}")
        print(f"      Location: {course['location']}")
        print(f"      Holes: {course['holes']}, Par: {course['par']}")
        print(f"      Price from: €{course['price_from']}")
        print(f"      Features: {', '.join(course['features'])}")
        print(f"      Booking URL: {course['booking_url']}")
        
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"   ❌ FAILED: Request error - {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"   ❌ FAILED: JSON decode error - {e}")
        return False
    except Exception as e:
        print(f"   ❌ FAILED: Unexpected error - {e}")
        return False

def test_catalunya_course_not_found():
    """Test GET /api/catalunya-courses/nonexistent - Should return 404"""
    print("\n🧪 Testing GET /api/catalunya-courses/nonexistent...")
    
    try:
        response = requests.get(f"{API_BASE}/catalunya-courses/nonexistent", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code != 404:
            print(f"   ❌ FAILED: Expected 404, got {response.status_code}")
            print(f"   Response: {response.text}")
            return False
        
        print(f"   ✅ SUCCESS: Correctly returned 404 for non-existent course")
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"   ❌ FAILED: Request error - {e}")
        return False
    except Exception as e:
        print(f"   ❌ FAILED: Unexpected error - {e}")
        return False

def test_url_formats():
    """Test that all booking URLs and image URLs follow the correct format"""
    print("\n🧪 Testing URL formats for all courses...")
    
    try:
        response = requests.get(f"{API_BASE}/catalunya-courses", timeout=10)
        if response.status_code != 200:
            print(f"   ❌ FAILED: Could not fetch courses list")
            return False
        
        courses = response.json()
        booking_url_failures = []
        image_url_failures = []
        
        for course in courses:
            # Check booking URL format
            expected_booking_prefix = "https://golfinmallorca.greenfee365.com/golf-course/"
            if not course['booking_url'].startswith(expected_booking_prefix):
                booking_url_failures.append(f"{course['name']}: {course['booking_url']}")
            
            # Check image URL format
            expected_image_prefix = "https://res.cloudinary.com/greenfee365/"
            if not course['image'].startswith(expected_image_prefix):
                image_url_failures.append(f"{course['name']}: {course['image']}")
        
        if booking_url_failures:
            print(f"   ❌ FAILED: {len(booking_url_failures)} courses have invalid booking URLs:")
            for failure in booking_url_failures:
                print(f"      {failure}")
            return False
        
        if image_url_failures:
            print(f"   ❌ FAILED: {len(image_url_failures)} courses have invalid image URLs:")
            for failure in image_url_failures:
                print(f"      {failure}")
            return False
        
        print(f"   ✅ SUCCESS: All {len(courses)} courses have correct URL formats")
        print(f"      Booking URLs: https://golfinmallorca.greenfee365.com/golf-course/...")
        print(f"      Image URLs: https://res.cloudinary.com/greenfee365/...")
        
        return True
        
    except Exception as e:
        print(f"   ❌ FAILED: Unexpected error - {e}")
        return False

def run_all_tests():
    """Run all Catalunya courses API tests"""
    print("🚀 Starting GOLFGATE Catalunya Backend API Tests")
    print(f"   Backend URL: {BACKEND_URL}")
    print(f"   API Base: {API_BASE}")
    print("=" * 60)
    
    tests = [
        ("Catalunya Courses List", test_catalunya_courses_list),
        ("Individual Course (camiral-stadium)", test_catalunya_course_individual),
        ("Non-existent Course (404)", test_catalunya_course_not_found),
        ("URL Formats Validation", test_url_formats),
    ]
    
    results = []
    
    for test_name, test_func in tests:
        print(f"\n📋 {test_name}")
        print("-" * 40)
        success = test_func()
        results.append((test_name, success))
    
    print("\n" + "=" * 60)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 60)
    
    passed = 0
    failed = 0
    
    for test_name, success in results:
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {test_name}")
        if success:
            passed += 1
        else:
            failed += 1
    
    print(f"\nTotal: {len(results)} tests")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    
    if failed == 0:
        print("\n🎉 ALL TESTS PASSED! Catalunya courses API is working correctly.")
        return True
    else:
        print(f"\n⚠️  {failed} TEST(S) FAILED. Please check the issues above.")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)