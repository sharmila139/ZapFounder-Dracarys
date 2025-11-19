from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

engine = create_engine(settings.database_url)
#The create_engine function establishes the connection to your PostgreSQL database
# using the database_url from backend/app/config.py.
# The sessionmaker function creates a session factory for creating database sessions.
# The autocommit and autoflush parameters are set to False to allow for manual transaction management.
# The bind parameter is used to bind the session factory to the engine.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# The declarative_base function creates a base class for your database models.
Base = declarative_base()
# The get_db function is a generator that yields a database session.
# It creates a new session, yields it, and then closes it after use.
# This allows for efficient database session management in your FastAPI application.

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 