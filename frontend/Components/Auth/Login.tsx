import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext, ThemeType } from '@/Context/ThemeContext';

interface LoginProps {
    onSubmit: (formData: { username: string; password: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onSubmit }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const { theme } = useContext(ThemeContext);

    const handleSubmit = () => {
        if (!username || !password) {
            setError('Please fill in all fields.');
            return;
        }
        setError('');
        const formData = { username, password };
        console.log("Sending from the login form", formData)
        onSubmit(formData);
    };

    const styles = createStyles(theme);

    return (
        <View style={styles.all}>
            <View>
                <Text style={styles.header}>Login</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your username"
                        placeholderTextColor={theme.textColors.placeholderText}
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        placeholderTextColor={theme.textColors.placeholderText}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                    />
                </View>
                {error ? (
                    <Text style={styles.error}>{error}</Text>
                ) : null}

            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

const createStyles = (theme: ThemeType) =>
    StyleSheet.create({
        all: {
            flex: 1,
            gap: 10,
            justifyContent: "center"
        },
        container: {
            width: '100%',
            padding: 20,
            borderRadius: 8,
            backgroundColor: theme.colors.surface,
            shadowColor: theme.colors.primary,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
        },
        header: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: "center",
            color: theme.textColors.primaryText,
        },
        formGroup: {
            marginBottom: 16,
        },
        label: {
            fontSize: 16,
            fontWeight: '600',
            color: theme.textColors.primaryText,
        },
        input: {
            height: 40,
            borderWidth: 0.5,
            borderRadius: 7,
            paddingHorizontal: 12,
            marginBottom: 8,
            borderColor: theme.borderColors.defaultBorder,
            color: theme.textColors.primaryText,
        },
        error: {
            fontSize: 14,
            marginBottom: 16,
            color: theme.colors.error,
        },
        button: {
            height: 45,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.buttonColors.primaryButtonBackground,
            marginTop: 10
        },
        buttonText: {
            color: theme.textColors.primaryText,
            fontSize: 16,
            fontWeight: 'bold',
        },
    });

export default Login;
