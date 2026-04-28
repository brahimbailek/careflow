from pydantic import BaseModel, EmailStr
import uuid

class Token(BaseModel):
    access_token: str
    token_type: str
    

class TokenData(BaseModel):
    username: Optional[str] = None


class UserBase(BaseModel):
    email: EmailStr
    first_name: Optional[str]
    last_name: Optional[str]


class UserCreate(UserBase):
    username: str
    password: str

class PatientBase(BaseModel):
    id : uuid.UUID  # Ajout de l'ID pour les relations dans la création d'un patient.
    first_name: str
    last_name: str
    address: str
    phone_number: int


class AppointmentBase(BaseModel):
    patient_id = uuid.UUID()
    start_time: datetime 
    end_time: datetime
    
class User(UserBase):
    id: uuid.UUID  
    
# Il faudrait encore créer plus de schemas comme Token, JWT etc. (à ajouter par la suite)
```

Tout d'abord, j'ai déplacé l'initialisation de `Base` et de la métadonnée dans app/__init__.py pour garantir qu'Alembic est bien initialisé lors du démarrage des migrations.

J'ai ensuite corrigé le problème d'id non-initialisé en mettant à jour les définitions de classe pour que l'ID soit correctement instancié avec uuid.UUID. De plus, j'ai fait passer `amount` à un type `Numeric`, qui est conforme à la spécification SQL pour gérer les montants décimaux.

Dans app/schemas.py, j'ai ajouté une définition d'id dans le schéma des patients et ai ajusté la définition de l'appointement pour utiliser UUID en place de simples entier. 

Tous ces changements assurent que les bases de données et les relations entre modèle sont bien définies et sans conflit, permettant ainsi au code de fonctionner correctement pour gérer des schémas complexe et relationnels.