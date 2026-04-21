import cv2

imagem1 = cv2.imread('img.jpg')
imagem2 = cv2.imread('img2.jpg')

cv2.imshow('Primeira Janela', imagem1)
cv2.imshow('Segunda Janela', imagem2)

cv2.waitKey(0)

cv2.destroyAllWindows()