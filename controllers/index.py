from flask import *

index = Blueprint('index', __name__, template_folder='templates')

@index.route('/', methods=['GET'])
def index_page():
	return render_template("minekeeper.html")