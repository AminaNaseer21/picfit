from sklearn.metrics import accuracy_score, confusion_matrix, classification_report, roc_auc_score
from sklearn.preprocessing import label_binarize
import numpy as np

def evaluate_model(true_labels, predictions, prob_predictions=None, num_classes=None):
    accuracy = accuracy_score(true_labels, predictions)
    conf_matrix = confusion_matrix(true_labels, predictions)
    class_report = classification_report(true_labels, predictions)
    
    print(f"Accuracy: {accuracy}\n")
    print(f"Confusion Matrix:\n {conf_matrix}\n")
    print(f"Classification Report:\n {class_report}\n")
    
    # Handle both binary and multi-class tasks for ROC-AUC
    if prob_predictions is not None:
        if num_classes == 2:  # Binary classification
            roc_auc = roc_auc_score(true_labels, prob_predictions[:, 1])
            print(f"ROC-AUC: {roc_auc}")
        elif num_classes is not None:  # Multi-class classification
            true_labels_binarized = label_binarize(true_labels, classes=np.arange(num_classes))
            roc_auc = roc_auc_score(true_labels_binarized, prob_predictions, multi_class='ovr')
            print(f"ROC-AUC (One-vs-Rest): {roc_auc}")
        else:
            print("For ROC-AUC, 'num_classes' must be specified for multi-class tasks.")

# Sample test data for demonstration purposes
if __name__ == '__main__':
    # Example true labels and predictions
    true_labels = np.array([0, 1, 2, 2, 1])
    predictions = np.array([0, 1, 2, 1, 0])
    
    # Simulated probabilistic predictions for 3 classes
    prob_predictions = np.array([
        [0.8, 0.1, 0.1],
        [0.1, 0.8, 0.1],
        [0.1, 0.1, 0.8],
        [0.1, 0.7, 0.2],
        [0.6, 0.3, 0.1]
    ])
    num_classes = 3  # Specify the number of classes for multi-class classification

    # Call the evaluate_model function with the sample data
    evaluate_model(true_labels, predictions, prob_predictions, num_classes)
