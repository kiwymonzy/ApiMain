/* eslint-disable */
// @ts-nocheck
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  Platform,
  Linking,
  Dimensions,
  ScrollView,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { payment, postReservation } from '../../data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  black,
  grey,
  lightGrey,
  primary,
  primaryVariant,
  white,
  lightBlue,
} from '../../constants';
import CustomButton from '../../components/Button/component';
import Modal from 'react-native-modal';
import { signOut } from '../../state/user/userSlice';
import { DefaultState } from '../../state/types';
import { tSh } from '../../utility';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  Extrapolate,
  interpolate,
} from 'react-native-reanimated';
import { saveSelectedSupplier } from '../../state/suppliers/suppliersSlice';

const { width } = Dimensions.get('window');

const HardwareSupplier = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const token = useSelector((state: any) => state.token);
  const selectedSupplier = useSelector(
    (state: any) => state.supplier.selectedSupplier,
  );

  const auth = useSelector((state: any) => state.auth);

  const makeCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android')
      phoneNumber = `tel:+${selectedSupplier.phone_number}`;
    else phoneNumber = `telprompt:+${selectedSupplier.phone_number}`;

    Linking.openURL(phoneNumber);
  };

  useEffect(() => {}, []);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              position: 'absolute',
              top: 0,
              zIndex: 1,
              width: '100%',
              marginTop: 10,
            }}>
            <Pressable onPress={() => navigation.goBack()}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#EFF1FFA6',
                  marginLeft: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Ionicons
                  name="chevron-back"
                  size={30}
                  color="#3546CB"
                  style={{}}
                />
              </View>
            </Pressable>
          </View>
          <Image
            style={styles.detailImg}
            source={{
              uri: selectedSupplier.image,
            }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 15,
            marginTop: 10,
            width: '100%',
          }}>
          <View style={styles.detail}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: verticalScale(6),
                width: '100%',
                height: 'auto',
              }}>
              <Text
                style={{
                  color: black,
                  fontSize: 18,
                  fontFamily: 'PlusJakartaSans-Regular',
                  flexShrink: 1,
                }}>
                {selectedSupplier.name}
              </Text>
              <View style={styles.btn}>
                <Pressable
                  onPress={() => makeCall()}
                  style={({ pressed }) => [
                    { backgroundColor: pressed ? '#47e847' : '#46CD6A' },
                    styles.call,
                  ]}>
                  <Ionicons name="call-outline" size={20} color="#ffffff" />
                </Pressable>
              </View>
            </View>
            <View
              style={{
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  marginBottom: 10,
                  height: 'auto',
                }}>
                <View
                  style={{
                    marginRight: 15,
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      color: primary,
                      fontWeight: '700',
                      fontSize: 16,
                      fontFamily: 'PlusJakartaSans-Regular',
                      flexShrink: 1,
                    }}>
                    Owner:
                  </Text>
                  <Text
                    style={{
                      color: black,
                      fontSize: 16,
                      fontFamily: 'PlusJakartaSans-Regular',
                      paddingLeft: 5,
                      flexShrink: 1,
                    }}>
                    {selectedSupplier.owner}
                  </Text>
                </View>
                <View
                  style={{
                    marginRight: 15,
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      color: primary,
                      fontWeight: '700',
                      fontSize: 16,
                      fontFamily: 'PlusJakartaSans-Regular',
                      flexShrink: 1,
                    }}>
                    Address:
                  </Text>
                  <Text
                    style={{
                      color: black,
                      fontSize: 16,
                      fontFamily: 'PlusJakartaSans-Regular',
                      paddingLeft: 5,
                      flexShrink: 1,
                    }}>
                    {selectedSupplier.location}
                  </Text>
                </View>
              </View>

              <View style={styles.desc}>
                <Text
                  style={{
                    fontSize: 18,
                    color: black,
                    fontFamily: 'PlusJakartaSans-Medium',
                  }}>
                  Description
                </Text>
                <Text
                  style={{
                    color: black,
                    fontFamily: 'PlusJakartaSans-Regular',
                    flexShrink: 1,
                  }}>
                  {selectedSupplier.description}
                </Text>
              </View>
              <View style={styles.desc}>
                <Text
                  style={{
                    fontSize: 18,
                    color: black,
                    fontFamily: 'PlusJakartaSans-Medium',
                  }}>
                  Available Items
                </Text>
                <View style={styles.row}>
                  {selectedSupplier?.items?.map((item, index) => (
                    <Text style={styles.detailKey}>{item}</Text>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HardwareSupplier;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: { backgroundColor: white, flex: 1 },
  img: {
    width: '100%',
  },
  detailImg: {
    width,
    height: 250,
  },
  detail: {
    width: '100%',
  },
  desc: {
    marginBottom: 10,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chat: {
    width: '80%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  call: {
    width: 'auto',
    height: 'auto',
    padding: moderateScale(10),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tag: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
  },
  tags: {
    color: primary,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  tagger: {
    backgroundColor: '#EFF1FF',
    borderRadius: 5,
    marginRight: 30,
    width: 'auto',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(5),
  },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: white,
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 20,
    flex: 1,
  },
  input: {
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: verticalScale(15),
    borderColor: 'grey',
    backgroundColor: white,
    color: primary,
    height: 'auto',
    padding: verticalScale(4),
  },
  modalWrapper: {
    margin: 0,
  },
  modalHeader: {
    width: 50,
    height: 'auto',
    paddingRight: 10,
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    margin: 0,
    marginBottom: 10,
  },
  detailKey: {
    color: black,
    width: '30%',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  modalCloseIcon: { textAlign: 'right' },
  subText: {
    color: grey,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  row: {
    width: '100%',
  },
  sheet: {
    backgroundColor: lightGrey,
  },
});
