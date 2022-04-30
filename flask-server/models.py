from server import db
from werkzeug.security import check_password_hash, generate_password_hash

class User(db.Model):
    def __init__(self, email, password, firstName, lastName):
        self.email = email
        self.set_password(password)

    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(64), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    firstName = db.Column(db.String(64), index=True)
    lastName = db.Column(db.String(64), index=True)




    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    is_active = True
    is_anonymous = False
    is_authenticated = True

    def get_id(self):
        return self.id

'''
    todo: 
        add seller contact info to User
        add textbook model

        add/modify/edit textbook calls to routes
        add user verification to routes, as well as session info


'''
