from server import db
from server import login_manager
from werkzeug.security import check_password_hash, generate_password_hash



class User(db.Model):
    def __init__(self, email, password, firstName, lastName, phoneNum):
        self.email = email
        self.set_password(password)
        self.firstName = firstName
        self.lastName = lastName
        self.phoneNum = phoneNum

    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(64), index=True, unique=True)
    password = db.Column(db.String(128))

    firstName = db.Column(db.String(64), index=True)
    lastName = db.Column(db.String(64), index=True)

    phoneNum = db.Column(db.String(64), index=True)

    textbooks = db.relationship("Textbook", backref="user")

    def set_password(self, password):
        self.password = password

    def check_password(self, password):
        return password == password

    is_active = True
    is_anonymous = False
    is_authenticated = True

    def get_id(self):
        return str(self.id)


'''
    todo: 
        add seller contact info to User
        add textbook model

        add/modify/edit textbook calls to routes
        add user verification to routes, as well as session info

'''


class Textbook(db.Model):
    def __init__(self, title, author, isbn, price, originalPrice, courseName, image, description, quality):

        self.title = title
        self.author = author
        self.isbn = isbn
        self.price = price
        self.originalPrice = originalPrice
        self.courseName = courseName
        self.image = image
        self.description = description
        self.quality = quality

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(64), index=True)
    author = db.Column(db.String(64), index=True)
    isbn = db.Column(db.String(64), index=True)
    price = db.Column(db.String(64), index=True)
    originalPrice = db.Column(db.String(64), index=True)
    courseName = db.Column(db.String(64), index=True)
    image = db.Column(db.String(64), index=True)

    description = db.Column(db.String(5092), index=True)
    quality = db.Column(db.String(64), index=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

