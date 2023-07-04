//@ts-nocheck
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  FlatList,
  Platform,
  SafeAreaView,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import EstateCard from '../../components/EstateCard';
import Pill from '../../components/Pill';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserAvatar from 'react-native-user-avatar';
import { verticalScale, scale } from 'react-native-size-matters';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SwitchSelector from 'react-native-switch-selector';
import { isEmpty } from 'lodash';

import {
  getFeaturedProperties,
  getProperties,
  getPropertiesByStatus,
} from '../../data';
import { useDispatch, useSelector } from 'react-redux';
import Empty from '../../components/Empty';
import {
  black,
  lighterBlue,
  primary,
  primaryVariant,
  white,
} from '../../constants';
import { tSh } from '../../utility';
import { setLoading } from '../../state/global';
import { DefaultState } from '../../state/types';
import { saveCity, saveType } from '../../state/filter/filterSlice';
import {
  saveFeaturedProperties,
  saveProperties,
  saveSelectedProperty,
} from '../../state/properties/propertySlice';
import { useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const pills = [
  {
    id: 1,
    category: 'Residential',
    icon: 'home',
  },
  {
    id: 2,
    category: 'Commercial',
    icon: 'building',
  },
  // {
  //   id: 3,
  //   category: 'Industrial Properties',
  //   icon: 'heartbeat',
  // },
  {
    id: 4,
    category: 'Land',
    icon: 'mountain',
  },
  // {
  //   id: 5,
  //   category: 'Special Purpose Properties',
  //   icon: 'hospital',
  // },
  // {
  //   id: 6,
  //   category: 'Recreational Properties',
  //   icon: 'music',
  // },
];

const Home = ({ navigation }) => {
  const category = useSelector((state: any) => state.category);

  const [categ, setCateg] = useState<string>(category.category);
  const [categoryId, setCategoryId] = useState(category.category);
  const dispatch = useDispatch();

  const { auth, properties, featuredProperties, loading, city, type } =
    useSelector((state: DefaultState) => ({
      auth: state.auth,
      properties: state.properties.properties,
      featuredProperties: state.properties.featuredProperties,
      loading: state.globalState.loading,
      city: state.filter.city,
      type: state.filter.type,
    }));

  const route = useRoute();

  const handleNavigation = (item) => {
    dispatch(saveSelectedProperty(item));
    navigation.navigate('Detail');
  };

  const renderPill: any = ({ item }) => (
    <Pill
      id={item.id}
      name={item.category}
      icon={item.icon}
      categHandler={() => {
        dispatch(saveCity(null));
        dispatch(saveType([]));
        setCateg(item.category);
        setCategoryId(item.id);
        fetchData(item.id);
      }}
      toggle={categoryId}
    />
  );

  useEffect(() => {
    fetchData(categoryId === 0 || categoryId === 10 ? 1 : categoryId);
    fetchFeaturedProperties();
  }, [categoryId]);

  const fetchFeaturedProperties = async () => {
    try {
      const response = await getFeaturedProperties();
      dispatch(saveFeaturedProperties(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async (id: number = 1) => {
    try {
      dispatch(setLoading(true));
      const response = await getProperties(id);
      dispatch(saveProperties(response.data));
      dispatch(setLoading(false));
    } catch (e) {
      dispatch(setLoading(false));
    }
  };

  const options = [
    { label: 'RENT', value: 'RENT', activeColor: primary },
    { label: 'SALE', value: 'SALE', activeColor: primary },
  ];

  const handleStatusChange = async (value) => {
    try {
      dispatch(setLoading(true));
      const response = await getPropertiesByStatus(value, categoryId);
      dispatch(saveProperties(response.data));
      dispatch(setLoading(false));
      console.log('loading ', loading);
    } catch (e) {
      dispatch(setLoading(false));
      Alert.alert('Error fetching data, please try again later');
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{
        backgroundColor: lighterBlue,
      }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <UserAvatar
              size={30}
              style={{
                borderRadius: 5,
                height: 'auto',
                width: 'auto',
                marginRight: scale(10),
              }}
              imageStyle={{ borderRadius: 5 }}
              name={auth.firstname}
              // src="https://res.cloudinary.com/deex1bwvl/image/upload/v1660990555/Bluescope/avatar_hcscke.png"
            />
            <Text
              style={{ color: 'black', fontFamily: 'PlusJakartaSans-Regular' }}>
              Hi,
              {auth.firstname}
            </Text>
          </View>
          <Text
            style={{
              color: primary,
              fontSize: 22,
              fontWeight: 'bold',
              fontFamily: 'PlusJakartaSans-Regular',
              flexShrink: 1,
            }}>
            House Tanzania
          </Text>
        </View>

        <View style={styles.inputsFilter}>
          <View style={[styles.input, styles.boxShadow]}>
            <SwitchSelector
              options={options}
              initial={0}
              borderRadius={5}
              selectedTextStyle={{ fontWeight: 'bold' }}
              onPress={handleStatusChange}
            />
          </View>
          <Pressable
            style={({ pressed }) => [
              { backgroundColor: pressed ? primaryVariant : primary },
              styles.filter,
            ]}
            onPress={() => navigation.navigate('Filter')}>
            <Ionicons name="options-outline" size={20} color={white} />
          </Pressable>
        </View>

        <View style={styles.categories}>
          <Text
            style={{
              color: black,
              marginTop: 10,
              fontFamily: 'PlusJakartaSans-Medium',
              fontWeight: '700',
              fontSize: 16,
            }}>
            Property Categories
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <FlatList
              style={{ width: '100%' }}
              data={pills}
              renderItem={renderPill}
              //@ts-ignore
              keyExtractor={(item) => item.id}
              horizontal={true}
            />
          </View>
        </View>

        {/* <View
          style={{
            width: '100%',
            marginBottom: 10,
          }}>
          {properties && properties.length > 0 && (
            <Text
              style={{
                color: black,
                marginVertical: 6,
                fontFamily: 'PlusJakartaSans-Medium',
                fontWeight: '700',
                fontSize: 16,
              }}>
              Featured Properties
            </Text>
          )}

          <ScrollView horizontal={true}>
            {featuredProperties &&
              featuredProperties.length > 0 &&
              featuredProperties.map((item, index) => (
                <Pressable
                  onPress={() => handleNavigation(item)}
                  key={index}
                  style={{
                    width: 180,
                    height: 170,
                    backgroundColor: white,
                    marginRight: 10,
                  }}>
                  <Image
                    source={{ uri: item.images[0] }}
                    style={{
                      resizeMode: 'cover',
                      width: '100%',
                      height: '80%',
                    }}
                  />
                  <Text
                    style={{
                      color: black,
                      marginTop: 10,
                      fontFamily: 'PlusJakartaSans-Medium',
                      fontSize: 14,
                    }}>
                    {item.property_name}
                  </Text>
                </Pressable>
              ))}
          </ScrollView>
        </View> */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
            width: '100%',
          }}>
          <Text
            style={{
              color: black,
              fontSize: 16,
              fontFamily: 'PlusJakartaSans-Bold',
            }}>
            Browse
          </Text>
        </View>
        {loading && (
          <View
            style={{
              width,
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              height: height / 2.5,
            }}>
            <ActivityIndicator size="large" color={primary} />

            <Text
              style={{
                color: primary,
                fontSize: 12,
                fontFamily: 'PlusJakartaSans-Regular',
                marginTop: 10,
              }}>
              Fetching Properties
            </Text>
          </View>
        )}

        {!loading && !isEmpty(properties) && (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              width: '100%',
            }}>
            {city === null && isEmpty(type)
              ? properties.map((item) => (
                  <EstateCard navigation={navigation} property={item} />
                ))
              : isEmpty(type)
              ? properties
                  .filter((obj: any) => obj.address.city === city)
                  .map((item) => (
                    <EstateCard navigation={navigation} property={item} />
                  ))
              : properties
                  .filter(
                    (obj: any) =>
                      obj.address.city === city &&
                      obj.category.category_name === type,
                  )
                  .map((item) => (
                    <EstateCard navigation={navigation} property={item} />
                  ))}
          </View>
        )}

        {!loading && isEmpty(properties) && (
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              marginBottom: 10,
            }}>
            <Empty />
            <Text
              style={{
                color: primary,
                fontSize: 20,
                fontFamily: 'PlusJakartaSans-Regular',
              }}>
              No properties found
            </Text>
          </View>
        )}
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: lighterBlue,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  inputsFilter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 36,
    marginTop: 5,
    marginBottom: 10,
  },
  input: {
    backgroundColor: white,
    width: '80%',
    borderRadius: 5,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
    boxShadow: '0px 2px 7px -2px rgba(0, 0, 0, 0.25)',
  },
  filter: {
    // width: '20%',
    paddingHorizontal: 10,
    height: 'auto',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginVertical: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categories: {
    width: '100%',
  },
  empty: {
    width: scale(400),
    height: verticalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(50),
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

generateBoxShadowStyle(-2, 4, black, 0.2, 3, 4, black);

export default Home;
