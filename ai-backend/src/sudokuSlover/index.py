from helpers.index import *
import os

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

########################################################################

path_image = "Resources/img.png"
height_img = 450
width_img = 450
model = initialize_prediction_model('Resources/myModel.h5')

########################################################################


initial_image = cv2.imread(path_image)
initial_image = cv2.resize(initial_image, (width_img, height_img))
imgBlank = np.zeros((height_img, width_img, 3), np.uint8)
imgThreshold = image_preprocess(initial_image)

img_contours = initial_image.copy()
img_big_contour = initial_image.copy()

contours, hierarchy = cv2.findContours(imgThreshold, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
# cv2.drawContours(imgContours, contours, -1, (0, 255, 0), 3)  # dev mode

biggest, maxArea = biggest_contour(contours)

if biggest.size != 0:
    biggest = reorder(biggest)

    # cv2.drawContours(imgBigContour, biggest, -1, (255, 0, 0), 25)  # dev mode
    pts1 = np.float32(biggest)
    pts2 = np.float32([[0, 0], [width_img, 0], [0, height_img], [width_img, height_img]])

    matrix = cv2.getPerspectiveTransform(pts1, pts2)
    imgWarpColored = cv2.warpPerspective(initial_image, matrix, (width_img, height_img))
    imgDetectedDigits = imgBlank.copy()
    imgWarpGray = cv2.cvtColor(imgWarpColored, cv2.COLOR_BGR2GRAY)

    imgSolvedDigits = imgBlank.copy()
    fields = split_fields(imgWarpGray)

    numbers = get_prediction(fields, model)
    imgDetectedDigits = display_numbers(imgDetectedDigits, numbers, color=(255, 0, 255))
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

    solvedNumbers = flatList * posArray
    imgSolvedDigits = display_numbers(imgSolvedDigits, solvedNumbers)

    pts2 = np.float32(biggest)
    pts1 = np.float32([[0, 0], [width_img, 0], [0, height_img], [width_img, height_img]])
    matrix = cv2.getPerspectiveTransform(pts1, pts2)
    imgInvWarpColored = initial_image.copy()
    imgInvWarpColored = cv2.warpPerspective(imgSolvedDigits, matrix, (width_img, height_img))
    inv_perspective = cv2.addWeighted(imgInvWarpColored, 1, initial_image, 0.5, 1)
    imgDetectedDigits = draw_grid(imgDetectedDigits)
    imgSolvedDigits = draw_grid(imgSolvedDigits)

    imageArray = ([initial_image, imgThreshold, img_contours, img_big_contour],
                  [imgWarpColored, imgDetectedDigits, imgSolvedDigits, inv_perspective])

    # stackedImage = stack_images(imageArray, 1)
    # cv2.imshow('Stacked Images', stackedImage)
else:
    print("No Sudoku Found")

cv2.waitKey(0)
