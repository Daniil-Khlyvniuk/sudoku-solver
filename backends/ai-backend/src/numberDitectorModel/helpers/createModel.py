from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten, Conv2D
from keras.optimizers.legacy import Adam
from keras.src.layers import BatchNormalization


def create_model():
    created_model = Sequential()

    created_model.add(Conv2D(32, kernel_size=3, activation='relu', input_shape=(28, 28, 1)))
    created_model.add(BatchNormalization())
    created_model.add(Conv2D(32, kernel_size=3, activation='relu'))
    created_model.add(BatchNormalization())
    created_model.add(Conv2D(32, kernel_size=5, strides=2, padding='same', activation='relu'))
    created_model.add(BatchNormalization())
    created_model.add(Dropout(0.4))

    created_model.add(Conv2D(64, kernel_size=3, activation='relu'))
    created_model.add(BatchNormalization())
    created_model.add(Conv2D(64, kernel_size=3, activation='relu'))
    created_model.add(BatchNormalization())
    created_model.add(Conv2D(64, kernel_size=5, strides=2, padding='same', activation='relu'))
    created_model.add(BatchNormalization())
    created_model.add(Dropout(0.4))

    created_model.add(Conv2D(128, kernel_size=4, activation='relu'))
    created_model.add(BatchNormalization())
    created_model.add(Flatten())
    created_model.add(Dropout(0.4))

    created_model.add(Dense(10, activation='softmax'))

    created_model.compile(optimizer=Adam(learning_rate=0.001), loss='categorical_crossentropy', metrics=['accuracy'])

    return created_model
