from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.post("/patients", response_model=PatientResponse)
def create_patient(patient: PatientCreate, db: Session = Depends(database.get_db), current_user: User = Depends(current_user)):  
    if crud.user_is_not_therapist(db=db, user=current_user):
        raise HTTPException(status_code=403, detail="Accès non autorisé : seul les kinés peuvent gérer des patients")
    
    db_patient = crud.create_patient(db=db, patient=patient)
   
@router.get("/patients", response_model=list[PatientResponse])
def read_patients(db: Session = Depends(database.get_db), current_user: User = Depends(current_user)):  
   if crud.user_is_not_therapist(db=db, user=current_user):
        raise HTTPException(status_code=403, detail="Accès non autorisé : seul les kinés peuvent gérer des patients")
   
   return crud.list_patients(db)   

@router.put("/patients/{patient_id}", response_model=PatientResponse)
def update_patient(patient_id: UUID, patient_update: PatientUpdate, db: Session = Depends(database.get_db), current_user: User = Depends(current_user)):
    if crud.user_is_not_therapist(db=db, user=current_user):
        raise HTTPException(status_code=403, detail="Accès non autorisé : seul les kinés peuvent gérer des patients")