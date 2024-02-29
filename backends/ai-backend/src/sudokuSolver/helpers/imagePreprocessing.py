import cv2


def image_preprocess(initial_image):
    grayscale_image = cv2.cvtColor(initial_image, cv2.COLOR_BGR2GRAY)
    blured_image = cv2.GaussianBlur(grayscale_image, (5, 5), 0)
    threshold_image = cv2.adaptiveThreshold(blured_image, 255, 1, 1, 11, 2)

    return threshold_image
