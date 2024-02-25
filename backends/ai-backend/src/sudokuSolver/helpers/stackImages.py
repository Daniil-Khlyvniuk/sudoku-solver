import cv2
import numpy as np


def stack_images(img_array, scale):
    rows = len(img_array)
    cols = len(img_array[0])

    rowsAvailable = isinstance(img_array[0], list)
    width = img_array[0][0].shape[1]
    height = img_array[0][0].shape[0]

    if rowsAvailable:
        for x in range(0, rows):
            for y in range(0, cols):
                img_array[x][y] = cv2.resize(img_array[x][y], (0, 0), None, scale, scale)

                if len(img_array[x][y].shape) == 2:
                    img_array[x][y] = cv2.cvtColor(img_array[x][y], cv2.COLOR_GRAY2BGR)

        imageBlank = np.zeros((height, width, 3), np.uint8)
        hor = [imageBlank] * rows
        hor_con = [imageBlank] * rows

        for x in range(0, rows):
            hor[x] = np.hstack(img_array[x])
            hor_con[x] = np.concatenate(img_array[x])

        ver = np.vstack(hor)
        ver_con = np.concatenate(hor)

    else:
        for x in range(0, rows):
            img_array[x] = cv2.resize(img_array[x], (0, 0), None, scale, scale)
            if len(img_array[x].shape) == 2: img_array[x] = cv2.cvtColor(img_array[x], cv2.COLOR_GRAY2BGR)

        hor = np.hstack(img_array)
        hor_con = np.concatenate(img_array)
        ver = hor

    return ver
