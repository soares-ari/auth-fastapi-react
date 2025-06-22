from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.schemas.user import UserCreate, UserRead
from app.models.user import User
from app.database.session import SessionLocal
from app.core.security import get_password_hash
from app.database.session import get_db

router = APIRouter()

@router.post("/register", response_model=UserRead)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user_in.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="E-mail já cadastrado.")
    
    new_user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user