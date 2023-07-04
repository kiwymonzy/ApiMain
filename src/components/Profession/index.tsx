/* eslint-disable import/extensions */
//@ts-nocheck
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { saveSelectedProfessional } from '../../state/professionals/professionalSlice';
import { verticalScale, moderateScale, scale } from 'react-native-size-matters';
import { black, primaryVariant, white, primary } from '../../constants';
import { tSh } from '../../utility';

type ItemType = {
  id: string | number;
  image: string;
  activites: string;
  address: string;
  name: string;
  profession: string;
  phoneNumber: string;
  description: string;
  navigator: () => void;
};

const width = Dimensions.get('window').width;

const Profession = ({
  id,
  image,
  name,
  address,
  profession,
  activites,
  description,
  phoneNumber,
  navigator,
}: ItemType) => {
  const dispatch = useDispatch();
  return (
    <View
      onTouchStart={navigator}
      key={id}
      style={[
        {
          flex: 1,
          flexDirection: 'row',
          width: width - 30,
          marginVertical: verticalScale(10),
          height: 'auto',
          backgroundColor: white,
          // paddingBottom: verticalScale(5),
        },
        styles.boxShadow,
      ]}>
      <Image
        style={styles.detailImg}
        source={{
          uri: image,
        }}></Image>
      <View
        style={{
          marginHorizontal: scale(15),
          marginVertical: verticalScale(10),
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
          {name}
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
            Profession:
          </Text>
          <Text
            style={{
              color: black,
              fontFamily: 'PlusJakartaSans-Regular',
              fontSize: moderateScale(14),
              marginBottom: verticalScale(3),
            }}>
            {profession}
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
            Address:
          </Text>
          <Text
            style={{
              color: black,
              fontFamily: 'PlusJakartaSans-Regular',
              fontSize: moderateScale(14),
              marginBottom: verticalScale(3),
            }}>
            {address}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Profession;

const styles = StyleSheet.create({
  detailImg: {
    // borderRadius: 100,
    height: '100%',
    width: '25%',
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
