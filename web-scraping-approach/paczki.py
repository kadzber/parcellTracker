from selenium import webdriver
from selenium.webdriver.chrome.service import Service 
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import sys
from flask import Flask,request, render_template

app = Flask(__name__,template_folder="templates")


@app.route("/")
def hello():
    return render_template('indes.html')

@app.route('/process', methods=['POST'])


def wtfGoinON():
    tracking_number = request.form.get('data')
    service = Service(executable_path="chromedriver.exe")
    driver = webdriver.Chrome(service=service)

    driver.get(f"https://inpost.pl/sledzenie-przesylek?number={tracking_number}")


    driver.find_element(By.ID, "onetrust-accept-btn-handler").click()

    elements = driver.find_elements(By.CLASS_NAME, "paragraph--component")


    state = elements[3].text

    return state

if __name__ == '__main__':
    app.run(debug=True)
      







## print(content)
