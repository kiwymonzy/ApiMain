//@ts-nocheck
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ImageBackground,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { loginUser } from '../../data';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../state/user/userSlice';
import { tokenDecoder } from '../../TokenDecoder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale, verticalScale } from 'react-native-size-matters';
import { setToken } from '../../state/OTPToken/tokenSlice';
import { setLoading } from '../../state/global';
import { grey, lightGrey, primary, white } from '../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../components/Button/component';

const Login = ({ navigation }) => {
  type userType = {
    email: string;
    password: string;
  };

  type RootState = {
    globalState: any;
  };

  const dispatch = useDispatch();

  const { loading } = useSelector((state: RootState) => ({
    loading: state.globalState.loading,
  }));

  const [userInfo, setUserInfo] = useState<userType>({
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    dispatch(setLoading(true));

    try {
      const res = await loginUser(userInfo);

      const token = res.success ? res.accessToken.split(' ')[1] : null;

      const datum = {
        token: token,
      };

      const data: any = res.success ? tokenDecoder(token) : null;

      const user = {
        id: data?.id,
        firstname: data?.firstname,
        lastname: data?.lastname,
        email: data?.email,
        has_paid: data?.has_paid,
        is_active: data?.is_active,
        is_verified: data?.is_verified,
      };

      await AsyncStorage.setItem('@AuthData', JSON.stringify(user));

      await AsyncStorage.setItem('@Token', JSON.stringify(datum));

      dispatch(setLoading(false));
      //@ts-ignore
      if (res.success && res.user.is_verified) {
        dispatch(setToken(datum));
        dispatch(signIn(user));
        // navigation.navigate('home')
      } else if (res.user?.is_verified === false) {
        dispatch(setToken(datum));
        dispatch(signIn(user));
        Alert.alert('Login Successful', 'Please verify your account');
      } else Alert.alert('Check your credentials');
    } catch (err: any) {
      console.log(err);
      Alert.alert('Login Failed', 'Please check your credentials');
      dispatch(setLoading(false));
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.scrollContainer}>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../../../assets/images/nyu.jpg')}
          style={{ width: '100%', height: 250 }}>
          <Text
            style={{
              color: primary,
              fontSize: 20,
              marginLeft: 20,
              fontFamily: 'PlusJakartaSans-Bold',
            }}>
            House Tanzania
          </Text>
        </ImageBackground>
        <View style={styles.header}>
          <Text
            style={{
              color: primary,
              fontSize: 25,
              fontFamily: 'PlusJakartaSans-Bold',
              fontWeight: 'bold',
            }}>
            Welcome
          </Text>
          <Text
            style={{
              color: grey,
              fontWeight: '300',
              fontFamily: 'PlusJakartaSans-Regular',
            }}>
            Please enter your Email and Password
          </Text>
        </View>

        <View style={styles.userInfo}>
          <View>
            <Text style={styles.formLabel}>Email Address</Text>
            <View style={styles.content}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={primary}
                style={{ marginHorizontal: 10 }}
              />
              <TextInput
                style={styles.input}
                placeholder="johndoe@gmail.com"
                placeholderTextColor={grey}
                value={userInfo.email}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(email) => setUserInfo({ ...userInfo, email })}
              />
            </View>
          </View>

          <View>
            <Text style={styles.formLabel}>Password</Text>
            <View style={styles.content}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={primary}
                style={{ marginHorizontal: 10 }}
              />
              <TextInput
                style={styles.input}
                placeholder="password"
                placeholderTextColor={grey}
                secureTextEntry={true}
                value={userInfo.password}
                onChangeText={(password) =>
                  setUserInfo({ ...userInfo, password })
                }
              />
            </View>
          </View>
          <View style={styles.btn}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
                marginBottom: 10,
              }}>
              <View style={{ justifyContent: 'flex-start', width: scale(300) }}>
                <Pressable
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text
                    style={{
                      color: primary,
                      fontFamily: 'PlusJakartaSans-Regular',
                    }}>
                    Forgot Password?
                  </Text>
                </Pressable>
              </View>
            </View>
            <CustomButton
              onClick={handleSubmit}
              disabled={loading}
              text="Log in"
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  color: grey,
                  marginTop: 10,
                  fontFamily: 'PlusJakartaSans-Regular',
                }}>
                Don't have an account?
              </Text>
              <Pressable onPress={() => navigation.navigate('Register')}>
                <Text
                  style={{
                    color: primary,
                    marginTop: 10,
                    marginLeft: scale(10),
                    fontFamily: 'PlusJakartaSans-Regular',
                  }}>
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  scrollContainer: {
    backgroundColor: lightGrey,
    flex: 1,
  },
  formLabel: {
    color: primary,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Medium',
    marginBottom: 4,
  },
  header: {
    width: '100%',
    paddingHorizontal: 25,
    marginVertical: 20,
  },
  userInfo: {
    flex: 0.5,
    alignItems: 'center',
    paddingHorizontal: 25,
    // marginLeft: 20,
    // width:'100%',
    // alignItems:'center'
  },
  input: {
    height: 40,
    width: scale(270),
    // margin: 12,
    // borderWidth: 1,
    // padding: 10,
    borderRadius: 6,
    // borderColor:"grey",
    backgroundColor: white,
    color: primary,
  },
  btn: {
    width: '100%',
    alignItems: 'center',
  },
  chat: {
    width: scale(300),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  content: {
    width: '100%',
    backgroundColor: white,
    borderRadius: 5,
    marginBottom: 10,
    height: verticalScale(44),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
