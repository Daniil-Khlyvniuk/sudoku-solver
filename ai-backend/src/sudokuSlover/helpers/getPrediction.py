import cv2
import numpy as np


def get_prediction(fields, model):
    result = []

    for field in fields:
        field_img = np.asarray(field)
        field_img = field_img[4:field_img.shape[0] - 4, 4:field_img.shape[1] - 4]
        field_img = cv2.resize(field_img, (28, 28))
        field_img = field_img / 255
        field_img = field_img.reshape(1, 28, 28, 1)

        predictions = model.predict(field_img)
        classIndex = np.argmax(predictions, axis=-1)
        probabilityValue = np.amax(predictions)

        if probabilityValue > 0.8:
            result.append(classIndex[0])
        else:
            result.append(0)

    return result
