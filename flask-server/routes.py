from server import app, db
from flask import request, jsonify
from werkzeug.utils import secure_filename
from models import *
from flask_login import login_user

@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

@app.route("/register_user", methods=["GET", "POST"])
def register():

    userRegisterData = request.get_json()
    print(userRegisterData)

    if request.method == "POST":
        user = User(userRegisterData["email"], userRegisterData["password"], userRegisterData["firstName"], userRegisterData["lastName"])

        if user is not None:
            db.session.add(user)
            db.session.commit()

        return jsonify("Sended")

@app.route("/login_user", methods=["POST"])
def login():
    userLoginData = request.form.to_dict()
    if request.method == "POST":
        username = userLoginData["username"]
        password = userLoginData["password"]

        user = User.query.filter_by(username=username).first()

        if user is not None or not User.check_password(password):
            flash("incorrect, try again")
            return redirect(request.url)

        login_user(user)


@app.route("/create_new_listing", methods=["POST"])
def new_textbook():
    if request.method == "POST":
        if 'file' not in request.files:
            return redirect(request.url)

        
        file = request.files['image']

        if file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        newTextbookData = request.form.to_dict()

        textbook = Textbook()

@app.route("/find_listings", methods=["POST"])
def find_listings():
    if request.method == "POST":
        textbookSearchCriteria = request.form.to_dict()

        textbooks = None

        if searchCriteria["filterType"] == "title" or searchCriteria["filterType"] == None:
            textbooks = Textbook.query.filter(Textbook.title.like(f"%{searchCriteria['entry']}%"))

        elif searchCriteria["filterType"] == "isbn":
            textbooks = Textbook.query.filter(Textbook.isbn.like(f"%{searchCriteria['entry']}%"))

        elif searchCriteria["filterType"] == "courseName":
            textbooks = Textbook.query.filter(Textbook.courseName.like(f"%{searchCriteria['entry']}%"))
        
        return textbooks
            


