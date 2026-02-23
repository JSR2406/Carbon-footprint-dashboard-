import requests
import time

BASE_URL = "http://localhost:8000"

def test_health():
    print("Testing Health Endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"Status: {response.status_code}, Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Failed: {e}")
        return False

def test_auth():
    print("\nTesting Authentication...")
    try:
        # Test valid login
        payload = {"username": "admin", "password": "admin123"}
        response = requests.post(f"{BASE_URL}/token", data=payload)
        if response.status_code == 200:
            token = response.json()["access_token"]
            print(f"Login Success! Token received.")
            
            # Test protected route
            headers = {"Authorization": f"Bearer {token}"}
            me_response = requests.get(f"{BASE_URL}/users/me", headers=headers)
            print(f"Me Response: {me_response.json()}")
            return True
        else:
            print(f"Login Failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"Auth Test Failed: {e}")
        return False

def test_alerts():
    print("\nTesting Alert Fetching...")
    try:
        response = requests.get(f"{BASE_URL}/alerts")
        print(f"Active Alerts: {len(response.json())}")
        return response.status_code == 200
    except Exception as e:
        print(f"Alert Test Failed: {e}")
        return False

if __name__ == "__main__":
    print("🚀 Starting API Integration Tests\n")
    h = test_health()
    a = test_auth()
    al = test_alerts()
    
    if h and a and al:
        print("\n✅ ALL TESTS PASSED!")
    else:
        print("\n❌ SOME TESTS FAILED. Ensure the backend is running.")
