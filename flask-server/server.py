from flask import Flask
import os

from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)

app.config.from_mapping(
    SECRET_KEY= 'secretpassword',
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, "app.db"),
    SQLALCHEMY_TRACK_MODIFICATIONS = False
)


'''
@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}
'''

db = SQLAlchemy(app)

if __name__ == "__main__":
    app.run(debug=True)

import models
import routes

