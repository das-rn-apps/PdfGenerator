import { Stack } from 'expo-router';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        title: 'Dashboard',
                    }}
                />
                <Stack.Screen
                    name="[id]"
                    options={{
                        title: 'Generate',
                    }}
                />
            </Stack>
        </GestureHandlerRootView>
    );
}
