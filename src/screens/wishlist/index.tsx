import React from 'react';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// import Favourite from '../favourite';
import Reserved from '../reserved';
// import { primary, white } from '../../constants';
// import { scale, moderateScale } from 'react-native-size-matters';

const Stack = createStackNavigator();

// const Tab = createMaterialTopTabNavigator();

const Wishlist = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name="Reservations" component={Reserved} />
    </Stack.Navigator>
  );
};

// const Tabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarLabelStyle: { fontSize: moderateScale(13) },
//         tabBarItemStyle: { width: scale(100) },
//         tabBarStyle: { backgroundColor: white },
//         tabBarIndicatorStyle: { backgroundColor: primary },
//       }}>
//       {/* <Tab.Screen name="Favourite" component={Favourite} /> */}
//       <Tab.Screen name="Reserved" component={Reserved} />
//     </Tab.Navigator>
//   );
// };

export default Wishlist;
