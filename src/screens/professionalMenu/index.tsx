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
import { primary, primaryVariant } from '../../constants';
import { saveSelectedProfessionalCategory } from '../../state/professionals/professionalSlice';
const ProfessionalMenu = ({ navigation }) => {
  const dispatch = useDispatch();

  const auth = useSelector((state: any) => state.auth);

  const handleCategory = (category: string) => {
    dispatch(saveSelectedProfessionalCategory(category));
    navigation.navigate('Professionals');
  };

  const handleMortgage = () => {
    navigation.navigate('Mortgage Calculator');
  };

  const handleHardwareSup = () => {
    navigation.navigate('Hardware Suppliers');
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
              flexShrink: 1,
            }}>
            BUILDING SERVICES
          </Text>

          <Text
            style={{
              color: 'black',
              fontFamily: 'PlusJakartaSans-Regular',
              fontWeight: '400',
              fontSize: moderateScale(14),
              marginTop: verticalScale(6),
            }}>
            Our professionals are well vetted
          </Text>
          <Text
            style={{
              color: 'black',
              fontFamily: 'PlusJakartaSans-Regular',
              fontWeight: '400',
              fontSize: moderateScale(14),
            }}>
            and trustworthy.
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            width: '100%',
            marginTop: verticalScale(20),
            alignItems: 'center',
          }}>
          <Pressable
            onPress={() => {
              handleHardwareSup();
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
              HARDWARE SUPPLIERS
            </Text>
          </Pressable>
          <Pressable
            onPress={() => handleCategory('Architect')}
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
              ARCHITECTS
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              handleCategory('Quantity Surveyor');
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
              QUANTITY SURVEYORS
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              handleCategory('Interior Designer');
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
              INTERIOR DESIGNERS
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              handleCategory('Electrician');
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
              ELECTRICIANS
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              handleCategory('Plumber');
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
              PLUMBERS
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              handleCategory('Mason');
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
              MASONS
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              handleCategory('Carpenter');
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
              CARPENTERS
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              handleCategory('pest');
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
              PEST CONTROL EXPERTS
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              handleMortgage();
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
              MORTGAGE CALCULATOR
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfessionalMenu;

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
