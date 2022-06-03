import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigatorStack } from './src/navigation/RootNavigatorStack';
import { CommonNavigationStack } from './src/navigation/CommonNavigationStack';
import { COLORS } from './utils/Colors';
export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <CommonNavigationStack />
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
