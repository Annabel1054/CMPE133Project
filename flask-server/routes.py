from server import app, db
from flask import request, jsonify
from werkzeug.utils import secure_filename
from models import *
from flask_login import login_user, current_user
import json


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

        return jsonify("Logging in")


@app.route("/create_new_listing", methods=["POST"])
def new_textbook():

    newTextbookData = request.get_json()

    user = User.query.filter_by(email=newTextbookData['email']).first()

    textbook = Textbook(newTextbookData["email"], newTextbookData["title"], newTextbookData["author"], newTextbookData["isbn"], newTextbookData["price"], newTextbookData["originalPrice"],
                        newTextbookData["course"], 'temp image', newTextbookData["description"], newTextbookData["quality"], user.firstName, user.lastName, user.phoneNum)

    db.session.add(textbook)
    db.session.commit()

    return jsonify("Sended")


@app.route("/manage_listings", methods=["POST"])
def manage_listings():

    listingsData = request.get_json()

    textbooks = Textbook.query.filter(Textbook.email.like(
        listingsData["email"])).filter(Textbook.available.like("1")).all()

    return textbook_array_to_json(textbooks)


@app.route("/find_listings", methods=["POST"])
def find_listings():
    if request.method == "POST":
        searchCriteria = request.get_json()

        textbooks = None

        if searchCriteria["filterType"] == "Textbook Title" or searchCriteria["filterType"] == None:
            textbooks = Textbook.query.filter(
                Textbook.title.like(f"%{searchCriteria['entry']}%"))

        elif searchCriteria["filterType"] == "ISBN":
            textbooks = Textbook.query.filter(
                Textbook.isbn.like(f"%{searchCriteria['entry']}%"))

        elif searchCriteria["filterType"] == "Course":
            textbooks = Textbook.query.filter(
                Textbook.courseName.like(f"%{searchCriteria['entry']}%"))

        if textbooks == None and searchCriteria['entry'] == '':
            textbooks = Textbook.query

        textbooks = textbooks.filter_by(available=1).all()
        return textbook_array_to_json(textbooks)


@app.route("/get_user_watchlist", methods=["POST"])
def get_user_watchlist():
    if request.method == "POST":
        userInfo = request.get_json()

        user = User.query.filter(User.email.like(
            f"%{userInfo['email']}%")).first()

        availableTextbooks = Textbook.query.filter(
            Textbook.users.any(User.id == user.id)).filter(Textbook.available.like("1")).all()

        return textbook_array_to_json(availableTextbooks)


@app.route("/add_to_watchlist", methods=["POST"])
def add_to_watchlist():
    if request.method == "POST":
        userRequestInfo = request.get_json()

        user = User.query.filter_by(email=userRequestInfo["email"]).first()
        textbook = Textbook.query.filter_by(
            id=userRequestInfo["textbookId"]).first()

        user.textbooks.append(textbook)

        db.session.commit()

        return jsonify("Sended")


@app.route("/remove_from_watchlist", methods=["POST"])
def remove_from_watchlist():
    if request.method == "POST":
        userRequestInfo = request.get_json()

        user = User.query.filter_by(email=userRequestInfo["email"]).first()
        textbook = Textbook.query.filter_by(
            id=userRequestInfo["textbookId"]).first()

        user.textbooks.remove(textbook)

        db.session.commit()

        return jsonify("Sended")


@app.route("/modify_listing", methods=["POST"])
def modify_listing():
    modifiedTextbookData = request.get_json()
    textbookToModify = Textbook.query.filter_by(
        id=int(modifiedTextbookData["id"])).first()

    textbookToModify.email = modifiedTextbookData["email"]
    textbookToModify.title = modifiedTextbookData["title"]
    textbookToModify.author = modifiedTextbookData["author"]
    textbookToModify.isbn = modifiedTextbookData["isbn"]
    textbookToModify.price = modifiedTextbookData["price"]
    textbookToModify.originalPrice = modifiedTextbookData["originalPrice"]
    textbookToModify.course = modifiedTextbookData["course"]
    textbookToModify.description = modifiedTextbookData["description"]
    textbookToModify.quality = modifiedTextbookData["quality"]
    textbookToModify.available = modifiedTextbookData["available"]

    db.session.commit()
    return jsonify("Sended")


def textbook_array_to_json(textbooks):
    jsonTextbooks = "{ \"textbooks\" :[ "
    for t in textbooks:
        if t != textbooks[-1]:
            jsonTextbooks = jsonTextbooks + "{" + \
                "\"id\": \"" + str(t.id) + "\"," + \
                "\"firstName\": \"" + t.sellerFirstName + "\"," + \
                "\"lastName\": \"" + t.sellerLastName + "\"," + \
                "\"phoneNum\": \"" + t.sellerPhoneNo + "\"," + \
                "\"email\": \"" + t.email + "\"," + \
                "\"title\": \"" + t.title + "\"," + \
                "\"author\": \"" + t.author + "\"," + \
                "\"isbn\": \"" + t.isbn + "\"," + \
                "\"price\": \"" + t.price + "\"," + \
                "\"originalPrice\": \"" + t.originalPrice + "\"," + \
                "\"courseName\": \"" + t.courseName + "\"," + \
                "\"description\": \"" + t.description + "\"," + \
                "\"quality\": \"" + t.quality + "\"," + \
                "\"buyers\": ["

            for b in t.users:
                jsonTextbooks = jsonTextbooks + "{" + \
                    "\"buyerFirstName\": \"" + b.firstName + "\"," + \
                    "\"buyerLastName\": \"" + b.lastName + "\"," + \
                    "\"buyerEmail\": \"" + b.email + "\"," + \
                    "\"buyerPhoneNum\": \"" + b.phoneNum + "\"}"

                if b == textbooks[-1]:
                    jsonTextbooks = jsonTextbooks + ","

            jsonTextbooks = jsonTextbooks + "]"

            jsonTextbooks = jsonTextbooks + "},"
        else:
            jsonTextbooks = jsonTextbooks + "{" + \
                "\"id\": \"" + str(t.id) + "\"," + \
                "\"firstName\": \"" + t.sellerFirstName + "\"," + \
                "\"lastName\": \"" + t.sellerLastName + "\"," + \
                "\"phoneNum\": \"" + t.sellerPhoneNo + "\"," + \
                "\"email\": \"" + t.email + "\"," + \
                "\"title\": \"" + t.title + "\"," + \
                "\"author\": \"" + t.author + "\"," + \
                "\"isbn\": \"" + t.isbn + "\"," + \
                "\"price\": \"" + t.price + "\"," + \
                "\"originalPrice\": \"" + t.originalPrice + "\"," + \
                "\"courseName\": \"" + t.courseName + "\"," + \
                "\"description\": \"" + t.description + "\"," + \
                "\"quality\": \"" + t.quality + "\"," + \
                "\"buyers\": ["

            for b in t.users:
                jsonTextbooks = jsonTextbooks + "{" + \
                    "\"buyerFirstName\": \"" + b.firstName + "\"," + \
                    "\"buyerLastName\": \"" + b.lastName + "\"," + \
                    "\"buyerEmail\": \"" + b.email + "\"," + \
                    "\"buyerPhoneNum\": \"" + b.phoneNum + "\"}"

                if b == textbooks[-1]:
                    jsonTextbooks = jsonTextbooks + ","

            jsonTextbooks = jsonTextbooks + "]"

            jsonTextbooks = jsonTextbooks + "}"

    jsonTextbooks = jsonTextbooks + "]}"

    print(jsonTextbooks)

    return jsonTextbooks
