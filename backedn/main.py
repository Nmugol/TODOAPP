from flask import request, jsonify
from config import db, app, socketio
from models import Task
from flask_socketio import emit, SocketIO, send

@socketio.on("connect")
def handle_connect():
    tasks = Task.query.all()
    json_tasks = list(map(lambda t: t.to_json(), tasks))
    emit("connected", {"tasks": json_tasks})

@socketio.on("add_task")
def handle_add_task(data):
    task = Task(title=data, complete=False)
    db.session.add(task)
    db.session.commit()
    tasks = Task.query.all()
    json_tasks = list(map(lambda t: t.to_json(), tasks))
    emit("added_task", json_tasks, broadcast=True)

@socketio.on("complete_task")
def handle_complete_task(data):
    task = Task.query.get(data)
    task.complete = 1
    db.session.commit()
    tasks = Task.query.all()
    json_tasks = list(map(lambda t: t.to_json(), tasks))
    emit("completed_task", json_tasks, broadcast=True)


@socketio.on("edit_task")
def handle_edit_task(data):
    task = Task.query.get(data["id"])
    task.title = data["title"]
    db.session.commit()
    tasks = Task.query.all()
    json_tasks = list(map(lambda t: t.to_json(), tasks))
    emit("edited_task", json_tasks, broadcast=True)
    print(data)

@socketio.on("delete_task")
def handle_delete_task(data):
    task = Task.query.get(data)
    db.session.delete(task)
    db.session.commit()
    tasks = Task.query.all()
    json_tasks = list(map(lambda t: t.to_json(), tasks))
    emit("deleted_task", json_tasks, broadcast=True)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    socketio.run(app, debug=True)
