import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import HtmlViewer from '@/Components/HTML/HtmlViewer';
import { useLocalSearchParams } from 'expo-router';

const App = () => {
    const { pdfID } = useLocalSearchParams();

    return (
        <SafeAreaView style={styles.container}>
            <Text>{pdfID}</Text>
            <HtmlViewer />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
});

export default App;
