from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import List
import os
import smtplib
from email.message import EmailMessage

from . import models, schemas, auth
from .database import engine, get_db
from .config import settings
from .dependencies import get_current_active_user, get_super_user

models.Base.metadata.create_all(bind=engine)

# Send email using Gmail SMTP with App Password
def send_email(to: str, subject: str, body: str):
    msg = EmailMessage()
    msg.set_content(body)
    msg['To'] = to
    msg['From'] = "zapfounder0@gmail.com"
    msg['Subject'] = subject

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login("zapfounder0@gmail.com", "vkiv gsuj ajpd dbpu")  # Replace with your App Password
            smtp.send_message(msg)
    except Exception as e:
        print(f"SMTP error: {e}")
        raise

app = FastAPI(
    title="Dracarys API",
    description="AI-powered website backend API",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Authentication routes
@app.post("/auth/register", response_model=schemas.Token)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = auth.get_user(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = auth.create_user(db, user)
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer", "user": user}

@app.post("/auth/login", response_model=schemas.Token)
def login(email: str, password: str, db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, email, password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer", "user": user}

@app.get("/auth/me", response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(get_current_active_user)):
    return current_user

@app.get("/content/{page}", response_model=List[schemas.Content])
def get_page_content(page: str, db: Session = Depends(get_db)):
    return db.query(models.Content).filter(models.Content.page == page, models.Content.is_active == True).order_by(models.Content.order_index).all()

@app.post("/content", response_model=schemas.Content)
def create_content(content: schemas.ContentCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_super_user)):
    db_content = models.Content(**content.dict())
    db.add(db_content)
    db.commit()
    db.refresh(db_content)
    return db_content

@app.put("/content/{content_id}", response_model=schemas.Content)
def update_content(content_id: int, content_update: schemas.ContentUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_super_user)):
    db_content = db.query(models.Content).filter(models.Content.id == content_id).first()
    if not db_content:
        raise HTTPException(status_code=404, detail="Content not found")
    for field, value in content_update.dict(exclude_unset=True).items():
        setattr(db_content, field, value)
    db.commit()
    db.refresh(db_content)
    return db_content

@app.get("/products", response_model=List[schemas.Product])
def get_products(category: str = None, db: Session = Depends(get_db)):
    query = db.query(models.Product).filter(models.Product.is_active == True)
    if category:
        query = query.filter(models.Product.category == category)
    return query.all()

@app.get("/products/{product_id}", response_model=schemas.Product)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.post("/products", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_super_user)):
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@app.put("/products/{product_id}", response_model=schemas.Product)
def update_product(product_id: int, product_update: schemas.ProductUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_super_user)):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    for field, value in product_update.dict(exclude_unset=True).items():
        setattr(db_product, field, value)
    db.commit()
    db.refresh(db_product)
    return db_product

@app.post("/ai/process")
def process_ai_input(input_text: str, current_user: models.User = Depends(get_current_active_user)):
    return {"input": input_text, "response": f"AI processed: {input_text}", "user_id": current_user.id}

@app.post("/forgot-password")
async def forgot_password(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    email = data.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")
    token = auth.create_password_reset_token(email)
    reset_link = f"http://localhost:3000/reset-password?token={token}"
    try:
        send_email(to=email, subject="Password Reset Request", body=f"Click the link to reset your password: {reset_link}")
    except Exception as e:
        print(f"Email send error: {e}")
    return {"message": "If an account with that email exists, a reset link has been sent."}

@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "Dracarys API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
