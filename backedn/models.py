from config import db

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    complete = db.Column(db.Integer, default=0)

    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'complete': self.complete
        }