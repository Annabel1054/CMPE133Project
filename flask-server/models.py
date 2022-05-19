from server import db
from server import login_manager
from werkzeug.security import check_password_hash, generate_password_hash

watchlists_association_table = db.Table('watchlists_association', db.Model.metadata,
                                        db.Column('user_id', db.Integer,
                                                  db.ForeignKey('User.id')),
                                        db.Column(
                                            'textbook_id', db.Integer, db.ForeignKey("Textbook.id"))

                                        )


class User(db.Model):
    def __init__(self, email, password, firstName, lastName, phoneNum):
        self.email = email
        self.set_password(password)
        self.firstName = firstName
        self.lastName = lastName
        self.phoneNum = phoneNum

    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(64), index=True, unique=True)
    password = db.Column(db.String(128))

    firstName = db.Column(db.String(64), index=True)
    lastName = db.Column(db.String(64), index=True)

    phoneNum = db.Column(db.String(64), index=True)

    textbooks = db.relationship(
        "Textbook", secondary=watchlists_association_table, back_populates="users")

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
    def __init__(self, email, title, author, isbn, price, originalPrice, courseName, description, quality, sellerFirstName, sellerLastName, sellerPhoneNo, image_url):

        self.email = email
        self.title = title
        self.author = author
        self.isbn = isbn
        self.price = price
        self.originalPrice = originalPrice
        self.courseName = courseName
        self.description = description
        self.quality = quality
        self.available = 1

        self.sellerFirstName = sellerFirstName
        self.sellerLastName = sellerLastName
        self.sellerPhoneNo = sellerPhoneNo
        self.image_url = image_url

    __tablename__ = 'Textbook'

    users = db.relationship(
        "User", secondary=watchlists_association_table, back_populates="textbooks")

    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(64), index=True)
    title = db.Column(db.String(64), index=True)
    author = db.Column(db.String(64), index=True)
    isbn = db.Column(db.String(64), index=True)
    price = db.Column(db.String(64), index=True)
    originalPrice = db.Column(db.String(64), index=True)
    courseName = db.Column(db.String(64), index=True)
    image_url = db.Column(db.String(64), index=True)

    description = db.Column(db.String(5092), index=True)
    quality = db.Column(db.String(64), index=True)

    available = db.Column(db.Integer, index=True)

    sellerFirstName = db.Column(db.String(64), index=True)
    sellerLastName = db.Column(db.String(64), index=True)
    sellerPhoneNo = db.Column(db.String(64), index=True)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
