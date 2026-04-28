from fastapi import APIRouter

from app.config import settings
from app.database import engine, Base
from app.routers import auth, patients, appointments, billing, stats

DATABASE_URL = f"postgresql://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@{settings.DATABASE_HOSTNAME}/{settings.POSTGRES_DB}"
# Définition du pool de sessions SQLAlchemy et modèle pour Alembic (nécessaire à décommenter pour migrer la base)
Base.metadata.create_all(bind=engine)  # Crée les tables en base de données

router = APIRouter()
router.include_router(auth.router)
router.include_router(patients.router)
router.include_router(appointments.router)
router.include_router(billing.router)
router.include_router(stats.router, prefix="/stats", tags=["stats"])