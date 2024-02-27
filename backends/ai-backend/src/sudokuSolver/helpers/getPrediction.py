import cv2
import numpy as np


def preprocess_image(image):
    denoised_image = cv2.GaussianBlur(image, (5, 5), 1)
    # thresholded = cv2.adaptiveThreshold(denoised_image, 255, 1, 1, 11, 5)
    _, thresholded = cv2.threshold(denoised_image, 127, 255, cv2.THRESH_BINARY)
    resized_image = cv2.resize(thresholded, (28, 28))
    processed_image = resized_image / 255.0
    processed_image = processed_image.reshape(1, 28, 28, 1)

    return processed_image


def get_prediction(fields, model):
    result = []

    for field in fields:
        field_img = np.asarray(field)
        field_img = field_img[4:field_img.shape[0] - 4, 4:field_img.shape[1] - 4]

        processed_img = preprocess_image(field_img)

        predictions = model.predict(processed_img)
        classIndex = np.argmax(predictions, axis=-1)
        probabilityValue = np.amax(predictions)

        if classIndex[0] == 1 and probabilityValue > 0.8:
            cv2.imshow(f'Image: {classIndex[0]} - {probabilityValue}', processed_img.squeeze())

        if probabilityValue > 0.8:
            result.append(classIndex[0])
        else:
            result.append(0)

    return result
