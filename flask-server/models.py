from server import db
from werkzeug.security import check_password_hash, generate_password_hash

class User(db.Model):
    def __init__(self, username, password):
        self.username = username
        self.set_password(password)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    password_hash = db.Column(db.String(128))


    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    is_active = True
    is_anonymous = False
    is_authenticated = True

    def get_id(self):
        return self.id


