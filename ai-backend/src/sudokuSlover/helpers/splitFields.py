import numpy as np


def split_fields(img):
    rows = np.vsplit(img, 9)
    boxes = []

    for row in rows:
        columns = np.hsplit(row, 9)

        for box in columns:
            boxes.append(box)

    return boxes
