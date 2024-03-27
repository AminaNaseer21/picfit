import tensorflow as tf

def load_and_preprocess_data():
    fashion_mnist = tf.keras.datasets.fashion_mnist
    (train_images, train_labels), (test_images, test_labels) = fashion_mnist.load_data()
    
    # Normalize pixel values to be between 0 and 1
    train_images = train_images / 255.0
    test_images = test_images / 255.0
    
    # Resize images to (224, 224)
    train_images = tf.image.resize(train_images, [224, 224])
    test_images = tf.image.resize(test_images, [224, 224])
    
    # Add channel dimension
    train_images = tf.expand_dims(train_images, axis=-1)  # Add channel dimension for grayscale images
    test_images = tf.expand_dims(test_images, axis=-1)  # Add channel dimension for grayscale images
    
    # Print shapes for debugging
    print("Train images shape:", train_images.shape)
    print("Test images shape:", test_images.shape)
    
    return train_images, train_labels, test_images, test_labels
