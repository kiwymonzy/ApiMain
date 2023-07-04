//@ts-nocheck
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import React from 'react';
import { verticalScale, moderateScale, scale } from 'react-native-size-matters';
import { black, primaryVariant, white, primary } from '../../constants';
import { tSh } from '../../utility';

type ItemType = {
  id: string | number;
  img: string;
  title: string;
  address: string;
  price: string;
  status: string;
  expiry_date: string;
  appointment_date: string;
};

const width = Dimensions.get('window').width;

const ReservedItem = ({
  id,
  img,
  title,
  address,
  price,
  status,
  expiry_date,
  appointment_date,
}: ItemType) => {
  return (
    <View
      key={id}
      style={[
        {
          flex: 1,
          width: width - 30,
          marginVertical: verticalScale(10),
          height: 'auto',
          backgroundColor: white,
          paddingBottom: verticalScale(5),
        },
        styles.boxShadow,
      ]}>
      <ImageBackground
        style={styles.detailImg}
        source={{
          uri: img,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: 10,
          }}>
          <View
            style={{
              width: 'auto',
              height: 'auto',
              backgroundColor: '#EFF1FFA6',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              marginLeft: scale(10),
              padding: scale(5),
            }}>
            <Text
              style={{
                color: black,
                fontWeight: 'bold',
                fontFamily: 'PlusJakartaSans-Regular',
                fontSize: moderateScale(14),
                marginBottom: verticalScale(3),
              }}>
              {status}
            </Text>
          </View>
          <View
            style={{
              width: 'auto',
              height: 'auto',
              backgroundColor: '#EFF1FFA6',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              marginRight: scale(10),
              padding: scale(5),
            }}>
            <Text
              style={{
                color: black,
                fontWeight: 'bold',
                fontFamily: 'PlusJakartaSans-Regular',
                fontSize: moderateScale(14),
                marginBottom: verticalScale(3),
              }}>
              Reserved
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View
        style={{
          marginHorizontal: scale(4),
        }}>
        <Text
          style={{
            color: black,
            fontFamily: 'PlusJakartaSans-Regular',
            fontSize: moderateScale(16),
            marginBottom: verticalScale(3),
            fontWeight: '600',
            flexShrink: 1,
          }}>
          {title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: black,
              fontFamily: 'PlusJakartaSans-Regular',
              fontSize: moderateScale(14),
              marginBottom: verticalScale(3),
              fontWeight: 'bold',
              color: primary,
            }}>
            Appointment Date:
          </Text>
          <Text
            style={{
              color: black,
              fontFamily: 'PlusJakartaSans-Regular',
              fontSize: moderateScale(14),
              marginBottom: verticalScale(3),
            }}>
            {appointment_date}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: black,
              fontFamily: 'PlusJakartaSans-Regular',
              fontSize: moderateScale(14),
              marginBottom: verticalScale(3),
              fontWeight: 'bold',
              color: primary,
            }}>
            Reserved untill:
          </Text>
          <Text
            style={{
              color: black,
              fontFamily: 'PlusJakartaSans-Regular',
              fontSize: moderateScale(14),
              marginBottom: verticalScale(3),
            }}>
            {expiry_date}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ReservedItem;

const styles = StyleSheet.create({
  detailImg: {
    borderRadius: 100,
    height: verticalScale(200),
    width: '100%',
  },
});

const generateBoxShadowStyle = (
  xOffset: number,
  yOffset: number,
  shadowColorIos: string,
  shadowOpacity: number,
  shadowRadius: number,
  elevation: number,
  shadowColorAndroid: string,
) => {
  if (Platform.OS === 'ios')
    //@ts-ignore
    styles.boxShadow = {
      shadowColor: shadowColorIos,
      shadowOffset: { width: xOffset, height: yOffset },
      shadowOpacity,
      shadowRadius,
    };
  else if (Platform.OS === 'android')
    //@ts-ignore
    styles.boxShadow = {
      elevation,
      shadowColor: shadowColorAndroid,
    };
};

generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 4, '#171717');
