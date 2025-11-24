from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from model.model import Base

DATABASE_URL = "postgresql://postgres:@localhost:5432/pruebadocker"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)
