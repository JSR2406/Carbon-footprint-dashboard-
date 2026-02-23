from backend.database import engine, Base
from sqlalchemy import text

def test_connection():
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            print("✅ Supabase Connection Successful!")
            print(f"Result: {result.fetchone()}")
            
            # Create tables if they don't exist
            Base.metadata.create_all(bind=engine)
            print("✅ Database Tables Verified/Created!")
    except Exception as e:
        print(f"❌ Connection Failed: {e}")

if __name__ == "__main__":
    test_connection()
