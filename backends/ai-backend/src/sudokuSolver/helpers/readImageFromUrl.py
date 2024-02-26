import cv2
import requests
import numpy as np


def read_image_from_url(url):
    try:
        response = requests.get(url)

        if response.status_code == 200:
            image_bytes = np.frombuffer(response.content, np.uint8)
            image = cv2.imdecode(image_bytes, cv2.IMREAD_COLOR)

            return image
        else:
            print("Failed to download image. Status code:", response.status_code)
            return None

    except Exception as err:
        print("Error downloading image:", err)
        return None
