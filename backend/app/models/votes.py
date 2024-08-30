from app import db

class Vote(db.Model):

    __tablename__ = "tb_votes"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100))
    vote = db.Column(db.Integer)

    def __repr__(self):
        return f"<Id: {self.id} - Name: {self.name} - Vote: {self.vote}>"