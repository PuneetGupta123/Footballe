from marshmallow import Schema, fields


class Footballer():
  def __init__(self, name, wikipediaLink):
    self.name = name
    self.wikipediaLink = wikipediaLink

  def __repr__(self):
    return '<Footballer(name={self.name!r})>'.format(self=self)


class TransactionSchema(Schema):
  name = fields.Str()
  wikipediaLink = fields.Str()