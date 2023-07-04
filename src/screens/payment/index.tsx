//@ts-nocheck
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Linking,
  Dimensions,
} from 'react-native';
import React from 'react';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { payment } from '../../data';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../state/user/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import Icon from '../../components/checkedIcon'
const height = Dimensions.get('window').height;

const Payment = ({ navigation }) => {
  const dispatch = useDispatch();

  const token = useSelector((state: any) => state.token);

  const handlePay = async (token) => {
    const res = await payment(token);
    console.log(res);
    try {
      if (res.success) {
        await Linking.openURL(res.payment_url);
        await AsyncStorage.removeItem('@AuthData');
        dispatch(signOut());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text
          style={{
            fontFamily: 'PlusJakartaSans-Regular',
            color: 'black',
            fontSize: moderateScale(35),
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: verticalScale(20),
          }}>
          Plans that help you grow
        </Text>
        <Text
          style={{
            fontFamily: 'PlusJakartaSans-Regular',
            color: 'grey',
            fontSize: moderateScale(18),
            textAlign: 'center',
            marginBottom: verticalScale(30),
          }}>
          We set out with single mission, to connect you with properties easily.
          We succeeded
        </Text>
        <View>
          <Text
            style={{
              fontFamily: 'PlusJakartaSans-Regular',
              color: 'black',
              fontSize: moderateScale(18),
              paddingBottom: verticalScale(10),
            }}>
            Features included are:
          </Text>
          <Text
            style={{
              fontFamily: 'PlusJakartaSans-Regular',
              color: 'black',
              fontSize: moderateScale(16),
              paddingBottom: verticalScale(5),
            }}>
            <Icon name="check" size={18} color="green" /> View Property details
          </Text>
          <Text
            style={{
              fontFamily: 'PlusJakartaSans-Regular',
              color: 'black',
              fontSize: moderateScale(16),
              paddingBottom: verticalScale(5),
            }}>
            <Icon name="check" size={18} color="green" /> Chat Experience with
            Experts
          </Text>
          <Text
            style={{
              fontFamily: 'PlusJakartaSans-Regular',
              color: 'black',
              fontSize: moderateScale(16),
              paddingBottom: verticalScale(5),
            }}>
            <Icon name="check" size={18} color="green" /> Get Map features
          </Text>
        </View>
        <View style={styles.mini}>
          <Text
            style={{
              fontFamily: 'PlusJakartaSans-Regular',
              color: 'black',
              fontSize: moderateScale(18),
            }}>
            Starting at only
          </Text>
          <Text
            style={{
              fontFamily: 'PlusJakartaSans-Regular',
              color: 'black',
              fontSize: moderateScale(40),
              fontWeight: '700',
            }}>
            1,000 TZS
          </Text>
          <Text
            style={{
              fontFamily: 'PlusJakartaSans-Regular',
              color: 'black',
              fontSize: moderateScale(18),
              textAlign: 'right',
            }}>
            per week.
          </Text>
          <View style={styles.holder}>
            <Pressable
              style={({ pressed }) => [
                { backgroundColor: pressed ? '#6574e6' : '#3546CB' },
                styles.btn,
              ]}
              onPress={() => handlePay(token.token)}>
              <Text
                style={{
                  fontFamily: 'PlusJakartaSans-Regular',
                  color: 'white',
                  fontSize: moderateScale(16),
                }}>
                Start now
              </Text>
            </Pressable>

            <Pressable
              style={styles.btn2}
              onPress={() => {
                navigation.navigate('Menu');
              }}>
              <Text
                style={{
                  fontFamily: 'PlusJakartaSans-Regular',
                  color: '#3546CB',
                  fontSize: moderateScale(16),
                }}>
                or Skip for now
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    // height: height,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(34),
  },
  scrollView: { backgroundColor: 'white' },
  btn: {
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: verticalScale(40),
  },
  item: {
    height: verticalScale(20),
    color: 'black',
  },
  list: {
    height: verticalScale(50),
  },
  btn2: {
    width: '80%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: verticalScale(40),
  },
  mini: {
    backgroundColor: '#E3E2E2',
    width: '100%',
    paddingHorizontal: scale(20),
    marginTop: verticalScale(25),
    borderRadius: moderateScale(5),
    height: verticalScale(230),
    paddingTop: verticalScale(10),
  },
  holder: {
    paddingTop: verticalScale(20),
    width: '100%',
    alignItems: 'center',
  },
});
