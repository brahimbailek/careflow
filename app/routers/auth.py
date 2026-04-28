from fastapi import APIRouter, Depends, HTTPException
import crud 
from sqlalchemy.orm import Session

router = APIRouter()

@router.post("/auth/register", response_model=AuthUserResponse)
def register_user(user: UserCreate, db: Session = Depends(database.get_db)):
    if crud.user_exists(db, user.email):  
        raise HTTPException(status_code=409, detail="Un utilisateur avec cette adresse e-mail existe déjà.")
    
    new_user_data = user.dict()
    
@router.post("/auth/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(database.get_db)):
    authenticated_user = authenticate_user(db=db, email=user.email, password=user.password) 
```

Pour éviter les répétitions et garder le format cohérent, je vais fournir le reste des fichiers par sections pour ne pas dépasser la limite de caractères :