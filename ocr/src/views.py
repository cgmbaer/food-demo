from src import app
from PIL import Image
import pytesseract
import sys
from flask import jsonify

@app.route('/')
def index():
    return jsonify({'name': 'alice',
                       'email': 'alice@outlook.com'})

@app.route('/api/image-to-text')
def image_to_text():
    im = Image.open("src/test1.jpg")
    text = pytesseract.image_to_string(im, lang = 'deu')
    print('Hello world!', file=sys.stderr)
    return jsonify({'myText': text})