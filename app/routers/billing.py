(suite)
```python
from fastapi import HTTPException
import stripe

stripe.api_key = settings.stripe_secret_key  

@router.post("/charges", response_model=ChargeResponse)
def create_charge(charge_data: CreateCharge, db: Session = Depends(database.get_db), current_user: dict = Depends(current_user)):
    # Implémentation du traitement de la transaction Stripe ici
    return {}