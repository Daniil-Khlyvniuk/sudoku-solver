from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPooling2D
from keras.optimizers.legacy import Adam


def create_model(image_dimensions, count_classes):
    count_filters = 60
    first_filter_size = (5, 5)
    second_filter_size = (3, 3)
    pool_size = (2, 2)
    count_nodes = 500

    created_model = Sequential()

    created_model.add((
        Conv2D(
            count_filters,
            first_filter_size,
            input_shape=(image_dimensions[0], image_dimensions[1], 1),
            activation='relu'
        )
    ))
    created_model.add((Conv2D(count_filters, first_filter_size, activation='relu')))
    created_model.add(MaxPooling2D(pool_size=pool_size))
    created_model.add((Conv2D(count_filters // 2, second_filter_size, activation='relu')))
    created_model.add((Conv2D(count_filters // 2, second_filter_size, activation='relu')))
    created_model.add(MaxPooling2D(pool_size=pool_size))
    created_model.add(Dropout(0.5))

    created_model.add(Flatten())
    created_model.add(Dense(count_nodes, activation='relu'))
    created_model.add(Dropout(0.5))
    created_model.add(Dense(count_classes, activation='softmax'))

    created_model.compile(Adam(learning_rate=0.001), loss='categorical_crossentropy', metrics=['accuracy'])

    return created_model
