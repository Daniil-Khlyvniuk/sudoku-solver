import numpy as np


def calc_samples(y_train):
    count_samples = []

    for class_type in range(0, 10):
        count_samples.append(len(np.where(y_train == str(class_type))[0]))

    return count_samples
