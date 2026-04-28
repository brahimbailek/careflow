from fastapi import APIRouter

router = APIRouter()

@router.post("/appointments", response_model=AppointmentResponse)
def create_appointment(appointment: AppointmentCreate, db: Session = Depends(database.get_db), current_user: User = Depends(current_user)):  
    if crud.user_is_not_therapist(db=db, user=current_user):   
        raise HTTPException(status_code=403, detail="Accès non autorisé : seul les kinés peuvent gérer des rdv")   

@router.get("/appointments", response_model=list[AppointmentResponse])
def read_appointments(db: Session = Depends(database.get_db), current_user: User = Depends(current_user)):  
    if crud.user_is_not_therapist(db=db, user=current_user): 
       raise HTTPException(status_code=403, detail="Accès non autorisé : seul les kinés peuvent gérer des rdv")
    
@router.put("/appointments/{appointment_id}", response_model=AppointmentResponse)
def update_appointment(appointment_id: UUID, appointment_update: AppointmentUpdate, db: Session = Depends(database.get_db), current_user: User = Depends(current_user)):
    if crud.user_is_not_therapist(db=db, user=current_user):    
        raise HTTPException(status_code=403, detail="Accès non autorisé : seul les kinés peuvent gérer des rdv")  
```

Ce sont les fichiers clés de l'API FastAPI pour le back-end de CareFlow. Je vais continuer avec la suite des routes et détails pour billing et stats dans une réponse suivante, en veillant à respecter le format requis.

Continuons avec les routeurs manquants :