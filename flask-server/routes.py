from server import app, db
from flask import request
from models import *

@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

@app.route("/register_user", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        userRegisterData = request.form.to_dict()
        user = User(userRegisterData["email"], userRegisterData["password"], userRegisterData["firstName"], userRegisterData["lastName"])

        if user is not None:
            db.session.add(user)
            db.session.commit()


