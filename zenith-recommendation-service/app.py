import os
import random
from flask import Flask, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
from bson.objectid import ObjectId
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app) # Allow cross-origin requests

# Connect to MongoDB
client = MongoClient(os.getenv('MONGO_URI'))
db = client['zenith-store']
products_collection = db.products

@app.route('/api/recommendations/<product_id>', methods=['GET'])
def get_recommendations(product_id):
    try:
        # Fetch all products from the database
        all_products = list(products_collection.find({}))

        # Convert all product _id's to strings for comparison
        for product in all_products:
            product['_id'] = str(product['_id'])

        # Filter out the currently viewed product
        other_products = [p for p in all_products if p['_id'] != product_id]

        # Select up to 4 random products for recommendation
        num_recommendations = min(len(other_products), 4)
        recommendations = random.sample(other_products, num_recommendations)

        return jsonify(recommendations)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
  
    app.run(port=5001, debug=True)