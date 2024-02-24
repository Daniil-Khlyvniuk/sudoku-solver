import cv2


def display_numbers(img, numbers, color=(0, 255, 0)):
    secW = int(img.shape[1] / 9)
    secH = int(img.shape[0] / 9)

    for x in range(0, 9):
        for y in range(0, 9):
            if numbers[(y * 9) + x] != 0:
                cv2.putText(
                    img,
                    str(numbers[(y * 9) + x]),
                    (x * secW + int(secW / 2) - 10, int((y + 0.8) * secH)),
                    cv2.FONT_HERSHEY_COMPLEX_SMALL,
                    2,
                    color,
                    2,
                    cv2.LINE_AA
                )
    return img
