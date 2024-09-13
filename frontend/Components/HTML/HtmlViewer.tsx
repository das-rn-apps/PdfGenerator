import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const HTMLContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form to PDF</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            // margin: 20px;
        }
        .form-container {
            // max-width: 600px;
            margin: 0 auto;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .form-group textarea {
            resize: vertical;
            height: 100px;
        }
        .submit-button {
            display: block;
            width: 100%;
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
        }
        .submit-button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="form-container">
        <form id="dynamic-form">
            <!-- Form fields will be inserted here -->
        </form>
        <button class="submit-button" onclick="submitForm()">Submit</button>
    </div>

    <script>
        // Sample JSON array
        const jsonArray = [
            { "label": "Name", "type": "text", "name": "name", "value": "" },
            { "label": "Email", "type": "email", "name": "email", "value": "" },
            { "label": "Message", "type": "textarea", "name": "message", "value": "" }
        ];

        const form = document.getElementById('dynamic-form');

        jsonArray.forEach(field => {
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';

            const label = document.createElement('label');
            label.innerHTML = field.label;
            formGroup.appendChild(label);

            let input;
            if (field.type === 'textarea') {
                input = document.createElement('textarea');
            } else {
                input = document.createElement('input');
                input.type = field.type;
            }
            input.name = field.name;
            input.value = field.value;
            formGroup.appendChild(input);

            form.appendChild(formGroup);
        });

        function submitForm() {
            // Handle form submission here
            alert('Form submitted!');
        }
    </script>
</body>
</html>
`;

const HtmlViewer = () => {
    return (
        <View style={styles.container}>
            <WebView
                originWhitelist={['*']}
                source={{ html: HTMLContent }}
                style={styles.webview}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        padding: 10
    },
    webview: {
        flex: 1,
    },
});

export default HtmlViewer;
