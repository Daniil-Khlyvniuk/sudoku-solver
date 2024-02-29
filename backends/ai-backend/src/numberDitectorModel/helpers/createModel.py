from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten, Conv2D
from keras.optimizers.legacy import Adam
from keras.src.backend import categorical_crossentropy
from keras.src.layers import BatchNormalization, MaxPooling2D, MaxPool2D
from keras.src.optimizers import Adadelta
from keras.src.regularizers import l2
from tqdm import keras


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


def improved_model():
    model = Sequential()

    # Convolutional layers with batch normalization
    model.add(Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(28, 28, 1)))
    # model.add(BatchNormalization())
    model.add(Conv2D(64, (3, 3), activation='relu'))
    # model.add(BatchNormalization())
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Dropout(0.25))

    model.add(Conv2D(128, (3, 3), activation='relu'))
    model.add(BatchNormalization())
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Dropout(0.25))

    # Flatten before fully connected layers
    model.add(Flatten())

    # Fully connected layers
    model.add(Dense(512, activation='relu'))
    model.add(BatchNormalization())
    model.add(Dropout(0.5))
    model.add(Dense(10, activation='softmax'))

    # Compile the model
    model.compile(optimizer=Adam(learning_rate=0.001),
                  loss='categorical_crossentropy',
                  metrics=['accuracy'])

    return model


def improved_model2():
    model = Sequential()

    model.add(Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)))
    model.add(MaxPooling2D((2, 2)))
    model.add(Conv2D(64, (3, 3), activation='relu'))
    model.add(MaxPooling2D((2, 2)))
    model.add(Conv2D(128, (3, 3), activation='relu'))
    model.add(MaxPooling2D((2, 2)))
    model.add(Dropout(0.25))

    model.add(Conv2D(128, (3, 3), activation='relu'))
    model.add(BatchNormalization())
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Dropout(0.25))

    model.add(Flatten())

    model.add(Dropout(0.25))  # 0.5
    model.add(Dense(512, activation='relu', kernel_regularizer=l2(0.001)))
    model.add(Dropout(0.5))
    model.add(Dense(10, activation='softmax'))

    # Dense(10, activation='softmax')  # Assuming 10 classes for digits 0-9
    #
    # model.add(Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(28, 28, 1)))
    # model.add(BatchNormalization())
    # model.add(Conv2D(64, (3, 3), activation='relu'))
    # model.add(BatchNormalization())
    # model.add(MaxPool2D(pool_size=(2, 2)))
    #
    # model.add(Dropout(0.25))
    # model.add(Flatten())
    # model.add(Dense(128, activation='relu'))
    # model.add(BatchNormalization())
    #
    # model.add(Dropout(0.5))
    # model.add(Dense(10, activation='softmax'))

    model.compile(loss=categorical_crossentropy,
                  optimizer=Adadelta(), metrics=['accuracy'])

    # model.summary()

    # history = model.fit(X_train, y_train, epochs=5, shuffle=True,
    #                     batch_size=200, validation_data=(X_test, y_test))

    # model = Sequential()
    #
    # model.add(Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(28, 28, 1)))
    # model.add(BatchNormalization())
    # model.add(Conv2D(64, (3, 3), activation='relu'))
    # model.add(BatchNormalization())
    # model.add(MaxPooling2D(pool_size=(2, 2)))
    # model.add(Dropout(0.25))
    #
    # model.add(Conv2D(128, (3, 3), activation='relu'))
    # model.add(BatchNormalization())
    # model.add(MaxPooling2D(pool_size=(2, 2)))
    # model.add(Dropout(0.25))
    #
    # model.add(Flatten())
    #
    # model.add(Dense(512, activation='relu', kernel_regularizer=l2(0.001)))
    # model.add(BatchNormalization())
    # model.add(Dropout(0.6))
    # model.add(Dense(10, activation='softmax'))
    #
    # # Compile the model with ReduceLROnPlateau
    # model.compile(optimizer=Adam(learning_rate=0.001),
    #               loss='categorical_crossentropy',
    #               metrics=['accuracy'])

    return model
