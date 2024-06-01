import pymongo
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = pymongo.MongoClient("mongodb+srv://beluga0:rohit*123@flatme-cluster.zpnmcdp.mongodb.net/")
db = client["cvop"]
collection = db["users"]


@app.route('/get-data', methods=['POST'])
def get_data():
    data = request.get_json()
    if data:
        try:
            collection.insert_many(data)
            return jsonify({'message': 'Data inserted successfully', 'success': True})
        except Exception as e:
            return jsonify({'message': str(e), 'success': False})
    else:
        return jsonify({'message': 'No data received', 'success': False})


@app.route('/', methods=['GET'])
def home():
    return "Hello, this is the home page!"


if __name__ == '__main__':
    app.run(debug=True, port=1000)
