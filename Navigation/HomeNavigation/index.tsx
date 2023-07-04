import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from '../../src/screens/detail';
import Filter from '../../src/components/Filter';
import AppNavigation from '../AppNavigation';
import MapScreen from '../../src/screens/map';
import NotPaid from '../../src/screens/notPaid';
import Home from '../../src/screens/home';

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={AppNavigation} />
      <Stack.Screen name="Detail" component={DetailsScreen} />
      <Stack.Screen name="Filter" component={Filter} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="NotPaid" component={NotPaid} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
