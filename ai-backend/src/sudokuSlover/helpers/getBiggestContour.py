import cv2
import numpy as np


def is_square(approx_value) -> bool:
    return len(approx_value) == 4


def is_aria_big_enough(aria_value) -> bool:
    return aria_value > 50


def biggest_contour(contours):
    biggest = np.array([])
    max_area = 0

    for contur in contours:
        area = cv2.contourArea(contur)

        if is_aria_big_enough(area):
            peri = cv2.arcLength(contur, True)
            approx = cv2.approxPolyDP(contur, 0.02 * peri, True)

            if area > max_area and is_square(approx):
                biggest = approx
                max_area = area

    return biggest, max_area
