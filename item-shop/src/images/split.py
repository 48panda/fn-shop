from PIL import Image
import numpy as np

image = Image.open('T_Marvel_Series.png')

data = np.asarray(image)

imR = data[:,:,0]
imG = data[:,:,1]

zeroes = np.zeros(imR.shape)

print(imR.shape)

imR_M = np.dstack((imR,imR,imR,imR))
imG_M = np.dstack((imG,imG,imG,imG))

imR_M = 255 - imR_M
imG_M = 255 - imG_M

imR_M[:,:,3] = 255 - imR_M[:,:,3]
imG_M[:,:,3] = 255 - imG_M[:,:,3]

imageR = Image.fromarray(imR)
imageG = Image.fromarray(imG)

imageR_M = Image.fromarray(imR_M.astype(np.uint8))
imageG_M = Image.fromarray(imG_M.astype(np.uint8))

imageR.save("MarvelR.png")
imageG.save("MarvelG.png")

imageR_M.save("MarvelMaskR.png")
imageG_M.save("MarvelMaskG.png")
