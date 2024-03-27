# model_evaluation.py
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report, roc_auc_score

def evaluate_model(true_labels, predictions, prob_predictions=None):
    accuracy = accuracy_score(true_labels, predictions)
    conf_matrix = confusion_matrix(true_labels, predictions)
    class_report = classification_report(true_labels, predictions)
    
    print(f"Accuracy: {accuracy}\n")
    print(f"Confusion Matrix:\n {conf_matrix}\n")
    print(f"Classification Report:\n {class_report}\n")
    
    # ROC-AUC is only relevant for binary classification tasks
    if prob_predictions is not None:
        roc_auc = roc_auc_score(true_labels, prob_predictions[:, 1])
        print(f"ROC-AUC: {roc_auc}")
