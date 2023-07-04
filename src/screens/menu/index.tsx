//@ts-nocheck
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import UserAvatar from 'react-native-user-avatar';
import { useSelector, useDispatch } from 'react-redux';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { setCategory } from '../../state/categoryToken/categorySlice';
import { primary, primaryVariant } from '../../constants';

const Menu = ({ navigation }) => {
  const dispatch = useDispatch();

  const auth = useSelector((state: any) => state.auth);

  const handleCategory = (category: number) => {
    dispatch(setCategory({ category }));
    navigation.navigate('Home');
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        paddingBottom: 10,
      }}>
      <View style={styles.container}>
        <View style={styles.usertitle}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <UserAvatar
              size={30}
              style={{ borderRadius: 5, height: 30, marginRight: scale(10) }}
              imageStyle={{ borderRadius: 5 }}
              name={auth.firstname}
              // src="https://res.cloudinary.com/deex1bwvl/image/upload/v1647738498/Bluescope/alex-suprun-ZHvM3XIOHoE-unsplash_ptlaxf.jpg"
            />
            <Text
              style={{ color: 'black', fontFamily: 'PlusJakartaSans-Regular' }}>
              Hi, {auth.firstname}
            </Text>
          </View>
          <Text
            style={{
              color: primary,
              fontSize: moderateScale(20),
              fontFamily: 'PlusJakartaSans-Regular',
              margin: 15,
              fontWeight: '700',
            }}>
            House Tanzania
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: primary,
              fontFamily: 'PlusJakartaSans-Regular',
              fontSize: moderateScale(16),
              marginTop: verticalScale(6),
              fontWeight: '700',
            }}>
            OUR PROMISE
          </Text>
          <Text
            style={{
              color: 'black',
              fontFamily: 'PlusJakartaSans-Regular',
              fontWeight: '700',
              fontSize: moderateScale(16),
              marginTop: verticalScale(6),
            }}>
            The perfect choice for
          </Text>
          <Text
            style={{
              color: 'black',
              fontFamily: 'PlusJakartaSans-Regular',
              fontWeight: '700',
              fontSize: moderateScale(16),
            }}>
            your future
          </Text>
          <Text
            style={{
              color: 'black',
              fontFamily: 'PlusJakartaSans-Regular',
              fontWeight: '400',
              fontSize: moderateScale(14),
              marginTop: verticalScale(6),
            }}>
            Our properties are the masterpice for
          </Text>
          <Text
            style={{
              color: 'black',
              fontFamily: 'PlusJakartaSans-Regular',
              fontWeight: '400',
              fontSize: moderateScale(14),
            }}>
            every client with lasting value.
          </Text>
        </View>

        <Image
          style={styles.image}
          source={require('../../../assets/images/triad.jpg')}
        />

        <View
          style={{
            justifyContent: 'space-between',
            width: '100%',
            marginTop: verticalScale(20),
            alignItems: 'center',
          }}>
          <Pressable
            onPress={() => handleCategory(1)}
            style={({ pressed }) => [
              { backgroundColor: pressed ? primaryVariant : primary },
              styles.btn,
            ]}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'PlusJakartaSans-Regular',
                fontSize: moderateScale(14),
                fontWeight: '600',
              }}>
              RESIDENTIAL
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              handleCategory(2);
            }}
            style={({ pressed }) => [
              { backgroundColor: pressed ? primaryVariant : primary },
              styles.btn,
            ]}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'PlusJakartaSans-Regular',
                fontSize: moderateScale(14),
                fontWeight: '600',
              }}>
              COMMERCIAL
            </Text>
          </Pressable>
          <Pressable
            onPress={() => handleCategory(4)}
            style={({ pressed }) => [
              { backgroundColor: pressed ? primaryVariant : primary },
              styles.btn,
            ]}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'PlusJakartaSans-Regular',
                fontSize: moderateScale(14),
                fontWeight: '600',
              }}>
              LAND
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              dispatch(setCategory({ category: 0 }));
              navigation.navigate('ProfessionalServices');
            }}
            style={({ pressed }) => [
              { backgroundColor: pressed ? primaryVariant : primary },
              styles.btn,
            ]}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'PlusJakartaSans-Regular',
                fontSize: moderateScale(14),
                fontWeight: '600',
              }}>
              BUILDING SERVICES
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              dispatch(setCategory({ category: 10 }));
              navigation.navigate('ProfessionalServices');
            }}
            style={({ pressed }) => [
              { backgroundColor: pressed ? primaryVariant : primary },
              styles.btn,
            ]}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'PlusJakartaSans-Regular',
                fontSize: moderateScale(14),
                fontWeight: '600',
              }}>
              NEWSFEED
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 10,
  },
  usertitle: {
    marginTop: 20,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: scale(350),
    height: verticalScale(270),
    marginTop: verticalScale(20),
  },
  btn: {
    width: '80%',
    height: 'auto',
    paddingVertical: 10,
    borderRadius: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
    margin: moderateScale(5),
  },
});
