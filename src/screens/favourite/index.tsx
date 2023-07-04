//@ts-nocheck
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { black, lighterBlue, primary } from '../../constants';
import Empty from '../../components/Empty';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import FavouriteItem from '../../components/FavouriteItem';
import { isEmpty } from 'lodash';
import { saveFavouriteProperties } from '../../state/properties/propertySlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favourite = () => {
  const [properties, setProperties] = React.useState<Array>([]);

  const dispatch = useDispatch();

  const { favouriteProperties } = useSelector((state: DefaultState) => ({
    favouriteProperties: state.properties.favouriteProperties,
  }));

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

  React.useEffect(() => {
    loadStorageData().then((data) => {
      if (data) {
        dispatch(saveFavouriteProperties(data));
        setProperties(data);
      }
    });
  }, [dispatch]);

  const handleRemove = async (id) => {
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

  return (
    <View style={styles.container}>
      {isEmpty(properties) ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <Empty />
          <Text
            style={{
              color: primary,
              fontSize: moderateScale(20),
              fontFamily: 'PlusJakartaSans-Regular',
            }}>
            No Data
          </Text>
        </View>
      ) : (
        <ScrollView>
          {favouriteProperties.map((item) => {
            return (
              <FavouriteItem
                id={item.property_id}
                img={item.images[0]}
                title={item.property_name}
                desc={item.property_description}
                price={item.price}
                handleRemove={() => handleRemove(item.property_id)}
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: lighterBlue,
    fontFamily: 'PlusJakartaSans-Regular',
  },
});
