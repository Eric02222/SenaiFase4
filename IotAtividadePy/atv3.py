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
nome_arquivo = input('Digite o nome do arquivo')

cv2.imwrite(f'{caminho}{nome_arquivo}.jpg', recorte)


img2 = cv2.imread('img1.jpg')
edt2 = cv2.selectROI("Selecione a area de recorte", img2 , False)
cv2.destroyWindow('Selecione a area de recorte')

print(edt2)

v1_2 = int(edt2[0])
v2_2 = int(edt2[1])
v3_2 = int(edt2[2])
v4_2 = int(edt2[3])



recorte2 = img2[v2_2:v2_2+v4_2, v1_2:v1_2+v3_2]
nome_arquivo2 = input('Digite o nome do arquivo')

cv2.imwrite(f'{caminho}{nome_arquivo2}.jpg', recorte2)

print('Imagens salvas com sucesso!!')

cv2.waitKey(0)