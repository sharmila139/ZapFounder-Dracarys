#!/usr/bin/env python3
"""
Database setup script for Dracarys
Creates default users and initial content
"""

import os
import sys
from sqlalchemy.orm import Session
from app.database import engine, SessionLocal
from app.models import User, Content, Product, UserRole
from app.auth import get_password_hash
import json

def create_default_users(db: Session):
    """Create default users for testing"""
    
    # Check if admin user already exists
    admin_user = db.query(User).filter(User.email == "admin@dracarys.com").first()
    if not admin_user:
        admin_user = User(
            email="admin@dracarys.com",
            name="Admin User",
            hashed_password=get_password_hash("admin123"),
            role=UserRole.SUPER_USER,
            is_active=True
        )
        db.add(admin_user)
        print("✅ Created admin user: admin@dracarys.com / admin123")
    else:
        print("ℹ️  Admin user already exists")

    # Check if test user already exists
    test_user = db.query(User).filter(User.email == "user@dracarys.com").first()
    if not test_user:
        test_user = User(
            email="user@dracarys.com",
            name="Test User",
            hashed_password=get_password_hash("user123"),
            role=UserRole.CLIENT,
            is_active=True
        )
        db.add(test_user)
        print("✅ Created test user: user@dracarys.com / user123")
    else:
        print("ℹ️  Test user already exists")

def create_default_content(db: Session):
    """Create default content for the website"""
    
    default_content = [
        # Home page content
        {
            "page": "home",
            "section": "hero",
            "title": "Welcome to Dracarys",
            "content": "Experience the future of AI-powered web applications with our cutting-edge platform.",
            "order_index": 1
        },
        {
            "page": "home",
            "section": "features",
            "title": "Why Choose Dracarys?",
            "content": "Our platform combines cutting-edge technology with user-friendly design to deliver exceptional experiences.",
            "order_index": 2
        },
        # About page content
        {
            "page": "about",
            "section": "mission",
            "title": "Our Mission",
            "content": "At Dracarys, we believe that artificial intelligence should be accessible to everyone. Our platform combines cutting-edge AI technology with intuitive design to create powerful tools that enhance productivity and creativity.",
            "order_index": 1
        },
        {
            "page": "about",
            "section": "values",
            "title": "Our Values",
            "content": "Innovation at the core of everything we do, User experience as our top priority, Security and privacy by design, Continuous learning and improvement",
            "order_index": 2
        },
        # Contact page content
        {
            "page": "contact",
            "section": "info",
            "title": "Get in Touch",
            "content": "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
            "order_index": 1
        }
    ]
    
    for content_data in default_content:
        existing = db.query(Content).filter(
            Content.page == content_data["page"],
            Content.section == content_data["section"]
        ).first()
        
        if not existing:
            content = Content(**content_data)
            db.add(content)
            print(f"✅ Created content: {content_data['page']} - {content_data['section']}")
        else:
            print(f"ℹ️  Content already exists: {content_data['page']} - {content_data['section']}")

def create_default_products(db: Session):
    """Create default products"""
    
    default_products = [
        {
            "name": "AI Chat Assistant",
            "description": "Advanced conversational AI that understands context and provides intelligent responses.",
            "price": 29900,  # $299.00 in cents
            "category": "ai",
            "features": json.dumps(["Natural Language Processing", "Multi-language Support", "24/7 Availability", "Customizable Responses"]),
            "rating": 48,
            "reviews_count": 124
        },
        {
            "name": "Smart Analytics Dashboard",
            "description": "Real-time data visualization and predictive analytics for business intelligence.",
            "price": 49900,  # $499.00 in cents
            "category": "ai",
            "features": json.dumps(["Real-time Data", "Predictive Analytics", "Custom Reports", "API Integration"]),
            "rating": 49,
            "reviews_count": 89
        },
        {
            "name": "E-commerce Platform",
            "description": "Complete online store solution with payment processing and inventory management.",
            "price": 79900,  # $799.00 in cents
            "category": "web",
            "features": json.dumps(["Payment Processing", "Inventory Management", "Order Tracking", "Mobile Responsive"]),
            "rating": 47,
            "reviews_count": 156
        }
    ]
    
    for product_data in default_products:
        existing = db.query(Product).filter(Product.name == product_data["name"]).first()
        
        if not existing:
            product = Product(**product_data)
            db.add(product)
            print(f"✅ Created product: {product_data['name']}")
        else:
            print(f"ℹ️  Product already exists: {product_data['name']}")

def main():
    """Main setup function"""
    print("🚀 Setting up Dracarys database...")
    
    # Create database tables
    from app.models import Base
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created")
    
    # Create database session
    db = SessionLocal()
    try:
        # Create default users
        print("\n👥 Creating default users...")
        create_default_users(db)
        
        # Create default content
        print("\n📝 Creating default content...")
        create_default_content(db)
        
        # Create default products
        print("\n🛍️  Creating default products...")
        create_default_products(db)
        
        # Commit all changes
        db.commit()
        print("\n✅ Database setup completed successfully!")
        print("\n📋 Default credentials:")
        print("   Admin: admin@dracarys.com / admin123")
        print("   User:  user@dracarys.com / user123")
        
    except Exception as e:
        print(f"❌ Error during setup: {e}")
        db.rollback()
        sys.exit(1)
    finally:
        db.close()

if __name__ == "__main__":
    main() 