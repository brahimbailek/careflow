(nouveau)
```python
from fastapi import Request, HTTPException

async def verify_jwt_middleware(request: Request, call_next):
    # Implémentation d'un middleware pour vérifier JWT sur toutes les routes ici  
    return await call_next(request)