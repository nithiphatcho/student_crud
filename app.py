# from flask import Flask, render_template, request, redirect, url_for
# from flask_sqlalchemy import SQLAlchemy

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db' # เชื่อมฐานข้อมูล
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # ปิด feature ที่ไม่จำเป็น
# db = SQLAlchemy(app)

# # สร้าง Model นักเรียน
# class Student(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     student_id = db.Column(db.String(20), unique=True, nullable=False)
#     name = db.Column(db.String(100), nullable=False)
#     score = db.Column(db.Integer, nullable=False)

# # แสดงข้อมูลทั้งหมด
# @app.route('/')
# def index():
#     students = Student.query.all()
#     return render_template('index.html', students=students)

# # เพิ่มข้อมูลนักเรียน
# @app.route('/create', methods=['GET', 'POST'])
# def create():
#     if request.method == 'POST':
#         student_id = request.form['student_id']
#         name = request.form['name']
#         score = float(request.form['score'])

#         new_student = Student(student_id=student_id, name=name, score=score)
#         db.session.add(new_student)
#         db.session.commit()
#         return redirect(url_for('index'))
#     return render_template('create.html')

# # แก้ไขข้อมูลนักเรียน
# @app.route('/update/<int:id>', methods=['GET', 'POST'])
# def update(id):
#     student = Student.query.get_or_404(id)
#     if request.method == 'POST':
#         student.student_id = request.form['student_id']
#         student.name = request.form['name']
#         student.score = float(request.form['score'])

#         db.session.commit()
#         return redirect(url_for('index'))
#     return render_template('update.html', student=student)

# # ลบข้อมูลนักเรียน
# @app.route('/delete/<int:id>')
# def delete(id):
#     student = Student.query.get_or_404(id)
#     db.session.delete(student)
#     db.session.commit()
#     return redirect(url_for('index'))

# if __name__ == '__main__':
#     with app.app_context():
#         db.create_all()
#     app.run(debug=True)



from flask import Flask, render_template, request, redirect, url_for
import requests

app = Flask(__name__)
API_URL = 'https://student-crud-kcdm.onrender.com/api/students' # ควรแก้

@app.route('/')
def index():
    try:
        res = requests.get(API_URL)
        students = res.json()

        # ถ้าข้อมูลเป็น list ของ string (JSON string) ต้องแปลงก่อน
        if students and isinstance(students[0], str):
            import json
            students = [json.loads(s) for s in students]
    except Exception as e:
        print("Error loading students:", e)
        students = []

    return render_template('index.html', students=students)

@app.route('/create', methods=['GET', 'POST'])
def create():
    if request.method == 'POST':
        data = {
            'student_id': request.form['student_id'],
            'name': request.form['name'],
            'score': float(request.form['score'])
        }
        requests.post(API_URL, json=data)
        return redirect(url_for('index'))
    return render_template('create.html')

@app.route('/update/<int:id>', methods=['GET', 'POST'])
def update(id):
    if request.method == 'POST':
        data = {
            'student_id': request.form['student_id'],
            'name': request.form['name'],
            'score': float(request.form['score'])
        }
        requests.put(f"{API_URL}/{id}", json=data)
        return redirect(url_for('index'))
    students = requests.get(API_URL).json()
    student = next((s for s in students if s['id'] == id), None)
    return render_template('update.html', student=student)

@app.route('/delete/<int:id>')
def delete(id):
    requests.delete(f"{API_URL}/{id}")
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
