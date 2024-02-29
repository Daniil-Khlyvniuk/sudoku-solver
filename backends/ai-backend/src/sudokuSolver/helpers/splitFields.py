import cv2
import numpy as np


# def split_fields(img):
#     rows = np.vsplit(img, 9)
#     boxes = []
#
#     for row in rows:
#         columns = np.hsplit(row, 9)
#
#         for box in columns:
#             boxes.append(box)
#
#     return boxes

def split_fields(img):
    rows = np.vsplit(img, 9)
    boxes = []

    for row in rows:
        columns = np.hsplit(row, 9)

        for box in columns:
            boxes.append(box)

    # Crop each box to remove potential borders
    cropped_boxes = []
    for box in boxes:
        # Threshold the box to get a binary image
        _, thresh = cv2.threshold(box, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)

        # Find contours in the binary image
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        # If there are contours, find the bounding box of the largest contour
        if contours:
            max_contour = max(contours, key=cv2.contourArea)
            x, y, w, h = cv2.boundingRect(max_contour)

            # Crop the box using the bounding box
            cropped_box = box[y:y+h, x:x+w]

            # Resize the cropped box to a fixed size if needed
            # cropped_box = cv2.resize(cropped_box, (desired_width, desired_height))

            cropped_boxes.append(cropped_box)

    return cropped_boxes