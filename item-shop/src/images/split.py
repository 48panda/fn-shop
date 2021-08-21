from PIL import Image
import numpy as np

image = Image.open('T_Pattern_Noise_M.png')

savename="Noise"

data = np.asarray(image)

imR = data[:,:,0]
imG = data[:,:,1]
imB = data[:,:,2]

zeroes = np.zeros(imR.shape)

print(imR.shape)

imR_M = np.dstack((imR,imR,imR,imR))
imG_M = np.dstack((imG,imG,imG,imG))
imB_M = np.dstack((imB,imB,imB,imB))

imR_M = 255 - imR_M
imG_M = 255 - imG_M
imB_M = 255 - imB_M

imR_M[:,:,3] = 255 - imR_M[:,:,3]
imG_M[:,:,3] = 255 - imG_M[:,:,3]
imB_M[:,:,3] = 255 - imB_M[:,:,3]

imageR = Image.fromarray(imR)
imageG = Image.fromarray(imG)
imageG = Image.fromarray(imB)

imageR_M = Image.fromarray(imR_M.astype(np.uint8))
imageG_M = Image.fromarray(imG_M.astype(np.uint8))
imageB_M = Image.fromarray(imG_M.astype(np.uint8))

imageR_M.save(savename+"R.png")
imageG_M.save(savename+"G.png")
imageB_M.save(savename+"B.png")
