//@ts-nocheck
import {
  Alert,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale } from 'react-native-size-matters';
import { Picker } from '@react-native-picker/picker';
import { getCities, registerUser } from '../../data';
import { setToken } from '../../state/OTPToken/tokenSlice';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { black, grey, primary, white } from '../../constants';
import CustomButton from '../../components/Button/component';
import { setLoading } from '../../state/global';
import PhoneInput from 'react-native-phone-number-input';
import { useSelector, useDispatch } from 'react-redux';

const Register = ({ navigation }) => {
  const [city, setCity] = useState('');

  const phoneInput = useRef<PhoneInput>(null);

  const dispatch = useDispatch();

  type RootState = {
    globalState: any;
  };

  const { loading } = useSelector((state: RootState) => ({
    loading: state.globalState.loading,
  }));

  const [gender, setGender] = useState('');

  type UserInfo = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    phone_number: string;
    city_id: number;
    address: string;
    address2: string;
    district: string;
  };

  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    phone_number: '',
    city_id: 0,
    address: '',
    address2: '',
    district: '',
  });

  type cityType = {
    city_id: string;
    name: string;
  }[];

  const [value, setValue] = useState<cityType>([]);

  const handleSubmit = async () => {
    dispatch(setLoading(true));
    console.log(userInfo);
    try {
      const res = await registerUser(userInfo);

      const data = res.token.split(' ')[1];
      const token = {
        token: data,
      };

      dispatch(setLoading(false));
      if (res.success) {
        dispatch(setToken(token));
        navigation.navigate('VerifyOTP');
      } else {
        const error = res.message;
        Alert.alert('Registration failed, please try again');
      }
    } catch (error) {
      dispatch(setLoading(false));
      Alert.alert('Registration failed, please try again');
      console.log(error);
    }
  };

  //@ts-ignore
  useEffect(() => {
    const fetchData = async () => {
      const res = await getCities();
      setValue(res.data);
    };
    fetchData();
  }, []);
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../../../assets/images/pent.jpg')}
          style={{ width: '100%', height: verticalScale(300) }}>
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
              fontSize: 24,
              fontFamily: 'PlusJakartaSans-Bold',
            }}>
            Register
          </Text>
          <Text style={{ color: grey, fontFamily: 'PlusJakartaSans-Regular' }}>
            Welcome. Ready to join our community?
          </Text>
        </View>

        <View style={styles.userInfo}>
          <View>
            <Text style={styles.formLabel}>First Name</Text>
            <View style={styles.content}>
              <Ionicons
                name="person-outline"
                size={20}
                color={primary}
                style={{ marginHorizontal: 10 }}
              />
              <TextInput
                style={styles.input}
                placeholder="John"
                placeholderTextColor={grey}
                value={userInfo.firstname}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, firstname: text })
                }
              />
            </View>
          </View>

          <View>
            <Text style={styles.formLabel}>Last Name</Text>
            <View style={styles.content}>
              <Ionicons
                name="person-outline"
                size={20}
                color={primary}
                style={{ marginHorizontal: 10 }}
              />
              <TextInput
                style={styles.input}
                placeholder="Doe"
                placeholderTextColor={grey}
                value={userInfo.lastname}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, lastname: text })
                }
              />
            </View>
          </View>

          <View>
            <Text style={styles.formLabel}>Gender</Text>
            <View style={styles.content}>
              <Ionicons
                name="person-outline"
                size={20}
                color={primary}
                style={{ marginLeft: 10 }}
              />
              <Picker
                selectedValue={gender}
                style={{ height: 50, width: scale(280), color: primary }}
                onValueChange={(itemValue, _itemIndex) => {
                  setGender(itemValue);
                  setUserInfo({ ...userInfo, gender: itemValue });
                }}>
                <Picker.Item label="Gender" value="None" key="0" />
                <Picker.Item label="Male" value="Male" key="1" />
                <Picker.Item label="Female" value="Female" key="2" />
              </Picker>
            </View>
          </View>

          <View>
            <Text style={styles.formLabel}>Phone Number</Text>
            <View style={styles.content}>
              {/* <Ionicons
                name="call-outline"
                size={20}
                color={primary}
                style={{ marginHorizontal: 10 }}
              />
              <TextInput
                style={styles.input}
                placeholder="0789123456"
                placeholderTextColor={grey}
                keyboardType="number-pad"
                value={userInfo.phone_number}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, phone_number: text })
                }
              /> */}
              <PhoneInput
                containerStyle={styles.inputContainer}
                textContainerStyle={styles.input2}
                textInputStyle={styles.inputStyle}
                codeTextStyle={styles.codeTextStyle}
                ref={phoneInput}
                placeholder="781234567"
                defaultValue={userInfo.phoneNumber}
                defaultCode="TZ"
                layout="first"
                onChangeFormattedText={(text) => {
                  setUserInfo({
                    ...userInfo,
                    phone_number: text.substring(1),
                  });
                }}
              />
            </View>
          </View>

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
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, email: text })
                }
              />
            </View>
          </View>

          <View>
            <Text style={styles.formLabel}>Choose City</Text>
            <View style={styles.content}>
              <Ionicons
                name="location-outline"
                size={20}
                color={primary}
                style={{ marginLeft: 10 }}
              />
              <Picker
                selectedValue={city}
                style={{ width: scale(280), color: primary }}
                onValueChange={(itemValue, itemIndex) => {
                  setCity(itemValue);
                  console.log(itemValue);
                  console.log(itemIndex);
                  setUserInfo({ ...userInfo, city_id: itemValue });
                }}>
                {value?.map((item, index) => (
                  <Picker.Item
                    label={item.name}
                    value={item.city_id}
                    key={index}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View>
            <Text style={styles.formLabel}>Address</Text>
            <View style={styles.content}>
              <Ionicons
                name="location-outline"
                size={20}
                color={primary}
                style={{ marginHorizontal: 10 }}
              />
              <TextInput
                style={styles.input}
                placeholder="Kinondoni, Kijitonyama"
                placeholderTextColor={grey}
                value={userInfo.address}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, address: text })
                }
              />
            </View>
          </View>

          <View>
            <Text style={styles.formLabel}>District</Text>
            <View style={styles.content}>
              <Ionicons
                name="location-outline"
                size={20}
                color={primary}
                style={{ marginHorizontal: 10 }}
              />
              <TextInput
                style={styles.input}
                placeholder="Ilala"
                placeholderTextColor={grey}
                value={userInfo.district}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, district: text })
                }
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
                placeholder="********"
                placeholderTextColor={grey}
                secureTextEntry={true}
                value={userInfo.password}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, password: text })
                }
              />
            </View>
          </View>

          <View>
            <Text style={styles.formLabel}>Confirm Password</Text>
            <View style={styles.content}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={primary}
                style={{ marginHorizontal: 10 }}
              />
              <TextInput
                style={styles.input}
                placeholder="********"
                placeholderTextColor={grey}
                secureTextEntry={true}
                value={userInfo.confirmPassword}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, confirmPassword: text })
                }
              />
            </View>
          </View>

          <View style={styles.btn}>
            <CustomButton
              onClick={handleSubmit}
              disabled={loading}
              text="Register"
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: verticalScale(15),
              }}>
              <Text
                style={{
                  color: grey,
                  marginTop: 10,
                  fontFamily: 'PlusJakartaSans-Regular',
                }}>
                Already have an account?{' '}
              </Text>
              <Pressable onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    color: primary,
                    marginTop: 10,
                    fontFamily: 'PlusJakartaSans-Regular',
                  }}>
                  Sign In
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    paddingHorizontal: 25,
    marginVertical: 20,
  },
  userInfo: {
    flex: 0.5,
    alignItems: 'flex-start',
    paddingHorizontal: 25,
  },
  input: {
    height: 40,
    width: scale(270),
    borderRadius: 6,
    backgroundColor: white,
    color: primary,
  },
  btn: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  chat: {
    width: '80%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  formLabel: {
    color: primary,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Medium',
    marginBottom: 4,
  },
  content: {
    width: '100%',
    height: 50,
    backgroundColor: white,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    height: verticalScale(40),
    width: '100%',
    // borderWidth: 1,
    borderRadius: 5,
    padding: 0,
  },
  inputStyle: {
    height: verticalScale(40),
    fontSize: 16,
    color: primary,
    padding: 0,
  },
  input2: {
    height: verticalScale(37),
    width: '100%',
    backgroundColor: white,
  },
  codeTextStyle: {
    height: verticalScale(40),
    textAlignVertical: 'center',
    padding: 0,
    color: primary,
  },
});
