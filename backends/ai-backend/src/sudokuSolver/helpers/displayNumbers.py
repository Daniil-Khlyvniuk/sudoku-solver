import cv2


def display_numbers(img, numbers, color=(0, 255, 0)):
    sec_w = int(img.shape[1] / 9)
    sec_h = int(img.shape[0] / 9)

    for x in range(0, 9):
        for y in range(0, 9):
            if numbers[(y * 9) + x] != 0:
                cv2.putText(
                    img,
                    str(numbers[(y * 9) + x]),
                    (x * sec_w + int(sec_w / 2) - 10, int((y + 0.8) * sec_h)),
                    cv2.FONT_HERSHEY_COMPLEX_SMALL,
                    2,
                    color,
                    2,
                    cv2.LINE_AA
                )
    return img
