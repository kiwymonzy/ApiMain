//@ts-nocheck
import {
  Dimensions,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { verticalScale, moderateScale, scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { black, grey, lightBlue, primary, white } from '../../constants';
import CustomButton from '../Button/component';
import { Property } from '../../state/properties/types';
import { NavigationAction } from '@react-navigation/native';
import { saveSelectedProperty } from '../../state/properties/propertySlice';
import { tSh } from '../../utility';

const { width, height } = Dimensions.get('window');

interface IState {
  property: Property;
  navigation: NavigationAction;
}

//Estate property card component that are displayed to the home screen
const EstateCard = ({ property, navigation }: IState) => {
  //auth state containing user info
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const handleNavigation = () => {
    dispatch(saveSelectedProperty(property));
    navigation.navigate('Detail');
  };

  return (
    <View style={[styles.itemCard, styles.boxShadow]}>
      <ImageBackground
        style={styles.itemImage}
        source={{
          uri: property.images[0],
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
              backgroundColor: lightBlue,
              width: 'auto',
              height: 'auto',
              margin: moderateScale(10),
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center',
              padding: scale(5),
            }}>
            <Text
              style={{
                color: primary,
                fontWeight: 'bold',
                fontFamily: 'PlusJakartaSans-Regular',
              }}>
              {property.property_status}
            </Text>
          </View>

          <Pressable
            style={{
              backgroundColor: lightBlue,
              width: 'auto',
              height: 'auto',
              margin: moderateScale(10),
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center',
              padding: scale(5),
            }}
            onPress={() => {
              if (auth.has_paid) {
                dispatch(saveSelectedProperty(property));
                navigation.navigate('Map');
              }

              if (!auth.has_paid) navigation.navigate('NotPaid');
            }}>
            <Text
              style={{
                color: primary,
                fontWeight: 'bold',
                fontFamily: 'PlusJakartaSans-Regular',
              }}>
              MAP
            </Text>
          </Pressable>
        </View>
      </ImageBackground>

      <View style={auth.has_paid ? styles.detail : styles.detail2}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: verticalScale(6),
            width: '100%',
          }}>
          <Text
            style={{
              color: black,
              fontSize: 18,
              fontFamily: 'PlusJakartaSans-Regular',
              flexShrink: 1,
            }}>
            {property.property_name}
          </Text>
          <Text
            style={{
              color: grey,
              fontSize: 16,
              fontFamily: 'PlusJakartaSans-Regular',
            }}>
            {tSh(property.price)}
          </Text>
        </View>

        {auth.has_paid && (
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <View
              style={{
                marginRight: 15,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon name="room" size={18} color={primary} />
              <Text
                style={{
                  color: grey,
                  fontSize: 14,
                  fontFamily: 'PlusJakartaSans-Regular',
                }}>
                {property?.address.city}
              </Text>
            </View>
          </View>
        )}
      </View>
      <View style={{ paddingHorizontal: 15 }}>
        <CustomButton onClick={handleNavigation} text="More Details" />
      </View>
    </View>
  );
};

export default EstateCard;

const styles = StyleSheet.create({
  itemCard: {
    borderRadius: 4,
    backgroundColor: white,
    marginBottom: 10,
    width: width - 30,
    paddingBottom: 10,
  },
  itemImage: {
    width: '100%',
    marginBottom: 5,
    borderRadius: moderateScale(4),
    height: verticalScale(230),
  },
  detail: {
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  detail2: {
    paddingHorizontal: 15,
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
    styles.boxShadow = {
      shadowColor: shadowColorIos,
      shadowOffset: { width: xOffset, height: yOffset },
      shadowOpacity,
      shadowRadius,
    };
  else if (Platform.OS === 'android')
    styles.boxShadow = {
      elevation,
      shadowColor: shadowColorAndroid,
    };
};

generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 4, '#171717');
