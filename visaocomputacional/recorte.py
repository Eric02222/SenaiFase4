import cv2

img = cv2.imread('img2.jpg')
edt = cv2.selectROI("Selecione a area de recorte", img , False)
cv2.destroyWindow('Selecione a area de recorte')

print(edt)

v1 = int(edt[0])
v2 = int(edt[1])
v3 = int(edt[2])
v4 = int(edt[3])



recorte = img[v2:v2+v4, v1:v1+v3]
caminho = 'imagens/' 
nome_nrquivo = input('Digite o nome do arquivo')

cv2.imwrite(f'{caminho}{nome_nrquivo}.jpg', recorte)

print('Imagem salva com sucesso!!')
cv2.imshow('Recorte', recorte)

cv2.waitKey(0)