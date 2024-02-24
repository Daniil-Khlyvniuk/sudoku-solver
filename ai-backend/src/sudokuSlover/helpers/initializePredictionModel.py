from tensorflow.keras.models import load_model


# READ THE MODEL WEIGHTS
def initialize_prediction_model(path):
    model = load_model(path)
    return model