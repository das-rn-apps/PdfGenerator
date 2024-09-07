import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ThemeContext, ThemeType } from '@/Context/ThemeContext';

const Page = () => {
    const { id } = useLocalSearchParams();
    const { theme } = useContext(ThemeContext);
    const [backgroundColor, setBackgroundColor] = useState<string>('#FFFFFF');

    const styles = createStyles(theme, backgroundColor);

    useEffect(() => {
        const idNumber = parseInt(id, 10);
        if (!isNaN(idNumber)) {
            const colorCode = `#${((idNumber & 0xFFFFFF) << 0).toString(16).padStart(6, '0')}`;
            setBackgroundColor(colorCode);
        } else {
            setBackgroundColor('#FFFFFF');
        }
    }, [id]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>You generated {backgroundColor}</Text>
        </View>
    );
};

export default Page;

const createStyles = (theme: ThemeType, backgroundColor: string) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 16,
    },
});