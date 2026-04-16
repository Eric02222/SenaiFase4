import cv2

camera = cv2.VideoCapture(0)

while True:
    check,img = camera.read()
    
    cv2.imshow('Webcam', img)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break