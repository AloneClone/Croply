import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { AppProvider } from '../src/context/AppContext';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { Colors } from '../src/constants/Theme';

function RootLayoutNav() {
  const { isLoggedIn, profile, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const currentRoute = segments[0];

    if (!isLoggedIn) {
      if (currentRoute !== 'login') {
        router.replace('/login');
      }
    } else if (!profile?.onboardingCompleted) {
      if (currentRoute !== 'onboarding') {
        router.replace('/onboarding');
      }
    } else {
      if (currentRoute === 'login' || currentRoute === 'onboarding') {
        router.replace('/(tabs)');
      }
    }
  }, [isLoggedIn, profile?.onboardingCompleted, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="onboarding/index" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppProvider>
        <SafeAreaProvider>
          <StatusBar style="dark" />
          <RootLayoutNav />
        </SafeAreaProvider>
      </AppProvider>
    </AuthProvider>
  );
}
