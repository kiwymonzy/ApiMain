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
import { saveFavouriteProperties } from '../../state/properties/propertySlice';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  Extrapolate,
  interpolate,
} from 'react-native-reanimated';
import { saveSelectedProperty } from '../../state/properties/propertySlice';

const { width } = Dimensions.get('window');

const Detail = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { favouriteProperties } = useSelector((state: DefaultState) => ({
    favouriteProperties: state.properties.favouriteProperties,
  }));

  const token = useSelector((state: any) => state.token);
  const { property } = useSelector((state: DefaultState) => ({
    property: state.properties.selectedProperty,
  }));
  const [isModalVisible, setModalVisible] = useState(false);
  const [reservationInfo, setReservationInfo] = useState({});
  const [like, setLike] = useState(true);

  const liked = useSharedValue(0);

  const outlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
        },
      ],
    };
  });

  const fillStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: liked.value }],
      opacity: liked.value,
    };
  });

  const handleSubscribe = async () => {
    navigation.navigate('NotPaid');
  };

  const loadStorageData = async () => {
    try {
      //Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem('@favourIte');
      if (authDataSerialized)
        //If there are data, it's converted to an Object and the state is updated.
        return JSON.parse(authDataSerialized);
    } catch (error) {
      console.log(error);
    }
  };

  //Ongoing
  const handleFavourite = async () => {
    liked.value = withSpring(liked.value ? 0 : 1);
    const data = await loadStorageData();
    if (data) {
      data.unshift(property);
      dispatch(saveFavouriteProperties(data));
      await AsyncStorage.setItem('@favourIte', JSON.stringify(data));
      await AsyncStorage.setItem('@like', JSON.stringify(true));
      return console.log('1', favouriteProperties);
    }
    await AsyncStorage.setItem('@favourIte', JSON.stringify([property]));
    return console.log('2', property);
  };

  const handleRemove = async (id) => {
    await AsyncStorage.setItem('@like', JSON.stringify(false));
    await AsyncStorage.removeItem('@favourIte');
    const indexOfObject = properties.findIndex((object) => {
      return object.property_id === id;
    });

    console.log(properties[indexOfObject]);

    const properties1 = [...properties];

    properties1.splice(indexOfObject, 1);

    dispatch(saveFavouriteProperties(properties1));

    await AsyncStorage.setItem('@favourIte', JSON.stringify(properties1));
    console.log('removed');
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  //Date
  const [date, setDate] = React.useState<Object>(new Date());
  const [mode, setMode] = React.useState<string>('date');
  const [show, setShow] = React.useState<boolean>(false);

  const showDate = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const auth = useSelector((state: any) => state.auth);

  const handleNavigation = () =>
    auth.has_paid
      ? navigation.navigate('Chat')
      : navigation.navigate('NotPaid');

  const makeCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') phoneNumber = `tel:+${255769004001}`;
    else phoneNumber = `telprompt:+${255769004001}`;

    Linking.openURL(phoneNumber);
  };

  const handleReserve = async () => {
    const data = await postReservation(token.token, property.property_id, date);
    if (data.success) {
      Alert.alert(data.message);
      closeModal();
    } else {
      Alert.alert(data.message);
      closeModal();
    }
  };

  const loadLikeData = async () => {
    try {
      //Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem('@like');
      if (authDataSerialized)
        //If there are data, it's converted to an Object and the state is updated.
        return JSON.parse(authDataSerialized);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadLike = async () => {
      const data = await loadLikeData();
      if (data) {
        setLike(data);
      }
    };
    loadLike();
  }, []);

  const ReservationForm = () => {
    return (
      <View style={styles.contentContainer}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'PlusJakartaSans-Regular',
            fontWeight: '700',
            fontSize: moderateScale(20),
            marginBottom: verticalScale(15),
          }}>
          When would you like to tour it?
        </Text>

        <View
          style={{
            width: '100%',
          }}>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
          <Text
            style={{
              color: black,
              fontFamily: 'PlusJakartaSans-Regular',
              fontSize: 15,
              marginBottom: verticalScale(5),
            }}>
            Date
          </Text>
          <Pressable
            onPress={showDatepicker}
            style={[styles.input, { justifyContent: 'center' }]}>
            <Text
              style={{
                color: 'black',
                textAlign: 'left',
                padding: moderateScale(5),
              }}>
              {date.toDateString()}
            </Text>
          </Pressable>
          <Text
            style={{
              color: black,
              fontFamily: 'PlusJakartaSans-Regular',
              fontSize: 15,
              marginBottom: verticalScale(5),
            }}>
            Time
          </Text>
          <Pressable
            onPress={showTimepicker}
            style={[styles.input, { justifyContent: 'center' }]}>
            <Text
              style={{
                color: 'black',
                textAlign: 'left',
                padding: moderateScale(5),
              }}>
              {date.toLocaleTimeString('en-US')}
            </Text>
          </Pressable>
        </View>
        <CustomButton onClick={handleReserve} text="Confirm schedule" />
      </View>
    );
  };

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
            {/* <Pressable onPress={handleFavourite}>
              <Animated.View
                style={[StyleSheet.absoluteFillObject, outlineStyle]}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#EFF1FFA6',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    marginRight: 5,
                  }}>
                  <Ionicons
                    name={'heart-outline'}
                    size={30}
                    style={{}}
                    color={'#3546CB'}
                  />
                </View>
              </Animated.View>
              <Animated.View style={fillStyle}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#EFF1FFA6',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    marginRight: 5,
                  }}>
                  <Ionicons
                    name={like ? 'heart' : 'heart-outline'}
                    size={30}
                    style={{}}
                    color={like ? 'red' : '#3546CB'}
                  />
                </View>
              </Animated.View>
            </Pressable> */}
          </View>
          {auth.has_paid ? (
            <ScrollView horizontal={true} pagingEnabled={true}>
              {property.images &&
                property.images.map((image) => {
                  return (
                    <Image
                      style={styles.detailImg}
                      source={{
                        uri: image,
                      }}
                    />
                  );
                })}
            </ScrollView>
          ) : (
            <View
              style={{
                flexDirection: 'row',
              }}>
              {property.images &&
                property.images.map((image) => {
                  return (
                    <Image
                      style={styles.detailImg}
                      source={{
                        uri: image,
                      }}
                    />
                  );
                })}
            </View>
          )}
          {auth.has_paid && (
            <View style={{ width: '100%', paddingHorizontal: 15 }}>
              <Text
                style={{
                  color: black,
                  width: 'auto',
                  fontFamily: 'PlusJakartaSans-Regular',
                  flexShrink: 1,
                }}>
                {property.images.length} images available
              </Text>
            </View>
          )}
        </View>

        <View
          style={{
            paddingHorizontal: 15,
            marginTop: 10,
            width: '100%',
          }}>
          <View style={styles.tag}>
            <View style={styles.tagger}>
              <Text style={styles.tags}>{property.property_status}</Text>
            </View>

            <Pressable
              style={styles.tagger}
              onPress={() => {
                if (auth.has_paid) {
                  dispatch(saveSelectedProperty(property));
                  navigation.navigate('Map');
                }

                if (!auth.has_paid) navigation.navigate('NotPaid');
              }}>
              <Text style={styles.tags}>MAP</Text>
            </Pressable>
          </View>

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
                {property.property_name}
              </Text>
              <Text
                style={{
                  color: grey,
                  fontSize: 18,
                  fontFamily: 'PlusJakartaSans-Regular',
                }}>
                {tSh(property.price)}
              </Text>
            </View>

            {auth.has_paid ? (
              <View
                style={{
                  width: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                    height: 'auto',
                  }}>
                  <View
                    style={{
                      marginRight: 15,
                      flexDirection: 'row',
                    }}>
                    <Ionicons name="location" size={18} color={primary} />
                    <Text
                      style={{
                        color: grey,
                        fontSize: 14,
                        fontFamily: 'PlusJakartaSans-Regular',
                      }}>
                      {`${property.address.address}, ${property.address.city}`}
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
                      color: grey,
                      fontFamily: 'PlusJakartaSans-Regular',
                    }}>
                    {property.property_description}
                  </Text>
                </View>
                <View style={styles.desc}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: black,
                      fontFamily: 'PlusJakartaSans-Medium',
                    }}>
                    Address
                  </Text>
                  <View style={styles.row}>
                    <Text style={styles.detailKey}>Address</Text>
                    <Text style={styles.subText}>
                      {property.address.address}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.detailKey}>City</Text>
                    <Text style={styles.subText}>{property.address.city}</Text>
                  </View>
                </View>
                <View style={styles.desc}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: black,
                      fontFamily: 'PlusJakartaSans-Medium',
                    }}>
                    Details
                  </Text>
                  <View style={styles.row}>
                    <Text style={styles.detailKey}>Property type</Text>
                    <Text style={styles.subText}>
                      {property.category.category_name}
                    </Text>
                  </View>
                  {/* <View style={styles.row}>
                    <Text style={styles.detailKey}>Sub Category</Text>
                    <Text style={styles.subText}>Bungalow</Text>
                  </View> */}
                  {property.property_features.bedrooms && (
                    <View style={styles.row}>
                      <Text style={styles.detailKey}>Bedrooms</Text>
                      <Text style={styles.subText}>
                        {property.property_features?.bedrooms}
                      </Text>
                    </View>
                  )}
                  {property.property_features?.bathrooms && (
                    <View style={styles.row}>
                      <Text style={styles.detailKey}>Bathrooms</Text>
                      <Text style={styles.subText}>
                        {property.property_features?.bathrooms}
                      </Text>
                    </View>
                  )}
                  {property.property_features?.living_rooms && (
                    <View style={styles.row}>
                      <Text style={styles.detailKey}>Livingrooms</Text>
                      <Text style={styles.subText}>
                        {property.property_features?.living_rooms}
                      </Text>
                    </View>
                  )}
                  {property.property_features.kitchen && (
                    <View style={styles.row}>
                      <Text style={styles.detailKey}>Kitchens</Text>
                      <Text style={styles.subText}>
                        {property.property_features?.kitchen}
                      </Text>
                    </View>
                  )}
                  {property.property_features.plot_area && (
                    <View style={styles.row}>
                      <Text style={styles.detailKey}>Plot Area</Text>
                      <Text style={styles.subText}>
                        {property.property_features?.plot_area} Sq Mt
                      </Text>
                    </View>
                  )}
                  <View style={styles.row}>
                    <Text style={styles.detailKey}>Price</Text>
                    <Text style={styles.subText}>{tSh(property.price)}</Text>
                  </View>
                </View>

                <View style={styles.btn}>
                  <CustomButton
                    width="70%"
                    onClick={() => setModalVisible(true)}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          color: white,
                          marginLeft: 8,
                          fontWeight: 'bold',
                          fontFamily: 'PlusJakartaSans-Regular',
                        }}>
                        Schedule visit
                      </Text>
                    </View>
                  </CustomButton>
                  <Pressable
                    onPress={() => handleNavigation()}
                    style={({ pressed }) => [
                      { backgroundColor: pressed ? primaryVariant : primary },
                      styles.call,
                    ]}>
                    <Ionicons
                      name="chatbox-outline"
                      size={20}
                      color="#ffffff"
                    />
                  </Pressable>

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
            ) : (
              <View
                style={{
                  height: verticalScale(200),
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: black,
                    fontSize: 18,
                    fontFamily: 'PlusJakartaSans-Regular',
                  }}>
                  Subscribe to see more
                </Text>
                <Pressable
                  onPress={() => handleSubscribe()}
                  style={{
                    backgroundColor: primary,
                    width: '90%',
                    height: 40,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      color: white,
                      fontFamily: 'PlusJakartaSans-Regular',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    Subscribe
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>

        <View>
          <Modal
            isVisible={isModalVisible}
            propagateSwipe
            style={styles.modalWrapper}>
            <View style={styles.modalHeader}>
              <MaterialCommunityIcons
                name="window-close"
                size={28}
                style={styles.modalCloseIcon}
                onPress={closeModal}
              />
            </View>
            {ReservationForm()}
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
};

export default Detail;

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
    marginBottom: 20,
    marginTop: 25,
  },
  chat: {
    width: '80%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  call: {
    width: scale(40),
    height: 'auto',
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
    flexDirection: 'row',
    width: '100%',
  },
  sheet: {
    backgroundColor: lightGrey,
  },
});
