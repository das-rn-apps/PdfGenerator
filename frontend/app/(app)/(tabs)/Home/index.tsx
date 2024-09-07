import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext, ThemeType } from '@/Context/ThemeContext';
import { router } from 'expo-router';

const Index = () => {
    const { theme } = useContext(ThemeContext);
    const [color, setColor] = useState<string>('');
    const [backgroundColor, setBackgroundColor] = useState<string>('#FFFFFF');
    const styles = createStyles(theme);

    useEffect(() => {
        const idNumber = parseInt(color, 10);
        if (!isNaN(idNumber)) {
            const colorCode = `#${((idNumber & 0xFFFFFF) << 0).toString(16).padStart(6, '0')}`;
            setBackgroundColor(colorCode);
        } else {
            setBackgroundColor('#FFFFFF');
        }
    }, [color]);

    return (
        <View style={styles.container}>
            <View
                style={{
                    backgroundColor: backgroundColor,
                    height: 200,
                    width: 200,
                    borderRadius: 100,
                    marginBottom: 10
                }}
            >
            </View>
            <Text>{backgroundColor}</Text>
            <View style={{ display: "flex", flexDirection: "row", gap: 10, marginHorizontal: 10, marginTop: 20 }}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter any number"
                    placeholderTextColor={theme.textColors.placeholderText}
                    value={color}
                    onChangeText={setColor}
                    keyboardType="numeric"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    onPress={() => {
                        router.push(`/Home/${color}`);
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Generate Color</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Index;

const createStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 20,
    },
    input: {
        flex: 1,
        borderWidth: 0.5,
        borderRadius: 7,
        paddingHorizontal: 12,
        borderColor: theme.borderColors.defaultBorder,
        color: theme.textColors.primaryText,
    },
    button: {
        height: 48,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.buttonColors.errorButtonBackground,
        padding: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.buttonColors.primaryButtonText,
    },
});
