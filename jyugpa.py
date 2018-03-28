import os
import urllib
import json
from lxml import html
from flask import Flask, request, Response, make_response

app = Flask(__name__)

@app.route("/calculate", methods=["POST", "GET"])
def calculate_gpa():
    transcript = urllib.unquote(os.linesep.join([s for s in request.values["content"].splitlines() if s])).encode('utf-8')

    doc = html.fromstring(transcript)

    courses = [ c for c in doc.xpath('//tr') ]

    gp = 0
    total_credits = 0
    gpa = 0

    for c in courses:
        rows = [ r for r in c.xpath(".//td") ]
        if len(rows) == 6:
            credit = rows[2].text[:4]
            grade = rows[3].text
            try:
                gp += float(grade) * float(credit)
                total_credits += float(credit)
            except:
                continue


    if total_credits > 0:
        gpa = gp / total_credits

    resp = make_response( json.dumps( {'result': gpa} ) )
    resp.charset = "UTF-8"
    resp.mimetype = "application/json"
    return resp

if __name__ == "__main__":
    app.debug = True
    app.run(debug=True)