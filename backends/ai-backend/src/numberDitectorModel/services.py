from .helpers.createModel import *
from .helpers.fillClassImages import *
from .helpers.preprocessingImage import *
from .helpers.calcSamples import *
from sklearn.model_selection import train_test_split
from keras.preprocessing.image import ImageDataGenerator
from keras.utils import to_categorical


def train():
    PATH_TO_STATIC_FILES = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../static/"))
    PATH_TO_DATASET = PATH_TO_STATIC_FILES + "/DATASET_NUMBERS"
    PATH_TO_SAVED_MODELS = PATH_TO_STATIC_FILES + "/trained_models"
    DATASET_CLASSES = os.listdir(PATH_TO_DATASET)
    TRAINED_MODEL_NAME = "3_digit_classifier.keras"

    COUNT_CLASSES = len(DATASET_CLASSES)
    TEST_RATIO = 0.2
    VALIDATION_RATIO = 0.3
    RANDOM_STATE = 42
    BATCH_SIZE = 30
    EPOCHS = 24

    class_images, class_types = fill_class_images(COUNT_CLASSES, PATH_TO_DATASET)
    images = np.array(class_images)
    class_types = np.array(class_types)

    x_train, x_test, y_train, y_test = (
        train_test_split(
            images,
            class_types,
            test_size=TEST_RATIO,
            random_state=RANDOM_STATE
        )
    )

    x_train, x_validation, y_train, y_validation = (
        train_test_split(
            x_train,
            y_train,
            test_size=VALIDATION_RATIO,
            random_state=RANDOM_STATE
        )
    )

    x_train = np.array(list(map(preprocessing_image, x_train)))
    x_test = np.array(list(map(preprocessing_image, x_test)))
    x_validation = np.array(list(map(preprocessing_image, x_validation)))

    x_train = x_train.reshape(x_train.shape[0], x_train.shape[1], x_train.shape[2], 1)
    x_test = x_test.reshape(x_test.shape[0], x_test.shape[1], x_test.shape[2], 1)
    x_validation = x_validation.reshape(x_validation.shape[0], x_validation.shape[1], x_validation.shape[2], 1)

    dataGen = ImageDataGenerator(
        width_shift_range=0.2,
        height_shift_range=0.2,
        zoom_range=0.2,
        rotation_range=20,
    )

    dataGen.fit(x_train)

    y_train = to_categorical(y_train, COUNT_CLASSES)
    y_test = to_categorical(y_test, COUNT_CLASSES)
    y_validation = to_categorical(y_validation, COUNT_CLASSES)

    # model = improved_model()
    model = improved_model()

    steps_per_epoch = len(x_train) // BATCH_SIZE

    model.fit(
        dataGen.flow(x_train, y_train, batch_size=BATCH_SIZE),
        batch_size=BATCH_SIZE,
        steps_per_epoch=steps_per_epoch,
        epochs=EPOCHS,
        validation_data=(x_validation, y_validation),
        shuffle=True
    )

    model.evaluate(x_test, y_test, verbose=0)
    model.save(PATH_TO_SAVED_MODELS + "/" + TRAINED_MODEL_NAME)

    return model, TRAINED_MODEL_NAME
