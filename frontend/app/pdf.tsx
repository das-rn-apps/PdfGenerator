import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/Context/AuthContext';

const Pdf = () => {
    const { pdfID } = useLocalSearchParams();
    const { auth } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>PDF Page</Text>
            <Text style={styles.authText}>Token: {auth}</Text>
            <Text style={styles.pdfIDText}>PDF ID: {pdfID}</Text>
            <Text >Here all fields will be added</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    authText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 8,
    },
    pdfIDText: {
        fontSize: 16,
        color: '#666',
    },
});

export default Pdf;
