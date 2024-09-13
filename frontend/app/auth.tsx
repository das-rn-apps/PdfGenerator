import React, { useState, useContext } from 'react';
import { View, Text, Alert, StyleSheet, SafeAreaView } from 'react-native';
import { useAuth } from '../Context/AuthContext';
import { ThemeContext, ThemeType } from '../Context/ThemeContext';
import Login from '@/Components/Auth/Login';
import Signup from '@/Components/Auth/Signup';
// import { router } from 'expo-router';
// import { BASE_URL } from '@env';
import Loader from '@/Components/General/Loader';
import axios from 'axios';
import { BASE_URL } from '@env';
import { router } from 'expo-router';

type FormData = {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
};

const Auth: React.FC = () => {

    const [isSignup, setIsSignup] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { login, auth } = useAuth();
    const { theme } = useContext(ThemeContext);

    const handleLogin = async (formData: { username: string; password: string }) => {

        setIsLoading(true);
        try {
            const res = await axios.post(`${BASE_URL}/user/login/`, formData);
            await login(res.data.token);
            router.replace('/Dashboard')
            // Alert.alert('Success', 'Login successful!');
            setIsSignup(false);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while login.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = async (formData: FormData) => {
        setIsLoading(true);
        try {
            const res = await axios.post(`${BASE_URL}/user/register/`, formData);
            Alert.alert('Success', 'Registration successful!');
            setIsSignup(false);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while registering.');
        } finally {
            setIsLoading(false);
        }
    };

    const styles = createStyles(theme);

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <Loader text={isSignup ? "Registration in progress..." : "Authenticating..."} />
            ) : (
                <View style={styles.innerContainer}>
                    {isSignup ? (
                        <Signup onSubmit={handleSignup} />
                    ) : (
                        <Login onSubmit={handleLogin} />
                    )}
                    <View style={styles.switchContainer}>
                        <Text style={styles.switchText}>
                            {isSignup ? 'Already have an account? ' : 'Don’t have an account? '}
                            <Text
                                style={styles.switchLink}
                                onPress={() => setIsSignup(!isSignup)}
                            >
                                {isSignup ? 'Login' : 'Register'}
                            </Text>
                        </Text>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

const createStyles = (theme: ThemeType) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        innerContainer: {
            padding: 20,
            justifyContent: 'center',
            flexGrow: 1,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 20,
            color: theme.textColors.primaryText,
        },
        switchContainer: {
            alignItems: 'center',
            marginTop: 20,
        },
        switchText: {
            color: theme.textColors.primaryText,
        },
        switchLink: {
            fontWeight: 'bold',
            color: theme.textColors.linkText,
        },
    });

export default Auth;
