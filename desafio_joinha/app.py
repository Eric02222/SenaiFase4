from flask import Flask, render_template, Response, jsonify
import cv2
import mediapipe as mp

app = Flask(__name__)
gesto_atual = "nenhum"

mp_maos = mp.solutions.hands
mp_desenho = mp.solutions.drawing_utils

maos = mp_maos.Hands(
    max_num_hands=1,
    min_detection_confidence=0.7,
    min_tracking_confidence=0.7
)

def eh_joinha(landmarks):
    polegar_para_cima = (
        landmarks[4].y < landmarks[3].y and
        landmarks[3].y < landmarks[2].y
    )
    
    indicador_dobrado = landmarks[8].y > landmarks[6].y
    medio_dobrado = landmarks[12].y > landmarks[10].y
    anelar_dobrado = landmarks[16].y > landmarks[14].y
    mindinho_dobrado = landmarks[20].y > landmarks[18].y
    
    outros_dedos_dobrados = (
        indicador_dobrado and 
        medio_dobrado and
        anelar_dobrado and
        mindinho_dobrado
    )
    
    return polegar_para_cima and outros_dedos_dobrados


def eh_hangloose(landmarks):
    polegar_para_cima = (
        landmarks[4].y < landmarks[3].y and
        landmarks[3].y < landmarks[2].y
    )
    
    mindinho_para_cima = (
        landmarks[20].y < landmarks[18].y and
        landmarks[18].y < landmarks[16].y
    )
    
    indicador_dobrado = landmarks[8].y > landmarks[6].y
    medio_dobrado = landmarks[12].y > landmarks[10].y
    anelar_dobrado = landmarks[16].y > landmarks[14].y
    
    outros_dedos_dobrados = (
        indicador_dobrado and 
        medio_dobrado and
        anelar_dobrado 
    )
    
    return polegar_para_cima and mindinho_para_cima and outros_dedos_dobrados


@app.route('/')
def home():
    return render_template('index.html')

def gerar_frames():
    global gesto_atual
    
    camera = cv2.VideoCapture(0)
    
    if not camera.isOpened():
        print("Erro: não foi possivel abrir a camera.")
        return
    
    try:
        while True:
            sucesso, frame = camera.read()
            
            if not sucesso:
                break
            
            frame = cv2.flip(frame, 1)
            imagem_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            resultado = maos.process(imagem_rgb)
            
            gesto_atual = "nenhum"
            
            if resultado.multi_hand_landmarks:
                for mao in resultado.multi_hand_landmarks:
                    mp_desenho.draw_landmarks(
                        frame, mao, mp_maos.HAND_CONNECTIONS
                    )
                    
                    if eh_joinha(mao.landmark):
                        gesto_atual = "joinha"
                        
                        cv2.putText(
                            frame,
                            "JOINHA DETECTADO!",
                            (30, 60),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            1,
                            (0, 255, 0),
                            3
                        )
                        
                    if eh_hangloose(mao.landmark):
                        gesto_atual = "HangLoose"
                        
                        cv2.putText(
                            frame,
                            "HangLoose DETECTADO!",
                            (30, 60),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            1,
                            (0, 255, 0),
                            3
                        )
                        
            ret, buffer = cv2.imencode('.jpg', frame)
            
            if not ret:
                continue
            
            frame_bytes = buffer.tobytes()
            
            yield (
                b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n'
            )
    finally:
        camera.release()
        
@app.route('/video_feed')
def video_feed():
    return Response(
        gerar_frames(),
        mimetype='multipart/x-mixed-replace; boundary=frame'
    )
    

@app.route('/gesture_status')
def gesture_status():
    return jsonify({
        "gesto": gesto_atual,
        "joinha": gesto_atual == "joinha",
        "HangLoose": gesto_atual == "HangLoose"
    })
    
    
if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)