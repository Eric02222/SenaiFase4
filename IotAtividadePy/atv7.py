import cv2

camera = cv2.VideoCapture(0)

while True:
    check,img = camera.read()
    
    cv2.imshow('Webcam', img)
    
    if cv2.waitKey(1) & 0xFF == ord('s'):
        edt = cv2.selectROI("Selecione a area de recorte", camera , False)
        v1 = int(edt[0])
        v2 = int(edt[1])
        v3 = int(edt[2])
        v4 = int(edt[3])



        recorte = img[v2:v2+v4, v1:v1+v3]
        caminho = 'saida/' 
        nome_arquivo = input('Digite o nome do arquivo')

        cv2.imwrite(f'{caminho}{nome_arquivo}.jpg', recorte)

    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
    
camera.release()
cv2.destroyAllWindows()