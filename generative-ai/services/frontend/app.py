from flask import Flask
from flask import render_template
from datetime import date
import os

app = Flask(__name__)

current_date = date.today()
current_year = current_date.year

apigateway_endpoint = os.environ.get('APIGATEWAY_ENDPOINT')

print(current_year)

@app.route("/")
def home_page():
    return render_template("index.html", year=current_year, APIGATEWAY_ENDPOINT=apigateway_endpoint)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=8080)
