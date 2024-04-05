# train.py

from data_preprocessing import load_and_preprocess_data
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from model import build_model
from model_evaluation import evaluate_model

# Load and preprocess data
train_images, train_labels, test_images, test_labels = load_and_preprocess_data()

# Build the model
model = build_model(num_classes=10)  # Assuming 10 classes

# Data Augmentation configuration
datagen = ImageDataGenerator(
    rotation_range=20,      # Random rotations
    width_shift_range=0.2,  # Random horizontal shifts
    height_shift_range=0.2, # Random vertical shifts
    horizontal_flip=True,   # Random horizontal flips
    zoom_range=0.2,         # Random zooming
    shear_range=0.2         # Random shearing
)

# Apply the augmentation to the training data
augmented_train_data = datagen.flow(train_images, train_labels, batch_size=32)



# Compile the model
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Train the model
history = model.fit(train_images, train_labels, epochs=10, validation_split=0.2)

# Evaluate the model on test data
test_loss, test_accuracy = model.evaluate(test_images, test_labels)
print(f'Test accuracy: {test_accuracy}')

# Generate predictions
predictions = model.predict(test_images)
prob_predictions = None  # You need to define this if you want to calculate ROC-AUC

# Evaluate the model using the evaluation function
evaluate_model(test_labels, predictions, prob_predictions)
model.save('my_model.h5')