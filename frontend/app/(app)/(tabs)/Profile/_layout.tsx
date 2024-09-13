import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import React from 'react';

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: 'Home',
                        title: 'overview',
                        // headerShown: false
                    }}
                />
                <Drawer.Screen
                    name="[id]"
                    options={{
                        drawerLabel: 'User',
                        // headerShown: false,
                        title: 'overview',
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
