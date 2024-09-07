import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Tabs } from 'expo-router'
import { ThemeContext } from '@/Context/ThemeContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';


const _layout = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.textColors.secondaryText,
                tabBarStyle: {
                    minHeight: 60,
                    padding: 5,
                    backgroundColor: theme.colors.background,
                    paddingBottom: 10
                },
            }}
        >
            <Tabs.Screen name='Home' options={{
                headerShown: false,
                title: "Home",
                tabBarIcon: ({ focused }) =>
                    focused ? (
                        <MaterialIcons name="home" size={30} color={theme.colors.primary} />
                    ) : (
                        <MaterialIcons name="home" size={24} color={theme.textColors.secondaryText} />
                    ),
            }} />
            <Tabs.Screen name='Result' options={{
                headerShown: false,
                title: "Result",
                tabBarIcon: ({ focused }) =>
                    focused ? (
                        <Ionicons name="newspaper" size={30} color={theme.colors.primary} />
                    ) : (
                        <Ionicons name="newspaper" size={24} color={theme.textColors.secondaryText} />
                    ),
            }} />
            <Tabs.Screen name='Profile' options={{
                headerShown: false,
                title: "Profile",
                tabBarIcon: ({ focused }) =>
                    focused ? (
                        <MaterialIcons name="people" size={30} color={theme.colors.primary} />
                    ) : (
                        <MaterialIcons name="people" size={24} color={theme.textColors.secondaryText} />
                    ),
            }} />
        </Tabs>
    )
}

export default _layout

const styles = StyleSheet.create({})