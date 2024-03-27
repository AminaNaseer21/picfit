from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras import layers, models

def build_model(num_classes):
    base_model = EfficientNetB0(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
    x = layers.GlobalAveragePooling2D()(base_model.output)
    outputs = layers.Dense(num_classes, activation='softmax')(x)
    model = models.Model(inputs=base_model.input, outputs=outputs)
    return model

# Define the number of classes in your dataset
num_classes = 10  # Example: 10 for CIFAR-10

# Build the model by calling the function
model = build_model(num_classes)

# Now you can print the model summary
print(model.summary())
