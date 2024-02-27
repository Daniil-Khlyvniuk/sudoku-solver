import os
import cv2


def fill_class_images(count_classes, path_to_dataset):
    class_images = []
    class_types = []

    print('Total classes detected: ', count_classes)
    print("Importing class . . . ")

    for i in range(0, count_classes):
        class_name = str(i)
        path_to_class = path_to_dataset + "/" + class_name
        class_items_list = os.listdir(path_to_class)

        for class_item in class_items_list:
            current_image = cv2.imread(path_to_class + "/" + class_item)
            current_image = cv2.resize(current_image, (28, 28))

            class_images.append(current_image)
            class_types.append(class_name)

        print(class_name, end=" ")

    print("\n")

    return class_images, class_types
