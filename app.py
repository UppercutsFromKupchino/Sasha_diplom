from flask import Flask, render_template, redirect, url_for, request
import psycopg2, psycopg2.extras
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/admin')
def admin():
    return render_template('admin.html')

@app.route('/teachers')
def teachers():
    return render_template('teachers.html')

@app.route('/courses')
def courses():
    return render_template('courses.html')

@app.route('/reviews')
def reviews():
    return render_template('reviews.html')

@app.route('/api/init_teachers', methods=['POST'])
def init_teachers():
    conn = psycopg2.connect(dbname="diplom_sasha", user="postgres", password="alp37327", host="localhost")
    cursor = conn.cursor(cursor_factory = psycopg2.extras.RealDictCursor)
    try:
        cursor.execute("SELECT * FROM course_group")
        data_cg = cursor.fetchall()
        cursor.execute("SELECT * FROM teacher")
        data_t = cursor.fetchall()
        cursor.close()
        conn.close()
    except psycopg2.OperationalError as e:
        print(e)
        return {'message': 'db_error'}
    data_cg.insert(0, {'id_': 0, 'name_': 'Все направления'})
    return {'teachers': data_t,
            'course_groups': data_cg,
            'ok': True}

@app.route('/api/init_reviews', methods=['GET'])
def init_reviews():
    conn = psycopg2.connect(dbname="diplom_sasha", user="postgres", password="alp37327", host="localhost")
    cursor = conn.cursor(cursor_factory = psycopg2.extras.RealDictCursor)
    try:
        cursor.execute("select review.id_, review.text_, review.name_ as review_name, course.name_ as course_name from review join course on course.id_=review.course_id")
        data = cursor.fetchall()
        cursor.close()
        conn.close()
    except psycopg2.OperationalError as e:
        print(e)
        return {'message': 'db_error',
                'ok': False}
    return {'reviews': data,
            'ok': True}

@app.route('/api/get_courses', methods=['POST'])
def get_courses():
    conn = psycopg2.connect(dbname="diplom_sasha", user="postgres", password="alp37327", host="localhost")
    cursor = conn.cursor(cursor_factory = psycopg2.extras.RealDictCursor)
    try:
        cursor.execute("SELECT course.photo, course.id_, course.name_ as course_name, course.duration, course.description, course.price, course_group.name_ as course_group_name from course join course_group on course_group.id_=course.course_group_id")
        data = cursor.fetchall()
        cursor.close()
        conn.close()
    except psycopg2.OperationalError as e:
        print(e)
        return {'message': 'db_error'}
    return {'courses': data,
            'ok': True}

@app.route('/api/get_courses_review', methods=['GET'])
def get_courses_review():
    conn = psycopg2.connect(dbname="diplom_sasha", user="postgres", password="alp37327", host="localhost")
    cursor = conn.cursor(cursor_factory = psycopg2.extras.RealDictCursor)
    try:
        cursor.execute("SELECT course.id_, course.name_ from course")
        data = cursor.fetchall()
        cursor.close()
        conn.close()
    except psycopg2.OperationalError as e:
        print(e)
        return {'message': 'db_error'}
    return {'courses': data,
            'ok': True}

@app.route('/api/get_teachers', methods=['POST'])
def get_teachers():
    conn = psycopg2.connect(dbname="diplom_sasha", user="postgres", password="alp37327", host="localhost")
    cursor = conn.cursor(cursor_factory = psycopg2.extras.RealDictCursor)
    try:
        if(request.form['id'] == '0'):
            cursor.execute("select distinct teacher.id_,teacher.name_,teacher.description,teacher.photo from teacher join teacher_in_course on teacher.id_=teacher_in_course.teacher_id join course on course.id_=teacher_in_course.course_id")
        else:
            cursor.execute(f"select distinct teacher.id_, teacher.name_, teacher.description, teacher.photo from teacher join teacher_in_course on teacher.id_=teacher_in_course.teacher_id join course on course.id_=teacher_in_course.course_id WHERE course_group_id = {request.form['id']}")
        data = cursor.fetchall()
        cursor.close()
        conn.close()
    except psycopg2.OperationalError as e:
        print(e)
        return {'message': 'db_error'}
    return {'teachers': data,
            'ok': True}

@app.route('/api/add_request', methods=['POST'])
def add_request():
    conn = psycopg2.connect(dbname="diplom_sasha", user="postgres", password="alp37327", host="localhost")
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
    
@app.route('/api/add_review', methods=['POST'])
def add_review():
    conn = psycopg2.connect(dbname="diplom_sasha", user="postgres", password="alp37327", host="localhost")
    cursor = conn.cursor()
    try:
        cursor.execute(f"INSERT INTO review(phone, name_, text_, course_id) VALUES('{request.form['phone']}', '{request.form['name']}', '{request.form['text']}', '{request.form['course_id']}')")
        conn.commit()
        cursor.close()
        conn.close()
        return {'ok': True}
    except psycopg2.OperationalError as e:
        print(e)
        return {'message': 'db_error'}
    
@app.route('/api/add_request_course', methods=['POST'])
def add_request_course():
    conn = psycopg2.connect(dbname="diplom_sasha", user="postgres", password="alp37327", host="localhost")
    cursor = conn.cursor()
    try:
        cursor.execute(f"INSERT INTO course_request(phone, name_, course_id, status_id) VALUES('{request.form['phone']}', '{request.form['name']}', '{request.form['course_id']}', '1')")
        conn.commit()
        cursor.close()
        conn.close()
        return {'ok': True,
                'message': ''}
    except psycopg2.OperationalError as e:
        print(e)
        return {'message': 'db_error'}

if __name__ == '__main__':
    app.run()
