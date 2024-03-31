import tensorflow as tf

def load_and_preprocess_data():
    fashion_mnist = tf.keras.datasets.fashion_mnist
    (train_images, train_labels), (test_images, test_labels) = fashion_mnist.load_data()
    
    # Normalize pixel values to be between 0 and 1
    train_images = train_images / 255.0
    test_images = test_images / 255.0
    
    # Resize images to (224, 224) and add channel dimension for grayscale images
    train_images = tf.image.resize(train_images[..., tf.newaxis], [224, 224])
    test_images = tf.image.resize(test_images[..., tf.newaxis], [224, 224])
    
    # Repeat the grayscale channel 3 times to simulate RGB
    train_images = tf.repeat(train_images, 3, axis=-1)
    test_images = tf.repeat(test_images, 3, axis=-1)
    
    print("Train images shape:", train_images.shape)
    print("Test images shape:", test_images.shape)
    
    return train_images, train_labels, test_images, test_labels
