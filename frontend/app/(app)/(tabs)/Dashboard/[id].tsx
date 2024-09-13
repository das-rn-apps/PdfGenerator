import React, { useContext, useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemeContext, ThemeType } from '@/Context/ThemeContext';
import { router } from 'expo-router';

type DataType = 'text' | 'number' | 'boolean' | 'email' | 'phone' | 'custom';
type KeyOption = 'Name' | 'Email' | 'Phone' | 'Address' | 'Custom';

interface InputItem {
    key: KeyOption | '';
    value: string;
    isCustom: boolean;
    dataType: DataType;
    error?: string;
}


const DynamicInputBox = () => {
    const { theme } = useContext(ThemeContext);
    const [inputList, setInputList] = useState<InputItem[]>([{ key: '', value: '', isCustom: false, dataType: 'text' }]);
    const [pdfID, setpdfID] = useState('Deepak Das pdf')

    const keyOptions: Record<KeyOption, DataType> = {
        'Custom': 'custom',
        'Name': 'text',
        'Email': 'email',
        'Phone': 'phone',
        'Address': 'text',
    };

    const validateInput = (item: InputItem): string => {
        if (item.dataType === 'email' && !/\S+@\S+\.\S+/.test(item.value)) {
            return 'Invalid email format';
        }
        if (item.dataType === 'phone' && !/^\d{10}$/.test(item.value)) {
            return 'Phone number must be 10 digits';
        }
        return '';
    };

    const handleInputChange = (index: number, field: keyof InputItem, value: string | boolean | DataType | Date) => {
        const newInputList = [...inputList];
        const item = newInputList[index];

        switch (field) {
            case 'key':
                item.key = value as KeyOption | '';
                break;
            case 'value':
                item.value = value as string;
                break;
            case 'isCustom':
                item.isCustom = value as boolean;
                break;
            case 'dataType':
                item.dataType = value as DataType;
                break;
        }

        item.error = validateInput(item);
        setInputList(newInputList);
    };

    const handleSubmit = () => {
        //save the inputList first in db with user _id and get the _id and send it in pdfID 
        router.push({ pathname: '/pdf', params: { pdfID } });
    };

    const addInputBox = () => {
        setInputList([...inputList, { key: '', value: '', isCustom: false, dataType: 'text' }]);
    };

    const styles = createStyles(theme);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                {inputList.map((input, index) => (
                    <View key={index} style={styles.inputRow}>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={input.isCustom ? "Custom" : input.key}
                                style={styles.picker}
                                onValueChange={(itemValue) => {
                                    if (itemValue === 'Custom') {
                                        handleInputChange(index, 'isCustom', true);
                                        handleInputChange(index, 'key', '' as KeyOption);
                                    } else {
                                        handleInputChange(index, 'isCustom', false);
                                        handleInputChange(index, 'key', itemValue as KeyOption);
                                        handleInputChange(index, 'dataType', keyOptions[itemValue as KeyOption]);
                                    }
                                }}
                            >
                                <Picker.Item label="Select Key" value="" />
                                {Object.keys(keyOptions).map((option) => (
                                    <Picker.Item key={option} label={option} value={option} />
                                ))}
                            </Picker>
                        </View>

                        {input.isCustom && (
                            <TextInput
                                style={[styles.customKeyInput, input.error ? styles.errorInput : null]}
                                placeholder="Enter Custom Key"
                                value={input.key}
                                onChangeText={(text) => handleInputChange(index, 'key', text as KeyOption)}
                            />
                        )}

                        {(input.dataType === 'email' || input.dataType === 'phone' || input.dataType === 'text' || input.dataType === 'custom') && (
                            <TextInput
                                style={[styles.input, input.error ? styles.errorInput : null]}
                                placeholder={input.dataType === 'email' ? 'Enter Email' :
                                    input.dataType === 'phone' ? 'Enter Phone Number' :
                                        'Enter Value'}
                                value={input.value}
                                onChangeText={(text) => handleInputChange(index, 'value', text)}
                                keyboardType={input.dataType === 'email' ? 'email-address' :
                                    input.dataType === 'phone' ? 'phone-pad' : 'default'}
                            />
                        )}
                    </View>
                ))}

                <TouchableOpacity style={styles.addButton} onPress={addInputBox}>
                    <Text style={styles.buttonText}>Add More</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>

        </SafeAreaView>
    );
};

const createStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    pickerContainer: {
        flex: 1,
        marginRight: 10,
    },
    picker: {
        height: 50,
        borderWidth: 1,
        borderColor: theme.borderColors.defaultBorder,
        backgroundColor: theme.colors.surface,
    },
    customKeyInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: theme.borderColors.defaultBorder,
        borderRadius: 8,
        backgroundColor: theme.colors.surface,
        padding: 10,
        marginRight: 5,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: theme.borderColors.defaultBorder,
        borderRadius: 8,
        backgroundColor: theme.colors.surface,
        padding: 10,
    },
    dateButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: theme.borderColors.defaultBorder,
        borderRadius: 8,
        backgroundColor: theme.colors.surface,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },
    dateButtonText: {
        color: theme.buttonColors.primaryButtonText,
        fontSize: 16,
    },
    addButton: {
        marginTop: 20,
        backgroundColor: theme.buttonColors.primaryButtonBackground,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButton: {
        marginTop: 10,
        backgroundColor: theme.buttonColors.successButtonBackground,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: theme.buttonColors.primaryButtonText,
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorInput: {
        borderColor: theme.colors.error,
        borderWidth: 1.5,
    },
});

export default DynamicInputBox;
