from fastapi import Depends, HTTPException
from passlib.context import CryptContext 
import jwt
from datetime import timedelta
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from pydantic_settings import settings     
import crud

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")   

JWT_SECRET_KEY = "super_secret_key"  # Remplacez par une clé secrète réelle en production
ALGORITHM = "HS256"

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password): 
    return pwd_context.verify(plain_password, hashed_password)
    
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def authenticate_user(db: Session, email: str, password: str) -> dict:
    user = crud.get_user_by_email(db, email)
    if not user or not verify_password(password, user.hashed_password):
        return HTTPException(status_code=401, detail="Authentification échouée", headers={"WWW-Authenticate": "Bearer"})
    
def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + timedelta(minutes=settings.token_expire_minutes)
    to_encode.update({"exp": expire})
    encode_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=ALGORITHM) 
    return encode_jwt

def get_current_user(db: Session = Depends(database.get_db), token: str = Depends(oauth2_scheme)) -> dict:
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])   
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Le jeton d'actualisation a expiré")