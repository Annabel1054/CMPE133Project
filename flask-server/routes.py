from server import app

from models import User

@app.route("/")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}
