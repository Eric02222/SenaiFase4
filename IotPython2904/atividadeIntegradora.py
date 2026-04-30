import cv2

camera = cv2.VideoCapture(0)

caminho = 'saida/'

while True:
    check, img = camera.read()

    cv2.imshow('webcam', img)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
    
    if cv2.waitKey(1) & 0xFF == ord('s'):
        nome_arquivo = input('Digite o nome do arquivo: ')
        cv2.imwrite(f'{caminho}{nome_arquivo}.jpg', img)
        print('Imagem dalva com sucesso')
        
    if cv2.waitKey(1) & 0xFF == ord('r'):
        nome_arquivo_original = input('Digite o nome do arquivo original: ')
        cv2.imwrite(f'{caminho}{nome_arquivo_original}.jpg', img)
        
        areaSelect = cv2.selectROI("Selecione a area de recorte", img, fromCenter=False, showCrosshair=True)
        
        v1 = int(areaSelect[0])
        v2 = int(areaSelect[1])
        v3 = int(areaSelect[2])
        v4 = int(areaSelect[3])

        recorte = img[v2:v2+v4, v1:v1+v3]
        
        nome_arquivo = input('Digite o nome do arquivo: ')
        
        cv2.imwrite(f'{caminho}{nome_arquivo}.jpg', recorte)
        cv2.imshow('Recorte', recorte)
        print('Imagem salva com sucesso')
        cv2.destroyWindow('Selecione a area de recorte')

        
        
        
        


    
