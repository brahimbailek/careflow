from fastapi import APIRouter

router = APIRouter()

@router.get("/stats/appointments/{period}")
def get_appointment_stats(period: str, db: Session = Depends(database.get_db)):
    return crud.get_appt_statistics(db=db, period=period)

@router.get("/stats/patients")
def get_patient_summary(db: Session = Depends(database.get_db)):        
   return crud.patient_summary(db)   
```

Vous pouvez continuer à ajouter des détails et implémenter les fonctions CRUD correspondantes pour les modèles dans les fichiers de base de données.