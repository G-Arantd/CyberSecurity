from app.models.votes import Vote, db

def get_all():
    return Vote.query.all()

def create(name, vote):
    vote = Vote(name=name, vote=vote)
    db.session.add(vote)
    db.session.commit()
    return vote