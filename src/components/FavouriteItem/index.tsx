//@ts-nocheck
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  Dimensions,
} from 'react-native';
import React from 'react';
import { verticalScale, moderateScale, scale } from 'react-native-size-matters';
import { black, white } from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

type ItemType = {
  id: string | number;
  img: string;
  title: string;
  desc: string;
  price: string;
  handleRemove: any;
};

const width = Dimensions.get('window').width;

const FavouriteItem = ({
  id,
  img,
  title,
  desc,
  price,
  handleRemove,
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
            justifyContent: 'flex-end',
            width: '100%',
            marginTop: 10,
          }}>
          <Pressable onPress={handleRemove}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#EFF1FFA6',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                marginRight: scale(10),
              }}>
              <Ionicons name="heart" size={30} style={{}} color="red" />
            </View>
          </Pressable>
        </View>
      </ImageBackground>
      <Text
        style={{
          color: black,
          fontFamily: 'PlusJakartaSans-Regular',
          fontSize: moderateScale(18),
          marginBottom: verticalScale(3),
          fontWeight: '600',
        }}>
        {title}
      </Text>
      <Text
        style={{
          color: black,
          fontFamily: 'PlusJakartaSans-Regular',
          fontSize: moderateScale(15),
          marginBottom: verticalScale(3),
        }}>
        {desc}
      </Text>
      <Text
        style={{
          color: black,
          fontFamily: 'PlusJakartaSans-Regular',
          fontSize: moderateScale(15),
          marginBottom: verticalScale(5),
        }}>
        Price: {price}
      </Text>
    </View>
  );
};

export default FavouriteItem;

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
