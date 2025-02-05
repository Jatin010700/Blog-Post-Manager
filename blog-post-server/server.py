import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# TEST ROUTE
@app.route('/')
def home():
    return "<h1>Flask API</h1>"
# TEST ROUTE

MONGO_DB_URI = os.getenv("MONGO_DB_URI")
client = MongoClient(MONGO_DB_URI)
db = client["BLOG"]
posts_collection = db["post"]

@app.route("/posts", methods=["GET"])
def get_posts():
    posts = list(posts_collection.find({}, {"_id": 1, "title": 1, "description": 1}))

    for post in posts:
        post["_id"] = str(post["_id"])

    return jsonify(posts)


@app.route("/posts", methods=["POST"])
def create_post():
    data = request.get_json()

    if not data.get("title") or not data.get("description"):
        return jsonify({"error": "Title and description are required"}), 400

    new_post = {"title": data["title"], "description": data["description"]}
    result = posts_collection.insert_one(new_post)
    new_post["_id"] = str(result.inserted_id)

    return jsonify(new_post),201

@app.route("/posts/<post_id>", methods=["PUT"])
def update_post(post_id):
    if not ObjectId.is_valid(post_id):
        return jsonify({"error": "Invalid post ID format"}), 400
    
    data = request.get_json()
    if not data.get("title") or not data.get("description"):
        return jsonify({"error": "Title and description are required"}), 400
    
    result = posts_collection.update_one(
        {"_id": ObjectId(post_id)},
        {"$set": {"title": data["title"], "description": data["description"]}}
    )
    
    if result.matched_count == 0:
        return jsonify({"error": "Post not found"}), 404

    return jsonify({"message": "Post updated"})

@app.route("/posts/<post_id>", methods=["DELETE"])
def delete_post(post_id):
    if not ObjectId.is_valid(post_id):
        return jsonify({"error": "Invalid post ID format"}), 400

    result = posts_collection.delete_one({"_id": ObjectId(post_id)})

    if result.deleted_count == 0:
        return jsonify({"error": "Post not found"}), 404

    return jsonify({"message": "Post deleted"}), 204


if __name__ == '__main__':
    app.run(debug=True)