from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import List

from . import models, schemas, auth
from .database import engine, get_db
from .config import settings
from .dependencies import get_current_active_user, get_super_user

# Create database tables
models.Base.metadata.create_all(bind=engine)

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
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    
    user = auth.create_user(db, user)
    access_token = auth.create_access_token(data={"sub": user.email})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }

@app.post("/auth/login", response_model=schemas.Token)
def login(email: str, password: str, db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, email, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = auth.create_access_token(data={"sub": user.email})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }

@app.get("/auth/me", response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(get_current_active_user)):
    return current_user

# Content management routes
@app.get("/content/{page}", response_model=List[schemas.Content])
def get_page_content(page: str, db: Session = Depends(get_db)):
    content = db.query(models.Content).filter(
        models.Content.page == page,
        models.Content.is_active == True
    ).order_by(models.Content.order_index).all()
    return content

@app.post("/content", response_model=schemas.Content)
def create_content(
    content: schemas.ContentCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_super_user)
):
    db_content = models.Content(**content.dict())
    db.add(db_content)
    db.commit()
    db.refresh(db_content)
    return db_content

@app.put("/content/{content_id}", response_model=schemas.Content)
def update_content(
    content_id: int,
    content_update: schemas.ContentUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_super_user)
):
    db_content = db.query(models.Content).filter(models.Content.id == content_id).first()
    if not db_content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    for field, value in content_update.dict(exclude_unset=True).items():
        setattr(db_content, field, value)
    
    db.commit()
    db.refresh(db_content)
    return db_content

# Product routes
@app.get("/products", response_model=List[schemas.Product])
def get_products(
    category: str = None,
    db: Session = Depends(get_db)
):
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
def create_product(
    product: schemas.ProductCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_super_user)
):
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@app.put("/products/{product_id}", response_model=schemas.Product)
def update_product(
    product_id: int,
    product_update: schemas.ProductUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_super_user)
):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    for field, value in product_update.dict(exclude_unset=True).items():
        setattr(db_product, field, value)
    
    db.commit()
    db.refresh(db_product)
    return db_product

# AI integration endpoint
@app.post("/ai/process")
def process_ai_input(
    input_text: str,
    current_user: models.User = Depends(get_current_active_user)
):
    # This is where you would integrate with your AI agent
    # For now, we'll just echo back the input
    return {
        "input": input_text,
        "response": f"AI processed: {input_text}",
        "user_id": current_user.id
    }

# Health check
@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "Dracarys API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 