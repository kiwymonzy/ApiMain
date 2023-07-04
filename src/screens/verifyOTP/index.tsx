//@ts-nocheck
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { scale, verticalScale } from 'react-native-size-matters';
import { verifyOTP } from '../../data';
import { useSelector } from 'react-redux';

const VerifyOtp = ({ navigation }) => {
  const token = useSelector((state: any) => state.token);

  const [otp, setOtp] = useState('');

  const submitOTP = async (otp: any) => {
    const res = await verifyOTP(token.token, otp);
    // Alert.alert(res.message)
    // console.log(otp, token, res)
    if (res.success) {
      Alert.alert(res.message);
      navigation.navigate('Login');
    } else {
      // Alert.alert(res.message)
    }
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: 'black',
          fontFamily: 'PlusJakartaSans-Regular',
          fontSize: 18,
        }}>
        Verify OTP
      </Text>
      <OTPInputView
        style={{ width: '95%', height: 200, color: 'black' }}
        pinCount={6}
        autoFocusOnLoad={false}
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={(code) => setOtp(code)}
      />
      <Pressable
        style={({ pressed }) => [
          { backgroundColor: pressed ? '#6574e6' : '#3546CB' },
          {
            backgroundColor: '#3546CB',
            width: '90%',
            height: 40,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            display: 'none',
          },
        ]}
        onPress={submitOTP(otp)}>
        <Text
          style={{
            color: '#fff',
            fontFamily: 'PlusJakartaSans-Regular',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Send OTP
        </Text>
      </Pressable>
      {/* <Text style={{ color: '#3546CB' }}>Resend</Text> */}
    </View>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  underlineStyleBase: {
    width: scale(40),
    height: verticalScale(40),
    borderWidth: 0,
    borderBottomWidth: 1,
    color: 'black',
    borderColor: '#3546CB',
  },

  underlineStyleHighLighted: {
    borderColor: '#3546CB',
    color: 'black',
  },
});
