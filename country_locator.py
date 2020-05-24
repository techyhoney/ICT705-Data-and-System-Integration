from bottle import run,get,response,request,template,route
from petl import selecteq,fromcsv,look

covid_countries = fromcsv('covid_countries.csv')

@route('/')
def index():
	return """<b>Welcome to a Bottle Based Web Service. Utilize the directions below to find the Output.</b>
     <ul> 
         <li>To Use This Web Service Please Enter The underneath Link 
in the Web Browser.</li>
         <li>http://localhost:8080/getlocation?country=xxx</li>
     </u1>
     <p>Where xxx is the name of the country.</p>"""

def GetHeader():
	response.headers['Access-Control-Allow-Origin'] = '*'
	response.headers['Content-type'] = 'application/json'

@get("/getcountry")
def getcountry():
	GetHeader()
	country = request.query.get('country').replace(" ","").upper() 
	Fetch_Country = selecteq(covid_countries,'name',country)
	if (Fetch_Country.len() != 2):
		return country + " Not included in our CaseStudy"
	jsonData = {
	"name": Fetch_Country[1][1],
	"date": Fetch_Country[1][2],
	"total_cases": Fetch_Country[1][3],
	"new_cases": Fetch_Country[1][6],
	"total_cases_per_million": Fetch_Country[1][9],
	"total_recovered": Fetch_Country[1][4],
	"total_active": Fetch_Country[1][5],
	"new_deaths": Fetch_Country[1][8],
	"total_deaths": Fetch_Country[1][7],
	"total_deaths_per_million": Fetch_Country[1][11],
	"lat": Fetch_Country[1][31],
	"long": Fetch_Country[1][32]
	}
	return jsonData
run(reloader=True,debug=True)
