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

class Textbook(db.Model):
    def __init__(self, title, author, isbn, price, courseName, imagePath, desc, quality):
        
        self.title = title
        self.author = author
        self.isbn = isbn
        self.price = price
        self.courseName = courseName
        self.imagePath = imagePath
        self.desc = desc
        self.quality = quality


    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(64), index=True)
    author = db.Column(db.String(64), index=True)
    isbn = db.Column(db.String(64), index=True)
    price = db.Column(db.String(64), index=True)
    courseName = db.Column(db.String(64), index=True)
    imageName = db.Column(db.String(64), index=True)

    desc = db.Column(db.String(5092), index=True)
    quality = db.Column(db.String(64), index=True)

