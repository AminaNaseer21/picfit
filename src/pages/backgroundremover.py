# remove_bg.py

from flask import Flask, request, send_file
from rembg import remove
from PIL import Image

app = Flask(__name__)

@app.route('/process_image', methods=['POST'])
def process_image():
    input_file = request.files['image']
    input_image = Image.open(input_file)
    output_image = remove(input_image)
    output_path = 'output.png'  # Temporary output path
    output_image.save(output_path)
    return send_file(output_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
