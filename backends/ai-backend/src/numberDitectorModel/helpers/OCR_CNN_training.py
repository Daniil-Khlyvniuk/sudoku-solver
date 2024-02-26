
from .createModel import *
from .fillClassImages import *
from .preprocessingImage import *
from .calcSamples import *

# PATH_TO_DATASET = '../DATASET_NUMBERS'
# DATASET_CLASSES = os.listdir(PATH_TO_DATASET)
# count_classes = len(DATASET_CLASSES)
#
# TEST_RATIO = 0.2
# VALIDATION_RATIO = 0.2
# RANDOM_STATE = 42
# IMAGE_DIMENSIONS = (28, 28, 1)
# BATCH_SIZE = 50
# EPOCHS = 10
#
# class_images, class_types = fill_class_images(count_classes, PATH_TO_DATASET)
#
# images = np.array(class_images)
# class_types = np.array(class_types)
#
# x_train, x_test, y_train, y_test = (
#     train_test_split(
#         images,
#         class_types,
#         test_size=TEST_RATIO,
#         random_state=RANDOM_STATE
#     )
# )
#
# x_train, x_validation, y_train, y_validation = (
#     train_test_split(
#         x_train,
#         y_train,
#         test_size=VALIDATION_RATIO,
#         random_state=RANDOM_STATE
#     )
# )
#
# count_samples = calc_samples(y_train)
#
# x_train = np.array(list(map(preprocessing_image, x_train)))
# x_test = np.array(list(map(preprocessing_image, x_test)))
# x_validation = np.array(list(map(preprocessing_image, x_validation)))
#
# x_train = x_train.reshape(x_train.shape[0], x_train.shape[1], x_train.shape[2], 1)
# x_test = x_test.reshape(x_test.shape[0], x_test.shape[1], x_test.shape[2], 1)
# x_validation = x_validation.reshape(x_validation.shape[0], x_validation.shape[1], x_validation.shape[2], 1)
#
# dataGen = ImageDataGenerator(
#     width_shift_range=0.1,
#     height_shift_range=0.1,
#     zoom_range=0.2,
#     shear_range=0.1,
#     rotation_range=10,
# )
#
# dataGen.fit(x_train)
#
# y_train = to_categorical(y_train, count_classes)
# y_test = to_categorical(y_test, count_classes)
# y_validation = to_categorical(y_validation, count_classes)
#
# model = create_model(IMAGE_DIMENSIONS, count_classes)
#
# steps_per_epoch = len(x_train) // BATCH_SIZE
#
# history = model.fit(
#     dataGen.flow(x_train, y_train, batch_size=BATCH_SIZE),
#     batch_size=BATCH_SIZE,
#     steps_per_epoch=steps_per_epoch,
#     epochs=EPOCHS,
#     validation_data=(x_validation, y_validation),
#     shuffle=True
# )
#
# score = model.evaluate(x_test, y_test, verbose=0)
#
# model.save('./tmp/trained_model.keras')
