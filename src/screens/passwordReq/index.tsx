import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { ChangePassReq, VerifyPassOTP } from '../../data';

const PasswordReq = ({ navigation }) => {
  const [otp, setOtp] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [disable, setDisable] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  const handleSubmit = async (email) => {
    const response = await ChangePassReq(email);
    if (response.success) {
      setDisable(true);
      setTimeout(() => {
        setDisable(false);
      }, 10000);
    }
    console.log(response);
  };

  const handleOTP = async (pin_code, email) => {
    const response = await VerifyPassOTP(pin_code, email);
    if (response.success) {
      setToken(response.data.session.split(' ')[1]);
      navigation.navigate('PasswordChange', {
        token: response.data.session.split(' ')[1],
        email: email,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.email}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#3546CB"
          onChangeText={(text) => setEmail(text)}
        />
        <Pressable
          onPress={() => handleSubmit(email)}
          disabled={disable}
          style={disable ? styles.off : styles.btn1}>
          <Text style={styles.text}>Send OTP</Text>
        </Pressable>
      </View>
      <View style={styles.otp}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'PlusJakartaSans-Regular',
            fontSize: 18,
          }}>
          Verify OTP
        </Text>
        <OTPInputView
          style={styles.inner}
          pinCount={6}
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => setOtp(code)}
        />
        <Pressable onPress={() => handleOTP(otp, email)} style={styles.btn2}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'PlusJakartaSans-Regular',
              fontSize: 18,
            }}>
            Submit
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PasswordReq;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    height: 40,
    width: scale(270),
    borderRadius: 6,
    backgroundColor: '#EFF1FF',
    color: '#3546CB',
  },
  btn1: {
    backgroundColor: '#3546CB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(6),
    borderBottomRightRadius: moderateScale(4),
    borderTopRightRadius: moderateScale(4),
  },
  off: {
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(6),
    borderBottomRightRadius: moderateScale(4),
    borderTopRightRadius: moderateScale(4),
  },
  btn2: {
    backgroundColor: '#3546CB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(6),
    borderRadius: moderateScale(4),
    width: '80%',
  },
  email: {
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontSize: moderateScale(12),
    fontFamily: 'PlusJakartaSans-Regular',
  },
  underlineStyleBase: {
    width: scale(40),
    height: verticalScale(40),
    borderWidth: 0,
    borderBottomWidth: 2,
    color: 'black',
  },

  underlineStyleHighLighted: {
    borderColor: '#3546CB',
    color: 'black',
  },
  otp: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(50),
    width: '90%',
  },
  inner: {
    width: '95%',
    height: verticalScale(200),
    color: 'black',
  },
});
