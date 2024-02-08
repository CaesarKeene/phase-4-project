# seed.py

from app import db, User, Category, Task

def seed_data():
    # Create some users
    user1 = User(username='user1')
    user2 = User(username='user2')

    db.session.add(user1)
    db.session.add(user2)

    # Create some categories
    category1 = Category(name='category1')
    category2 = Category(name='category2')

    db.session.add(category1)
    db.session.add(category2)

    # Create some tasks
    task1 = Task(title='Task 1', description='Description for Task 1', priority='high', user_id=user1.id, category_id=category1.id)
    task2 = Task(title='Task 2', description='Description for Task 2', priority='medium', user_id=user1.id, category_id=category2.id)
    task3 = Task(title='Task 3', description='Description for Task 3', priority='low', user_id=user2.id)

    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)

    db.session.commit()

if __name__ == "__main__":
    seed_data()
    print("Database seeded successfully.")
