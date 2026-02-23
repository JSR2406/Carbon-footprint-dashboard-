from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from datetime import datetime, timedelta
from typing import Optional
import os

SECRET_KEY = os.getenv('JWT_SECRET', 'dy-patil-carbon-dashboard-2026-secure-key')
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 60

bearer_scheme = HTTPBearer()

class AuthManager:
    def __init__(self):
        self.secret_key = SECRET_KEY
        self.algorithm = ALGORITHM
    
    def create_access_token(self, data: dict, expires_delta: Optional[timedelta] = None):
        '''Create JWT token'''
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({'exp': expire})
        encoded_jwt = jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
        return encoded_jwt
    
    def verify_token(self, credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
        '''Verify JWT token'''
        try:
            payload = jwt.decode(credentials.credentials, self.secret_key, algorithms=[self.algorithm])
            return payload
        except jwt.ExpiredSignatureError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Token expired',
                headers={'WWW-Authenticate': 'Bearer'},
            )
        except jwt.PyJWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Invalid token',
                headers={'WWW-Authenticate': 'Bearer'},
            )

# Initialize auth manager
auth_manager = AuthManager()

# Mock user database
MOCK_USERS = {
    'admin': {'password': 'admin123', 'role': 'administrator'},
    'faculty': {'password': 'faculty123', 'role': 'user'},
    'student': {'password': 'student123', 'role': 'viewer'}
}

def authenticate_user(username: str, password: str):
    '''Simple user authentication logic'''
    if username in MOCK_USERS and MOCK_USERS[username]['password'] == password:
        return {'username': username, 'role': MOCK_USERS[username]['role']}
    return None
