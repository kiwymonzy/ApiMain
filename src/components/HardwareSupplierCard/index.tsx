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
  name: string;
  address: string;
  owner: string;
  navigator: () => void;
};

const width = Dimensions.get('window').width;

const HardwareSupplierCard = ({
  id,
  img,
  name,
  address,
  owner,
  navigator,
}: ItemType) => {
  return (
    <View
      onTouchStart={navigator}
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
        }}></ImageBackground>
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
            Owner:
          </Text>
          <Text
            style={{
              color: black,
              fontFamily: 'PlusJakartaSans-Regular',
              fontSize: moderateScale(14),
              marginBottom: verticalScale(3),
            }}>
            {owner}
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

export default HardwareSupplierCard;

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
