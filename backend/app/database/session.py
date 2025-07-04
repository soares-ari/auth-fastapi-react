from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session


# Para SQLite (simples e funcional para testes)
SQLALCHEMY_DATABASE_URL = "sqlite:///./app.db"

# Para PostgreSQL (futuro)
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/dbname"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False} # exclusivo para SQLite
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()