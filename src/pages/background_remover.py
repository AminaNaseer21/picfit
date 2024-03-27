import cv2

def remove_background(image_path):
    # Perform background removal using OpenCV
    # Example: Implement GrabCut algorithm
    img = cv2.imread(image_path)
    mask = np.zeros(img.shape[:2], np.uint8)
    bgd_model = np.zeros((1, 65), np.float64)
    fgd_model = np.zeros((1, 65), np.float64)
    rect = (50, 50, img.shape[1] - 50, img.shape[0] - 50)
    cv2.grabCut(img, mask, rect, bgd_model, fgd_model, 5, cv2.GC_INIT_WITH_RECT)
    mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')
    img = img * mask2[:, :, np.newaxis]
    return img

if __name__ == "__main__":
    # Example usage for testing
    input_image_path = "input_image.jpg"
    output_image = remove_background(input_image_path)
    cv2.imwrite("output_image.jpg", output_image)
