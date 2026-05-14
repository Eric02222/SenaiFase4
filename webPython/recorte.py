from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
import cv2
import os

UPLOAD_FOLDER = "uploads"
RECORTE_FOLDER = "recortes"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RECORTE_FOLDER, exist_ok=True)

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/enviar", methods=["POST"])
def enviar():
    nome = request.form.get("nome", "").strip()
    
    if not nome:
        return "vc não digitou nenhum nome."
    
    return f"Olá, {nome}"

@app.route("/upload", methods={"POST"})
def upload():
    if "imagem" not in request.files:
        return "Nenhuma imagem foi enviada."
    arquivo = request.files["imagem"]
    
    if arquivo.filename == "":
        return "Nenhum arquivo foi selecionado"

    nome_seguro = secure_filename(arquivo.filename)
    caminho_arquivo = os.path.join(UPLOAD_FOLDER, nome_seguro)
    arquivo.save(caminho_arquivo)
    
    return f"Upload realizado com sucesso. Arquivo salvo em: {caminho_arquivo}"

@app.route("/recortar", methods=["POST"])
def recortar():
    try:
        if "imagem" not in request.files:
            return jsonify({"erro": "Nenhuma imagem enviada."}), 400
        
        arquivo = request.files["imagem"]
        nome_saida = request.form.get("nome_saida", "").strip()
        x = int(request.form.get("x", 0))
        y = int(request.form.get("y", 0))
        w = int(request.form.get("w", 0))
        h = int(request.form.get("h", 0))
        
        if not nome_saida:
            return jsonify({"erro": "Nome do arquivo de saida não informado."}), 400
        
        if w <= 0 or h <= 0:
            return jsonify({"erro": "Largura e altura devem se maiores que zero."}), 400
        
        nome_entrada_seguro = secure_filename(arquivo.filename)
        caminho_upload = os.path.join(UPLOAD_FOLDER, nome_entrada_seguro)
        arquivo.save(caminho_upload)
        
        img = cv2.imread(caminho_upload)
        if img is None:
            return jsonify({"erro": "Não foi possivel ler a imagem."}), 400
        
        altura_img, largura_img = img.shape[:2]
        
        if x < 0 or y < 0 or x + w > largura_img or y + h > altura_img:
            return jsonify({"erro": "Área de recortes fora dos limites da imagem."}), 400
        
        recorte = img[y:y+h, x:x+w]
        
        nome_saida_seguro = secure_filename(nome_saida)
        
        if not nome_saida_seguro.lower().endswith((".jpg", ".jpeg", ".png")):
            nome_saida_seguro += ".jpg"
            
        caminho_saida = os.path.join(RECORTE_FOLDER, nome_saida_seguro)
        
        sucesso = cv2.imwrite(caminho_saida, recorte)
        
        if not sucesso:
            return jsonify({"erro": "Falha ao salvar recorte."}), 500
        
        
        return jsonify({"mensagem": "Recorte salvo com sucesso", "arquivo": caminho_saida})
    except ValueError:
        return jsonify({"erro": "Valores de x, y, largura e aultura devem ser numericos "}), 400
    except Exception as e: 
        return jsonify({"erro": str(e)}), 400
    







if __name__ == "__main__":
    app.run(debug=True)