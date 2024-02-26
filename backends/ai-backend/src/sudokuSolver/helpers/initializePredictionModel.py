from tensorflow.keras.models import load_model


def initialize_prediction_model(path):
    return load_model(path)
