from server import app, db
from flask import request, jsonify
from werkzeug.utils import secure_filename
from models import *
from flask_login import login_user, current_user


@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}


@app.route("/register_user", methods=["POST"])
def register():

    userRegisterData = request.get_json()
    print(userRegisterData)

    if request.method == "POST":
        user = User(userRegisterData["email"], userRegisterData["password"],
                    userRegisterData["firstName"], userRegisterData["lastName"], userRegisterData["phoneNum"])

        if user is not None:
            db.session.add(user)
            db.session.commit()

        return jsonify("Sended")


@app.route("/login_user", methods=["POST"])
def login():
    userLoginData = request.get_json()
    if request.method == "POST":
        email = userLoginData["email"]
        password = userLoginData["password"]

        user = User.query.filter_by(email=email).first()
        print(user)
        
        if user is None or not user.check_password(password):
            print("User not found!")
            return jsonify("No user found")
        else:
            print("User found! logging in...")


        login_user(user)

        return jsonify("Sended")


@app.route("/create_new_listing", methods=["POST"])
def new_textbook():
    # if request.method == "POST":
    # if 'file' not in request.files:
    #     return jsonify("NO FILE")

    newTextbookData = request.get_json()

    # print(newTextbookData['file'])
    # file = request.files['file']

    # if file:
    #     filename = secure_filename(file.filename)
    #     filedir = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    #     file.save(filedir)

    textbook = Textbook(newTextbooksData["email"], newTextbookData["title"], newTextbookData["author"], newTextbookData["isbn"], newTextbookData["price"], newTextbookData["originalPrice"],
                        newTextbookData["course"], 'temp image', newTextbookData["description"], newTextbookData["quality"])

    current_user.textbooks.append(textbook)
    db.session.commit()



    return jsonify("Sended")



@app.route("/find_listings", methods=["POST"])
def find_listings():
    if request.method == "GET":
        textbookSearchCriteria = request.get_json()

        textbooks = None

        if searchCriteria["filterType"] == "title" or searchCriteria["filterType"] == None:
            textbooks = Textbook.query.filter(
                Textbook.title.like(f"%{searchCriteria['entry']}%"))

        elif searchCriteria["filterType"] == "isbn":
            textbooks = Textbook.query.filter(
                Textbook.isbn.like(f"%{searchCriteria['entry']}%"))

        elif searchCriteria["filterType"] == "courseName":
            textbooks = Textbook.query.filter(
                Textbook.courseName.like(f"%{searchCriteria['entry']}%"))

        return jsonify(textbooks)
