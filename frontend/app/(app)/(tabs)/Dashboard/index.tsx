import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { ThemeContext, ThemeType } from '@/Context/ThemeContext';
import { Users } from '@/Constants/Users';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const Index = () => {
    const { theme } = useContext(ThemeContext);
    const [users, setUsers] = useState(Users);
    const styles = createStyles(theme);

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.item}>
            <Ionicons name="person-circle" size={40} color={theme.colors.background} style={styles.icon} />
            <View style={styles.itemTextContainer}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemSubText}>{item.email}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.new} onPress={() => { router.push('/Dashboard/6') }}>
                <MaterialIcons name="add" size={40} color={theme.buttonColors.successButtonText} />
            </TouchableOpacity>
            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

export default Index;

const createStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: theme.colors.background,
    },
    new: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        zIndex: 1,
        backgroundColor: theme.buttonColors.secondaryButtonBackground,
        borderRadius: 30,
        padding: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
    },
    listContainer: {
        paddingBottom: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginVertical: 8,
        backgroundColor: theme.buttonColors.primaryButtonBackground,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
    },
    icon: {
        marginRight: 16,
    },
    itemTextContainer: {
        flex: 1,
    },
    itemText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.textColors.primaryText,
    },
    itemSubText: {
        fontSize: 14,
        color: theme.textColors.disabledText,
    }
});
