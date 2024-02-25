from .helpers.getBiggestContour import *
from .helpers.imagePreprocessing import *
from .helpers.reorderPoints import *
from .helpers.splitFields import *
from .helpers.getPrediction import *
from .helpers.displayNumbers import *
from .helpers.sudukoSolver import *
from .helpers.readImageFromUrl import *

from fastapi import HTTPException


def solve_solution(path_image, model):
    HEIGHT_IMAGE = 450
    WIDTH_IMAGE = 450

    initial_image = read_image_from_url(path_image)
    if initial_image is None:
        raise ValueError(f"Failed to load image from path: {path_image}")

    initial_image = cv2.resize(initial_image, (WIDTH_IMAGE, HEIGHT_IMAGE))
    img_blank = np.zeros((HEIGHT_IMAGE, WIDTH_IMAGE, 3), np.uint8)
    img_threshold = image_preprocess(initial_image)

    contours, hierarchy = cv2.findContours(img_threshold, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    # cv2.drawContours(img_contours, contours, -1, (0, 255, 0), 3)  # dev mode

    biggest, maxArea = biggest_contour(contours)

    if biggest.size != 0:
        biggest = reorder(biggest)

        pts1 = np.float32(biggest)
        pts2 = np.float32([[0, 0], [WIDTH_IMAGE, 0], [0, HEIGHT_IMAGE], [WIDTH_IMAGE, HEIGHT_IMAGE]])

        matrix = cv2.getPerspectiveTransform(pts1, pts2)
        img_warp_colored = cv2.warpPerspective(initial_image, matrix, (WIDTH_IMAGE, HEIGHT_IMAGE))
        img_detected_digits = img_blank.copy()
        img_warp_gray = cv2.cvtColor(img_warp_colored, cv2.COLOR_BGR2GRAY)

        img_solved_digits = img_blank.copy()
        fields = split_fields(img_warp_gray)

        numbers = get_prediction(fields, model)
        # img_detected_digits = display_numbers(img_detected_digits, numbers, color=(255, 0, 255))
        numbers = np.asarray(numbers)
        posArray = np.where(numbers > 0, 0, 1)

        board = np.array_split(numbers, 9)

        try:
            solve_sudoku(board)
        except:
            pass

        flatList = []

        for sublist in board:
            for item in sublist:
                flatList.append(item)

        solved_numbers = flatList * posArray

        img_solved_digits = display_numbers(img_solved_digits, solved_numbers)

        pts2 = np.float32(biggest)
        pts1 = np.float32([[0, 0], [WIDTH_IMAGE, 0], [0, HEIGHT_IMAGE], [WIDTH_IMAGE, HEIGHT_IMAGE]])

        matrix = cv2.getPerspectiveTransform(pts1, pts2)
        img_inv_warp_colored = cv2.warpPerspective(img_solved_digits, matrix, (WIDTH_IMAGE, HEIGHT_IMAGE))
        inv_perspective = cv2.addWeighted(img_inv_warp_colored, 1, initial_image, 0.5, 1)

        return initial_image, inv_perspective, board, solved_numbers

    else:
        raise HTTPException(status_code=404, detail=f"Sudoku is not found, check the link: \"{path_image}\"")
