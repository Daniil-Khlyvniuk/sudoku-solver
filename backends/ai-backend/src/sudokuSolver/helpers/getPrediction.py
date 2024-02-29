import cv2
import numpy as np


def resize(img):
    resized_image = cv2.resize(img, (28, 28))
    processed_image = resized_image / 255.0
    processed_image = processed_image.reshape(1, 28, 28, 1)

    return processed_image


def preprocess_image(img):
    kernel = np.ones((3, 3), np.uint8)
    closing = cv2.morphologyEx(img, cv2.MORPH_RECT, kernel, iterations=1)
    ret, thresh = cv2.threshold(closing, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    processed_image = resize(thresh)

    return processed_image


def is_empty(img, model):
    img = cv2.Canny(img, 100, 200)

    predictions = model.predict(resize(img))
    classIndex = np.argmax(predictions, axis=-1)
    probabilityValue = np.amax(predictions)

    if classIndex[0] == 0:
        cv2.imshow(f'Image: {classIndex[0]} - {probabilityValue}', img.squeeze())
    return classIndex[0] == 0


def get_prediction(fields, model):
    result = []

    for field in fields:
        field_img = np.asarray(field)
        field_img = field_img[4:field_img.shape[0] - 4, 4:field_img.shape[1] - 4]

        if is_empty(field_img, model):
            result.append(0)
            continue

        processed_img = preprocess_image(field_img)
        predictions = model.predict(processed_img)
        classIndex = np.argmax(predictions, axis=-1)

        result.append(classIndex[0])

    return result
