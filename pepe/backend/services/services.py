from sqlalchemy.orm import Session
from model.model import Task


def get_one_task(db: Session, task_id: int):
    return db.query(Task).filter(Task.id == task_id).first()


def get_all_tasks(db: Session):
    return db.query(Task).all()


def create_task(db: Session, task_data: dict):
    task = Task(**task_data)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task
