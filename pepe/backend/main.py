from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from db.database import SessionLocal
from services.services import get_one_task, get_all_tasks, create_task
from schemas.schemas import TaskCreate
from fastapi import HTTPException


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # o especifica ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],  # permite POST, GET, OPTIONS, etc.
    allow_headers=["*"],  # permite Content-Type, Authorization, etc.
)


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


@app.put("/tasks/{task_id}")
def update_task_api(task_id: int, task: TaskCreate, db: Session = Depends(get_db)):
    existing_task = get_one_task(db, task_id)
    if not existing_task:
        raise HTTPException(status_code=404, detail="Task not found")
    update_data = task.dict()
    for key, value in update_data.items():
        setattr(existing_task, key, value)
    db.commit()
    db.refresh(existing_task)
    return existing_task


@app.delete("/tasks/{task_id}")
def delete_task_api(task_id: int, db: Session = Depends(get_db)):
    task = get_one_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return {"detail": "Task deleted"}
