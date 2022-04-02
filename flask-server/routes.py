from server import app

@app.route("/")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}
