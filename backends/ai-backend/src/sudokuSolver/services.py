from .helpers.getBiggestContour import biggest_contour
from .helpers.imagePreprocessing import *
from .helpers.reorderPoints import *
from .helpers.splitFields import *
from .helpers.getPrediction import *
from .helpers.displayNumbers import *
from .helpers.sudukoSolver import *
from .helpers.readImageFromUrl import *
from fastapi import HTTPException

HEIGHT_IMAGE = 450
WIDTH_IMAGE = 450


def getPoints(contour):
    points_1 = np.float32(contour)
    points_2 = np.float32([[0, 0], [WIDTH_IMAGE, 0], [0, HEIGHT_IMAGE], [WIDTH_IMAGE, HEIGHT_IMAGE]])

    return points_1, points_2


def solve_solution(path_image, model):
    initial_image = read_image_from_url(path_image)

    if initial_image is None:
        raise ValueError(f"Failed to load image from path: {path_image}")

    initial_image = cv2.resize(initial_image, (WIDTH_IMAGE, HEIGHT_IMAGE))
    img_blank = np.zeros((HEIGHT_IMAGE, WIDTH_IMAGE, 3), np.uint8)
    img_threshold = image_preprocess(initial_image)

    contours, hierarchy = cv2.findContours(img_threshold, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    biggest, maxArea = biggest_contour(contours)

    if biggest.size != 0:
        biggest = reorder(biggest)
        points_1, points_2 = getPoints(biggest)

        matrix = cv2.getPerspectiveTransform(points_1, points_2)
        img_warp_colored = cv2.warpPerspective(initial_image, matrix, (WIDTH_IMAGE, HEIGHT_IMAGE))
        img_warp_gray = cv2.cvtColor(img_warp_colored, cv2.COLOR_BGR2GRAY)

        img_solved_digits = img_blank.copy()
        fields = split_fields(img_warp_gray)

        numbers = get_prediction(fields, model)
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

        points_2, points_1 = getPoints(biggest)

        matrix = cv2.getPerspectiveTransform(points_1, points_2)
        img_inv_warp_colored = cv2.warpPerspective(img_solved_digits, matrix, (WIDTH_IMAGE, HEIGHT_IMAGE))
        inv_perspective = cv2.addWeighted(img_inv_warp_colored, 1, initial_image, 0.5, 1)

        return inv_perspective, board

    else:
        raise HTTPException(status_code=404, detail=f"Sudoku is not found, check the link: \"{path_image}\"")
