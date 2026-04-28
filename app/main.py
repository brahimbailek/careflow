from fastapi import FastAPI, HTTPException
from pydantic_settings import BaseSettings
import database
from routers import auth, patients, appointments, billing, stats

app = FastAPI()

settings = BaseSettings()

# Configurer les middlewares ici
@app.middleware("http")
async def db_session_middleware(request, call_next):
    request.state.db = database.SessionLocal()
    response = await call_next(request)
    return response
    
database.engine.dispose()  # Déconnexion de la base de données lorsque l'application est fermée

app.include_router(auth.router)    
app.include_router(patients.router)
app.include_router(appointments.router)
app.include_router(billing.router)
app.include_router(stats.router)

# Ajouter ici d'autres routes ou middlewares si nécessaire