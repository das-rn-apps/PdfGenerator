import * as React from 'react';
import { Slot } from 'expo-router';
import { RefreshProvider } from '@/Context/RefreshContext';
import { AuthProvider } from '@/Context/AuthContext';
import { ThemeProvider } from '@/Context/ThemeContext';
// import { RootSiblingParent } from 'react-native-root-siblings';


export default function Root() {
    return (
        <RefreshProvider>
            <AuthProvider>
                <ThemeProvider>
                    <Slot />
                </ThemeProvider>
            </AuthProvider>
        </RefreshProvider>
    );
}
