import pymongo
from flask import Flask, request, jsonify
from flask_cors import CORS
from bson import json_util
from run_ import generate_resume


app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = pymongo.MongoClient("mongodb+srv://beluga0:rohit*123@flatme-cluster.zpnmcdp.mongodb.net/")
db = client["cvop"]
collection = db["users"]


@app.route('/create-resume',methods=['POST','GET'])
def create_resume():
    data = request.get_json()
    desc = data['job_desc']
    data = collection.find_one({'email':'rohitcode005@gmail.com'})

    generate_resume(data)

    return jsonify({'success':True})

@app.route('/get-details',methods=['POST','GET'])
def get_details():
    print("get details")
    data = collection.find_one({'email':'rohitcode005@gmail.com'})
    # print('Get Details : ',data)
    return json_util.dumps(data), 200, {'Content-Type': 'application/json'}


@app.route('/get-data', methods=['POST','GET'])
def get_data():
    data = request.get_json()
    if data:
        try:
            print("data added : ",db.list_collection_names())
            print("Data : ",data)
            collection.insert_one(data)
            return jsonify({'message': 'Data inserted successfully', 'success': True})
        except Exception as e:
            print("Error : ",e)
            return jsonify({'message': str(e), 'success': False})
    else:
        print("Problme")
        return jsonify({'message': 'No data received', 'success': False})

@app.route('/signup',methods=['POST','GET'])
def signup():
    data = request.get_json()
    if data:
        print("Signup Data : ",data,data['email'])
        collection.insert_one(data)
        return jsonify({'message':'Account Created','success':True,'id':data['email']})

    return jsonify({'message':'no data received','success':False})

@app.route('/login',methods=['POST','GET'])
def login():
    data = request.get_json()
    if data:
        print("Login Data : ",data)
        if collection.find_one(data):
            return jsonify({'message':'login successful','success':True})
        else:
            return jsonify({'message':'account not found','success':False})
            
    return jsonify({'message':'no data received','success':False})


@app.route('/', methods=['GET'])
def home():
    return "Hello, this is the home page!"


if __name__ == '__main__':
    app.run(debug=True, port=1000)
