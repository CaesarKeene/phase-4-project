from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db, User, Category, Task

app = Flask(__name__)
CORS(app)

# Configure the database URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db.init_app(app)

# Create the tables
with app.app_context():
    db.create_all()

# Routes for Users
@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        users = User.query.all()
        return jsonify([{'id': user.id, 'username': user.username} for user in users])

    elif request.method == 'POST':
        data = request.get_json()
        new_user = User(username=data['username'], password=data['password'])  # Store password in plain text
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'id': new_user.id, 'username': new_user.username}), 201
    
    
    
@app.route('/users/<int:user_id>/tasks', methods=['GET'])
def get_user_tasks(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    user_tasks = Task.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': task.id,
        'title': task.title,
        'description': task.description,
        'priority': task.priority,
        'category_id': task.category_id
    } for task in user_tasks])

@app.route('/users/<int:user_id>/tasks', methods=['POST'])
def create_user_task(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    data = request.json
    title = data.get('title')
    description = data.get('description')
    priority = data.get('priority')
    category_id = data.get('category_id')

    if not all([title, description, priority]):
        return jsonify({'error': 'Missing required fields'}), 400

    if category_id is None:
        return jsonify({'error': 'Category ID is required'}), 400

    # Check if the category exists
    category = Category.query.get(category_id)
    if not category:
        return jsonify({'error': 'Category not found'}), 404

    new_task = Task(title=title, description=description, priority=priority, user_id=user_id, category_id=category_id)
    db.session.add(new_task)
    db.session.commit()

    return jsonify({'message': 'Task added successfully'})


@app.route('/users/<int:user_id>/tasks', methods=['PUT'])
def update_user_task(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    data = request.json
    task_id = data.get('id')
    title = data.get('title')
    description = data.get('description')
    priority = data.get('priority')
    category_id = data.get('category_id')

    if not task_id:
        return jsonify({'error': 'Task ID is required'}), 400

    task = Task.query.filter_by(id=task_id, user_id=user_id).first()
    if not task:
        return jsonify({'error': 'Task not found or not associated with the user'}), 404

    if title:
        task.title = title
    if description:
        task.description = description
    if priority:
        task.priority = priority
    if category_id:
        task.category_id = category_id

    db.session.commit()

    return jsonify({'message': 'Task updated successfully'})



@app.route('/users/<int:user_id>', methods=['GET', 'DELETE'])
def user_detail(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    if request.method == 'GET':
        return jsonify({'id': user.id, 'username': user.username})

    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'})

# Routes for Categories
@app.route('/categories', methods=['GET', 'POST'])
def categories():
    if request.method == 'GET':
        categories = Category.query.all()
        return jsonify([{'id': category.id, 'name': category.name} for category in categories])

    elif request.method == 'POST':
        data = request.get_json()
        new_category = Category(name=data['name'])
        db.session.add(new_category)
        db.session.commit()
        return jsonify({'id': new_category.id, 'name': new_category.name}), 201

@app.route('/categories/<int:category_id>', methods=['GET', 'DELETE'])
def category_detail(category_id):
    category = Category.query.get(category_id)
    if not category:
        return jsonify({'error': 'Category not found'}), 404

    if request.method == 'GET':
        # Fetch the previous category
        previous_category = Category.query.filter(Category.id < category_id).order_by(Category.id.desc()).first()
        previous_category_data = {'id': previous_category.id, 'name': previous_category.name} if previous_category else None
        
        return jsonify({'id': category.id, 'name': category.name, 'previous_category': previous_category_data})

    elif request.method == 'DELETE':
        db.session.delete(category)
        db.session.commit()
        return jsonify({'message': 'Category deleted successfully'})

# Routes for Tasks
@app.route('/tasks/<int:task_id>', methods=['GET', 'PUT', 'DELETE'])
def task_detail(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404

    if request.method == 'GET':
        return jsonify({
            'id': task.id,
            'title': task.title,
            'description': task.description,
            'priority': task.priority,
            'user_id': task.user_id,
            'category_id': task.category_id
        })

    elif request.method == 'PUT':
        data = request.get_json()
        if 'title' in data:
            task.title = data['title']
        if 'description' in data:
            task.description = data['description']
        if 'priority' in data:
            task.priority = data['priority']
        if 'user_id' in data:
            task.user_id = data['user_id']
        if 'category_id' in data:
            task.category_id = data['category_id']

        db.session.commit()
        return jsonify({
            'id': task.id,
            'title': task.title,
            'description': task.description,
            'priority': task.priority,
            'user_id': task.user_id,
            'category_id': task.category_id
        })

    elif request.method == 'DELETE':
        db.session.delete(task)
        db.session.commit()
        return jsonify({'message': 'Task deleted successfully'})
    
# Routes for Tasks
@app.route('/tasks', methods=['GET', 'POST'])
def tasks():
    if request.method == 'GET':
        tasks = Task.query.all()
        return jsonify([{
            'id': task.id,
            'title': task.title,
            'description': task.description,
            'priority': task.priority,
            'user_id': task.user_id,
            'category_id': task.category_id
        } for task in tasks])

    elif request.method == 'POST':
        data = request.get_json()
        new_task = Task(
            title=data['title'],
            description=data.get('description', ''),
            priority=data['priority'],
            category_id=data.get('category_id')
        )
        db.session.add(new_task)
        db.session.commit()
        return jsonify({
            'id': new_task.id,
            'title': new_task.title,
            'description': new_task.description,
            'priority': new_task.priority,
            'user_id': new_task.user_id,
            'category_id': new_task.category_id
        }), 201
    


if __name__ == '__main__':
    app.run(debug=True)

