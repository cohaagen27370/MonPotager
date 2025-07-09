import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown :false}}>
      <Tabs.Screen name="index" options={{ title : 'En Cours',
        tabBarIcon: () => (<TabBarIcon name='home' />) }} />
      <Tabs.Screen name="stocks" options={{ title : 'Mes stocks',
        tabBarIcon: () => (<TabBarIcon name='bag' />) }} />
      <Tabs.Screen name="catalog" options={{ title : 'Catalogue',
        tabBarIcon: () => (<TabBarIcon name='book' />) }} />
    </Tabs>
  );
}