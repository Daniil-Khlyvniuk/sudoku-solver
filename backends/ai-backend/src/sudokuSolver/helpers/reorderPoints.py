import numpy as np


def reorder(points):
    points = points.reshape((4, 2))

    reordered_points = np.zeros((4, 1, 2), dtype=np.int32)

    add = points.sum(1)
    reordered_points[0] = points[np.argmin(add)]
    reordered_points[3] = points[np.argmax(add)]

    diff = np.diff(points, axis=1)
    reordered_points[1] = points[np.argmin(diff)]
    reordered_points[2] = points[np.argmax(diff)]

    return reordered_points
