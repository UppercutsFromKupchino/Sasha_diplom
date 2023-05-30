from flask import Flask, render_template, redirect, url_for, request
import psycopg2


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/teachers')
def teachers():
    return render_template('teachers.html')

@app.route('/api/get_course_groups')
def get_course_groups():
    conn = psycopg2.connect(dbname="Sasha_diplom", user="postgres", password="alp37327", host="localhost")
    cursor = conn.cursor()
    try:
        cursor.execute(f"SELECT * FROM course_group")
        conn.commit()
        cursor.close()
        conn.close()
        return {'message': 'ok'}
    except psycopg2.OperationalError as e:
        print(e)
        return {'message': 'db_error'}

@app.route('/api/add_request', methods=['POST'])
def hello_world():
    conn = psycopg2.connect(dbname="Sasha_diplom", user="postgres", password="alp37327", host="localhost")
    cursor = conn.cursor()
    try:
        cursor.execute(f"INSERT INTO cons_request(phone, name_, email) VALUES('{request.form['phone']}', '{request.form['name']}', '{request.form['email']}')")
        conn.commit()
        cursor.close()
        conn.close()
        return {'message': 'ok'}
    except psycopg2.OperationalError as e:
        print(e)
        return {'message': 'db_error'}

if __name__ == '__main__':
    app.run()
