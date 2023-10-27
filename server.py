
from flask import Flask, jsonify, request
import pymysql
import json, datetime

app = Flask(__name__)

# 데이터 베이스 연결
db = pymysql.connect(host="localhost", 
                     user="root", password="passwd", 
                     db="test4",
                     charset="utf8",
                     cursorclass=pymysql.cursors.DictCursor)

cursor = db.cursor()

def json_default(value):
  if isinstance(value, datetime.date):
    return value.strftime('%Y-%m-%d')
  raise TypeError('not JSON serializable')  

def query_db(query, args=(), one=False):
    cur = db.cursor()
    cur.execute(query, args)
    r = [dict((cur.description[i][0], value) \
               for i, value in enumerate(row)) for row in cur.fetchall()]
    cur.connection.close()
    return (r[0] if r else None) if one else r


@app.route("/Login", methods=['GET', 'POST'])
def auth(): 
  userData = request.get_json() # ID, PW 받아와서 userData에 넣음
  receive_id = userData['ID']
  receive_pw = userData['PW']
  print(receive_id)
  print(receive_pw)
  
  sql = "select userId, ID, password from User where ID=%s and status= 'active';"
  cursor.execute(sql, receive_id)
  row = cursor.fetchone()
  # print(row)
  # return ''
  
  if row and receive_id == row['ID'] and receive_pw == row['password']: 
    return json.dumps(receive_id, default=json_default)
           



# @app.route("/insert", methods=['GET', 'POST'])
# def datas() :
#     userinfo = request.form
#     user = request.get_json()

#     print('/datas에 들어옴')
#     print(user['name'])
#     cursor.execute("INSERT INTO User(name, ID, password, phoneNumber) VALUES (%s, %s, %s, %s);",(user['name'], user['ID'], user['password'], user['phoneNumber']) )
#     cursor.connection.commit()

#     return ''

if __name__ == "__main__" :
    app.run(debug=True)