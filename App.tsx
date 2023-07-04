/* eslint-disable import/extensions */
import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

// import * as Sentry from "@sentry/react-native";
import LoginScreen from './src/screens/login';
import RegisterScreen from './src/screens/register';
import HomeNavigation from './Navigation/HomeNavigation';
import store from './src/state/store';
import { signIn } from './src/state/user/userSlice';
import VerifyOtp from './src/screens/verifyOTP';
import Payment from './src/screens/payment';
import PasswordReq from './src/screens/passwordReq';
import PasswordChange from './src/screens/passwordChange';
import Menu from './src/screens/menu';
import { setToken } from './src/state/OTPToken/tokenSlice';
import AppNavigation from './Navigation/AppNavigation';

// Sentry.init({
//   dsn: "https://de4bacb748af412490136fe2adcc542e@o1272644.ingest.sentry.io/6466498",
//   // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
//   // We recommend adjusting this value in production.
//   tracesSampleRate: 1.0,
// });
// Sentry.nativeCrash();
const Stack = createNativeStackNavigator();

const ChildApp = () => {
  const dispatch = useDispatch();

  let auth = useSelector((state: { auth: any }) => state.auth);

  const loadStorageData = async () => {
    try {
      //Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        //If there are data, it's converted to an Object and the state is updated.
        return JSON.parse(authDataSerialized);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadToken = async () => {
    try {
      //Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem('@Token');
      if (authDataSerialized) {
        //If there are data, it's converted to an Object and the state is updated.
        return JSON.parse(authDataSerialized);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // get data from storage
    loadStorageData().then((data) => {
      if (data) {
        dispatch(signIn(data));
      }
    });

    loadToken().then((token) => {
      if (token) {
        dispatch(setToken(token));
      }
    });
  }, [dispatch]);

  return (
    <NavigationContainer>
      {auth.is_active ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
          initialRouteName="Menu">
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Home" component={HomeNavigation} />
          <Stack.Screen name="ProfessionalServices" component={AppNavigation} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
          initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="VerifyOTP" component={VerifyOtp} />
          <Stack.Screen name="ForgotPassword" component={PasswordReq} />
          <Stack.Screen name="PasswordChange" component={PasswordChange} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export { ChildApp };

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <ChildApp />
    </Provider>
  );
};

export default App;
