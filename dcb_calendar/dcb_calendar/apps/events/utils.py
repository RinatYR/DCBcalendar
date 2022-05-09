from PIL import Image
import math

SIZE_FOR_RESIZE: int = 150


def imageResize(image: Image.Image, size: int = SIZE_FOR_RESIZE):
    width, height = image.size
    if width > size and height > size:
        scale = width/size if width < height else height/size
        width = math.floor(width/scale)
        height = math.floor(height/scale)
        image = image.resize((width, height), Image.ANTIALIAS)
    return image
