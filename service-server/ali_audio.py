# coding=utf-8

from flask import Flask, request, send_file
from flask_cors import CORS
import dashscope
from dashscope.audio.tts_v2 import *
import io

app = Flask(__name__)
CORS(app)  # 启用CORS

model = "cosyvoice-v1"
voice = "longxiaochun"

@app.route('/synthesize', methods=['POST'])
def synthesize_speech():
    api_key = request.json.get('api_key')
    text = request.json.get('text')
    if not api_key or not text:
        return '缺少API密钥或文本参数', 400
    
    dashscope.api_key = api_key
    synthesizer = SpeechSynthesizer(model=model, voice=voice)
    
    audio = synthesizer.call(text)
    print('requestId: ', synthesizer.get_last_request_id())
    
    audio_io = io.BytesIO(audio)
    response = send_file(audio_io, mimetype='audio/mp3')
    response.headers.add('Access-Control-Allow-Origin', '*')  # 允许所有来源访问
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5100)