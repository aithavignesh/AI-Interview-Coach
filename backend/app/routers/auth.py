from app.schemas.user import UserCreate, UserLogin
from app.utils.security import hash_password, verify_password
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.user import User
from datetime import datetime, timedelta
from jose import jwt
SECRET_KEY = "your_secret_key_123"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )
router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
    fullname=user.fullname,
    email=user.email,
    password=hash_password(user.password)
)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    print("Email received:", user.email)

    existing_user = db.query(User).filter(User.email == user.email).first()

    print("User found:", existing_user)

    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(user.password, existing_user.password):
        raise HTTPException(status_code=401, detail="Invalid password")

    token = create_access_token(
    {
        "sub": str(existing_user.id)
    }
)

    return {
        "message": "Login successful",
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": existing_user.id,
            "fullname": existing_user.fullname,
            "email": existing_user.email
        }
    }