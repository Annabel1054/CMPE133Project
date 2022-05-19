from flask import Flask
from flask_cors import CORS
import os
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager


basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)
CORS(app)

app.config.from_mapping(
    SECRET_KEY='secretpassword',
    SQLALCHEMY_DATABASE_URI='sqlite:///' + os.path.join(basedir, "app.db"),
    SQLALCHEMY_TRACK_MODIFICATIONS=False
)

UPLOAD_FOLDER = os.path.join(basedir, 'static')

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

db = SQLAlchemy(app)


login_manager = LoginManager(app)


import models
import routes


if __name__ == "__main__":
    app.run(debug=True)

    
