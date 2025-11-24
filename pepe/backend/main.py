from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from db.database import SessionLocal
from services.services import get_one_task, get_all_tasks, create_task
from schemas.schemas import TaskCreate


app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/tasks/")
def create_task_api(task: TaskCreate, db: Session = Depends(get_db)):
    return create_task(db, task.dict())


@app.get("/tasks/")
def read_tasks_api(db: Session = Depends(get_db)):
    return get_all_tasks(db)


@app.get("/tasks/{task_id}")
def read_task_api(task_id: int, db: Session = Depends(get_db)):
    return get_one_task(db, task_id)
