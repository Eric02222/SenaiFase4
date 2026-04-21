import cv2

imagem = cv2.imread('img1.jpg')

    
nome_nrquivo = input('Digite o nome do arquivo')
caminho = 'saida/' 

print(f"Imagem salva com sucesso em: {caminho}")
   
cv2.imwrite(f'{caminho}{nome_nrquivo}.jpg', imagem)
cv2.imshow('Imagem Original', imagem)
cv2.waitKey(0)
cv2.destroyAllWindows()