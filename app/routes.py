import flask
from flask import request, jsonify

from app import app

footballers = [
    {
     	'id': 0,
     	'footballerName': 'Henrikh Mkhitaryan',
     	'link': 'https://en.wikipedia.org/wiki/Henrikh_Mkhitaryan'
    },
    {
     	'id': 1,
     	'footballerName': 'Andrea Barzagli',
     	'link': 'https://en.wikipedia.org/wiki/Andrea_Barzagli'
    },
    {
     	'id': 2,
     	'footballerName': 'Miralem Pjanić',
     	'link': 'https://en.wikipedia.org/wiki/Miralem_Pjani%C4%87'
	},
	{
	 	'id': 3,
     	'footballerName': 'Sergio Agüero',
     	'link': 'https://en.wikipedia.org/wiki/Sergio_Ag%C3%BCero'
	},
	{
	 	'id': 4,
     	'footballerName': 'Mario Balotelli',
     	'link': 'https://en.wikipedia.org/wiki/Mario_Balotelli'
	}
]

hints = [
	{
     	'hint': 'The player\'s club name is Inter Milan.'
    },
    {
     	'hint': 'The player\'s country name is Bosnia and Herzegovina.'
    },
    {
     	'hint': 'The player who scored the goal for Manchester City just before the AGUEROOOOOOOOO moment to tie the score 2-2.'
	}
]

correct = {
	'correct' : 'true'
}

wrong = {
	'correct' : 'false'
}



@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

@app.route('/api/v1/footballers/', methods=['GET'])
def api_all_footballers():
    return jsonify(footballers)


@app.route('/api/v1/hints/<number>', methods=['GET'])
def api_hint(number=0):
  	return jsonify(hints[int(number)])


@app.route('/api/v1/result', methods=['POST'])
def api_result():
	data = request.json['footballerName']
	print (data)
	print (type(data))
	ans = 'Edin Džeko'
	if data == ans:
		return jsonify(correct)
	else:
		return jsonify(wrong)
	


