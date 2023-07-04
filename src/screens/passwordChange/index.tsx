import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { UpdatePass } from '../../data';

const PasswordChange = ({ navigation, route }) => {
  const { token, email } = route.params;

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSubmit = async (token, password, confirmPassword, email) => {
    if ((password = confirmPassword)) {
      const response = await UpdatePass(
        token,
        password,
        confirmPassword,
        email,
      );
      console.log(response, email, token);
      if (response.success) {
        Alert.alert(response.message);
        navigation.navigate('Login');
      }
    } else {
      Alert.alert("Passwords don't match");
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          { color: '#3546CB', fontSize: moderateScale(18) },
        ]}>
        {' '}
        Change Password
      </Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        placeholderTextColor="#3546CB"
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Confirm Password"
        placeholderTextColor="#3546CB"
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Pressable
        onPress={() => handleSubmit(token, password, confirmPassword, email)}
        style={styles.btn}>
        <Text style={styles.text}>Confirm</Text>
      </Pressable>
    </View>
  );
};

export default PasswordChange;

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
    padding: moderateScale(10),
    margin: moderateScale(10),
    fontFamily: 'PlusJakartaSans-Regular',
  },
  btn: {
    height: verticalScale(40),
    backgroundColor: '#3546CB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(6),
    borderRadius: moderateScale(4),
    width: '80%',
    marginTop: verticalScale(20),
  },
  text: {
    color: 'white',
    fontFamily: 'PlusJakartaSans-Regular',
  },
});
