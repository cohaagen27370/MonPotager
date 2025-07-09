import { PaperProvider } from "react-native-paper";
import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {

  return (
    <PaperProvider>
      <Stack>  
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="product" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
