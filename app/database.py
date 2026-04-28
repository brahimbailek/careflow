import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

DATABASE_URL_ASYNC = f"postgresql+asyncpg://{os.getenv('POSTGRES_USER', 'postgres')}:{os.getenv('POSTGRES_PASSWORD', '')}@{os.getenv('DATABASE_HOSTNAME', 'localhost')}/{os.getenv('POSTGRES_DB', 'CareFlow')}"
engine_async = create_async_engine(DATABASE_URL_ASYNC, echo=False)

SessionLocal = sessionmaker(
    engine_async,
    class_=AsyncSession,
    expire_on_commit=False
)

async def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        await db.close()


from app.models import Base

# Nécessaire pour Alembic migrations, à décommenter lors de la création du premier schéma.
Base.metadata.create_all(bind=engine_async)