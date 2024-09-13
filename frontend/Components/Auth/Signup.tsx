import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeContext, ThemeType } from '../../Context/ThemeContext';
import { Picker } from '@react-native-picker/picker';
import { userTypes } from '@/Constants/User';

interface FormData {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    type: string;
}

interface SignupProps {
    onSubmit: (formData: FormData) => void;
}

const Signup: React.FC<SignupProps> = ({ onSubmit }) => {
    const [firstName, setFirstName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [type, setType] = useState<string>('student');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [missingFields, setMissingFields] = useState<string[]>([]);

    const { theme } = useContext(ThemeContext);
    const styles = createStyles(theme);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || new Date();
        if (event.type === 'set') {
            setDateOfBirth(currentDate);
            removeMissingField('dateOfBirth');
        }
        setShowPicker(false);
    };

    const removeMissingField = (fieldName: string) => {
        if (missingFields.includes(fieldName)) {
            setMissingFields(prev => prev.filter(field => field !== fieldName));
        }
    };

    const handleFieldChange = (setter: (value: string) => void, value: string, fieldName: string) => {
        setter(value);
        if (value) {
            removeMissingField(fieldName);
        }
    };

    const handleSubmit = () => {
        const missing: string[] = [];

        if (!username) missing.push('username');
        if (!firstName) missing.push('firstName');
        if (!lastName) missing.push('lastName');
        if (!email) missing.push('email');
        if (!password) missing.push('password');
        if (!dateOfBirth) missing.push('dateOfBirth');
        if (!type) missing.push('type');

        if (missing.length > 0) {
            setMissingFields(missing);
            return;
        }

        const formData: FormData = {
            username,
            firstName,
            lastName,
            email,
            password,
            dateOfBirth,
            type,
        };
        onSubmit(formData);
    };

    const isFieldMissing = (fieldName: string) => missingFields.includes(fieldName);

    return (
        <View style={styles.all}>
            <View>
                <Text style={styles.header}>Registration</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.label}>
                    User type {isFieldMissing('type') && <Text style={styles.required}>*</Text>}
                </Text>
                <Picker
                    selectedValue={type}
                    onValueChange={(itemValue) => {
                        setType(itemValue);
                        removeMissingField('type');
                    }}
                    style={styles.input}
                >
                    {userTypes?.map(option => (
                        <Picker.Item key={option.value} label={option.label} value={option.value} />
                    ))}
                </Picker>

                <Text style={styles.label}>
                    Username {isFieldMissing('username') && <Text style={styles.required}>*</Text>}
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your username"
                    placeholderTextColor={theme.textColors.placeholderText}
                    value={username}
                    onChangeText={(text) => handleFieldChange(setUsername, text, 'username')}
                />

                <Text style={styles.label}>
                    First Name {isFieldMissing('firstName') && <Text style={styles.required}>*</Text>}
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your first name"
                    placeholderTextColor={theme.textColors.placeholderText}
                    value={firstName}
                    onChangeText={(text) => handleFieldChange(setFirstName, text, 'firstName')}
                />

                <Text style={styles.label}>
                    Last Name {isFieldMissing('lastName') && <Text style={styles.required}>*</Text>}
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your last name"
                    placeholderTextColor={theme.textColors.placeholderText}
                    value={lastName}
                    onChangeText={(text) => handleFieldChange(setLastName, text, 'lastName')}
                />

                <Text style={styles.label}>
                    Email address {isFieldMissing('email') && <Text style={styles.required}>*</Text>}
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor={theme.textColors.placeholderText}
                    value={email}
                    onChangeText={(text) => handleFieldChange(setEmail, text, 'email')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>
                    Password {isFieldMissing('password') && <Text style={styles.required}>*</Text>}
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor={theme.textColors.placeholderText}
                    value={password}
                    onChangeText={(text) => handleFieldChange(setPassword, text, 'password')}
                    secureTextEntry
                    autoCapitalize="none"
                />

                <Text style={styles.label}>
                    Date of Birth {isFieldMissing('dateOfBirth') && <Text style={styles.required}>*</Text>}
                </Text>
                <View style={styles.dateContainer}>
                    <TextInput
                        style={styles.dateInput}
                        placeholder="Enter date"
                        value={dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : ''}
                        editable={false}
                        placeholderTextColor={theme.textColors.placeholderText}
                    />
                    <Pressable onPress={() => setShowPicker(true)}>
                        <FontAwesome name="calendar" size={38} color={theme.colors.primary} />
                    </Pressable>
                </View>

                {showPicker && (
                    <DateTimePicker
                        value={dateOfBirth || new Date()}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}

            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Register</Text>
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
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
        },
        header: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
            color: theme.textColors.primaryText,
        },
        label: {
            fontSize: 12,
            fontWeight: '600',
            color: theme.textColors.primaryText,
            marginBottom: 4,
        },
        required: {
            color: 'red',
            marginLeft: 4,
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
        dateContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
        },
        dateInput: {
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderRadius: 7,
            paddingHorizontal: 8,
            borderColor: theme.borderColors.defaultBorder,
            color: theme.textColors.primaryText,
            marginRight: 10,
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

export default Signup;
