from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_request', methods=['POST'])
def index():
    return render_template('index.html')

@app.route('/teachers')
def teachers():
    return render_template('teachers.html')

if __name__ == '__main__':
    app.run()
