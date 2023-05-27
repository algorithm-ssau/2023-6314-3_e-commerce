from flask import Flask, request, jsonify
import algorithm

import jwt
import os

app = Flask(__name__)


@app.route("/recommendations", methods=['POST'])
def get_recommendations():
    # parse userId from cookies
    token = request.cookies.get('refreshToken')
    userId = jwt.decode(token, os.getenv('SECRET'), algorithms=["HS256"])['id']
    return algorithm.calculate_recommendations(userId)