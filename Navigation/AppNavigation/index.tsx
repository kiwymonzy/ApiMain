import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../src/screens/home';
import ChatScreen from '../../src/screens/chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserScreen from '../../src/screens/user';
import { useSelector } from 'react-redux';
import { grey, primary } from '../../src/constants';
import Wishlist from '../../src/screens/wishlist';
import NewsNavigation from '../NewsNavigation';
import ProfessionNavigation from '../ProfessionNavigation';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  const auth = useSelector((state: any) => state.auth);

  const category = useSelector((state: any) => state.category);
  console.warn(category.category);
  return (
    <Tab.Navigator
      //@ts-ignore
      active={primary}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeNav') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          } else if (route.name === 'User') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Mortgage') {
            iconName = focused ? 'calculator' : 'calculator-outline';
          } else if (route.name === 'Favourite') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Newsfeed') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Professionals') {
            iconName = focused ? 'construct' : 'construct-outline';
          }
          //@ts-ignore
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: grey,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboardHide: true,
      })}
      initialRouteName={
        category.category === 0
          ? 'Professionals'
          : category.category === 10
          ? 'Newsfeed'
          : 'HomeNav'
      }>
      <Tab.Screen name="HomeNav" component={HomeScreen} />
      <Tab.Screen name="Newsfeed" component={NewsNavigation} />
      {auth.has_paid && <Tab.Screen name="Favourite" component={Wishlist} />}
      {auth.has_paid && <Tab.Screen name="Chat" component={ChatScreen} />}
      <Tab.Screen name="Professionals" component={ProfessionNavigation} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigation;
