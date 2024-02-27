import cv2


def preprocessing_image(init_img):
    img = cv2.cvtColor(init_img, cv2.COLOR_BGR2GRAY)
    img = cv2.equalizeHist(img)
    img = img / 255

    return img
