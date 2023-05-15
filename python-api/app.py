from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

import jwt
import os

from algorithm import calculate_recommendations

load_dotenv()
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

app.app_context().push()

@app.route("/recommendations", methods=['POST'])
def get_recommendations():
    # parse userId from cookies
    token = request.cookies.get('refreshToken')
    userId = jwt.decode(token, os.getenv('SECRET'), algorithms=["HS256"])['id']

    # fetch necessary data from database
    from utils import get_all_products, get_based_product
    based_product = get_based_product(userId, db)
    if(based_product == None):
        return jsonify({"message": "There are no products to recommend."}), 500
    products = get_all_products(db)

    # response
    return calculate_recommendations(based_product, products)

