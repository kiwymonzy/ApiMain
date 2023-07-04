/* eslint-disable */
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { black, lighterBlue, lightGrey, primary } from '../../constants';
import Profession from '../../components/Profession';
//@ts-ignore
import { isEmpty } from 'lodash';
import { ScrollView } from 'react-native-gesture-handler';
import { getProfessionals, getSuppliers } from '../../data';
import Empty from '../../components/Empty';
import { getCities } from '../../data';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import { setLoading } from '../../state/global';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  saveSuppliers,
  saveSelectedSupplier,
} from '../../state/suppliers/suppliersSlice';
import { useSelector, useDispatch } from 'react-redux';
import HardwareSupplierCard from '../../components/HardwareSupplierCard';

const HardwareSuppliers = ({ navigation }: { navigation: any }) => {
  interface City {
    city_id: string;
    name: string;
  }

  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const [cities, setCities] = useState<City[]>([]);
  const [city, setCity] = useState('Dar es Salaam');

  const loading = useSelector((state: any) => state.globalState.loading);
  const { suppliers } = useSelector((state: any) => state.supplier);

  useEffect(() => {
    fetchCities();
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const fetchCities = async () => {
    const res = await getCities();
    setCities(res.data);
  };

  const fetchData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getSuppliers();
      dispatch(saveSuppliers(response.data));
      dispatch(setLoading(false));
    } catch (e) {
      dispatch(setLoading(false));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="location" size={18} color={primary} />
        <Text
          style={{
            color: primary,
            fontWeight: 'bold',
            fontSize: 16,
            fontFamily: 'PlusJakartaSans-Regular',
            padding: 10,
          }}>
          City
        </Text>
        <Picker
          selectedValue={city}
          style={{ width: scale(200), color: black }}
          onValueChange={(item, _itemIndex) => {
            setCity(item);
          }}>
          {cities?.map((item, index) => (
            <Picker.Item label={item.name} value={item.name} key={index} />
          ))}
        </Picker>
      </View>
      {isEmpty(suppliers) ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          {/* <Empty /> */}
          <Text
            style={{
              color: primary,
              fontSize: moderateScale(20),
              fontFamily: 'PlusJakartaSans-Regular',
            }}>
            Empty
          </Text>
        </View>
      ) : (
        <ScrollView>
          {suppliers
            .filter((obj: any) => obj.city === city)
            .map((item: any) => {
              return (
                <HardwareSupplierCard
                  id={item.id}
                  img={item.image}
                  name={item.name}
                  address={item.location}
                  owner={item.owner}
                  navigator={() => {
                    dispatch(saveSelectedSupplier(item));
                    navigation.navigate('Hardware Supplier');
                  }}
                />
              );
            })}
        </ScrollView>
      )}
    </View>
  );
};

export default HardwareSuppliers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: lighterBlue,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  header: {
    marginVertical: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    width: 'auto',
    backgroundColor: lightGrey,
    borderRadius: 5,
    marginVertical: verticalScale(10),
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
  },
});
