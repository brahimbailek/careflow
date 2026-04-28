import os
from pydantic import BaseModel

class Settings(BaseModel):
    API_V1_STR = "/api/v1"
    JWT_SECRET = os.getenv("JWT_SECRET", "dev_jwt_secret")
    POSTGRES_USER = os.getenv("POSTGRES_USER", "postgres")
    POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "")
    POSTGRES_HOSTNAME = os.getenv("DATABASE_HOSTNAME", "db")  # Pour le container Docker
    POSTGRES_DB = os.getenv("POSTGRES_DB", "CareFlow")

settings = Settings()

class JWTSettings:
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30
    REFRESH_TOKEN_EXPIRE_MINUTES = 1440

jwt_settings = JWTSettings()