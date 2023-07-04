//@ts-nocheck
import { StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  black,
  lightGrey,
  primary,
  primaryVariant,
  white,
} from '../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scale, verticalScale } from 'react-native-size-matters';
import CurrencyInput from 'react-native-currency-input';
import CustomButton from '../Button/component';
import { Picker } from '@react-native-picker/picker';
import { getCities, search } from '../../data';
import { IQueryParams } from '../../state/properties/types';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../state/global';
import { saveProperties } from '../../state/properties/propertySlice';
import { saveCity, saveType } from '../../state/filter/filterSlice';
import { DefaultState } from '../../state/types';

//@ts-ignore
const Filter = ({ navigation }) => {
  interface City {
    city_id: string;
    name: string;
  }

  /*
Note: due to the asynchronous behaiviour of useState, I had to use the following workaround to get the required data from the category type, when switching on the type, the state assumes its true so I had to check for false, and vice versa.
  */

  const dispatch = useDispatch();

  const [maxPrice, setMaxPrice] = useState<number | null>(0);
  const [minPrice, setMinPrice] = useState<number | null>(0);

  //Property Type hooks
  const [anyProperty, setAnyProperty] = useState<boolean>(false);
  const [apartment, setApartment] = useState<boolean>(false);
  const [townhouse, setTownhouse] = useState<boolean>(false);
  // const [land, setLand] = useState<boolean>(false);
  const [villa, setVilla] = useState<boolean>(false);
  const [pent, setPent] = useState<boolean>(false);
  const [bungalow, setBungalow] = useState<boolean>(false);
  const [duplex, setDuplex] = useState<boolean>(false);
  const [half, setHalf] = useState<boolean>(false);
  const [full, setFull] = useState<boolean>(false);
  const [residential, setResidential] = useState<boolean>(false);
  const [commercial, setCommercial] = useState<boolean>(false);
  const [farm, setFarm] = useState<boolean>(false);
  const [office, setOffice] = useState<boolean>(false);
  const [shop, setShop] = useState<boolean>(false);
  const [land, setLand] = useState<boolean>(false);
  const [warehouse, setWarehouse] = useState<boolean>(false);
  const [cities, setCities] = useState<City[]>([]);
  const [city, setCity] = useState();
  const [query, setQuery] = useState<IQueryParams>({
    starting_price: minPrice || 0,
    end_price: maxPrice || 0,
    property_status: 'RENT',
  });

  //acquire type hooks
  const [buy, setBuy] = useState<boolean>(false);
  const [rent, setRent] = useState<boolean>(false);

  const { loading, type } = useSelector((state: DefaultState | any) => ({
    loading: state.globalState.loading,
    type: state.filter.type,
  }));

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCities();
      setCities(res.data);
    };
    fetchData();
  }, []);

  const handleSearch = async () => {
    dispatch(setLoading(true));
    const response = await search(query);
    dispatch(saveProperties(response.data));
    dispatch(setLoading(false));

    navigation.goBack();
  };

  const handleClear = () => {
    setMinPrice(0);
    setMaxPrice(0);
    setAnyProperty(false);
    setApartment(false);
    setTownhouse(false);
    setVilla(false);
    setPent(false);
    setBungalow(false);
    setDuplex(false);
    setHalf(false);
    setFull(false);
    setResidential(false);
    setCommercial(false);
    setFarm(false);
    setOffice(false);
    setShop(false);
    setLand(false);
    setWarehouse(false);
    setCity(undefined);
    setBuy(false);
    setRent(false);
    setQuery({
      starting_price: 0,
      end_price: 0,
      city_id: 4,
    });
  };

  return (
    <KeyboardAwareScrollView style={styles.scrollContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="close" size={25} color="#000000" />
          </Pressable>
          <Text
            style={{
              color: black,
              fontSize: 18,
              fontFamily: 'PlusJakartaSans-Regular',
              fontWeight: 'bold',
            }}>
            Advanced Search
          </Text>
          <Pressable
            onPress={() => {
              handleClear();
            }}
            style={({ pressed }) => [
              { backgroundColor: pressed ? primaryVariant : '#EFF1FF' },
              styles.reset,
            ]}>
            <Text
              style={{
                fontSize: 12,
                color: primary,
                fontFamily: 'PlusJakartaSans-Regular',
              }}>
              Reset
            </Text>
          </Pressable>
        </View>

        <View style={styles.property}>
          <Text
            style={{
              color: primary,
              fontWeight: 'bold',
              fontSize: 16,
              marginBottom: 5,
              fontFamily: 'PlusJakartaSans-Regular',
            }}>
            Category Type
          </Text>

          <View style={styles.type}>
            <View style={styles.parts}>
              <Pressable
                onPress={() => {
                  setAnyProperty(!anyProperty);
                  dispatch(saveType([]));
                }}
                style={({ pressed }) => [
                  { backgroundColor: pressed ? primaryVariant : primary },
                  anyProperty ? styles.checked : styles.option,
                ]}>
                <Text
                  style={
                    anyProperty
                      ? {
                          color: white,
                          fontFamily: 'PlusJakartaSans-Regular',
                        }
                      : {
                          color: primary,
                          fontFamily: 'PlusJakartaSans-Regular',
                        }
                  }>
                  Any
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setApartment(!apartment);
                  apartment === false
                    ? dispatch(saveType([...type, 'apartment']))
                    : dispatch(
                        saveType(type.filter((item) => item !== 'apartment')),
                      );
                }}
                style={({ pressed }) => [
                  { backgroundColor: pressed ? primaryVariant : primary },
                  apartment ? styles.checked : styles.option,
                ]}>
                <Text
                  style={
                    apartment
                      ? { color: white, fontFamily: 'PlusJakartaSans-Regular' }
                      : {
                          color: primary,
                          fontFamily: 'PlusJakartaSans-Regular',
                        }
                  }>
                  Apartment
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setVilla(!villa);
                  villa === false
                    ? dispatch(saveType([...type, 'villa']))
                    : dispatch(
                        saveType(type.filter((item) => item !== 'villa')),
                      );
                }}
                style={({ pressed }) => [
                  { backgroundColor: pressed ? primaryVariant : primary },
                  villa ? styles.checked : styles.option,
                ]}>
                <Text
                  style={
                    villa
                      ? { color: white, fontFamily: 'PlusJakartaSans-Regular' }
                      : {
                          color: primary,
                          fontFamily: 'PlusJakartaSans-Regular',
                        }
                  }>
                  Villa
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setBungalow(!bungalow);
                  bungalow === false
                    ? dispatch(saveType([...type, 'bungalow']))
                    : dispatch(
                        saveType(type.filter((item) => item !== 'bungalow')),
                      );
                }}
                style={({ pressed }) => [
                  { backgroundColor: pressed ? primaryVariant : primary },
                  bungalow ? styles.checked : styles.option,
                ]}>
                <Text
                  style={
                    bungalow
                      ? { color: white, fontFamily: 'PlusJakartaSans-Regular' }
                      : {
                          color: primary,
                          fontFamily: 'PlusJakartaSans-Regular',
                        }
                  }>
                  Bungalow
                </Text>
              </Pressable>
            </View>
            <View style={styles.parts}>
              <Pressable
                onPress={() => {
                  setWarehouse(!warehouse);
                  warehouse === false
                    ? dispatch(saveType([...type, 'warehouse']))
                    : dispatch(
                        saveType(type.filter((item) => item !== 'warehouse')),
                      );
                }}
                style={({ pressed }) => [
                  { backgroundColor: pressed ? primaryVariant : primary },
                  warehouse ? styles.checked : styles.option,
                ]}>
                <Text
                  style={
                    warehouse
                      ? { color: white, fontFamily: 'PlusJakartaSans-Regular' }
                      : {
                          color: primary,
                          fontFamily: 'PlusJakartaSans-Regular',
                        }
                  }>
                  Warehouse
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setShop(!shop);
                  shop === false
                    ? dispatch(saveType([...type, 'shop']))
                    : dispatch(
                        saveType(type.filter((item) => item !== 'shop')),
                      );
                }}
                style={({ pressed }) => [
                  { backgroundColor: pressed ? primaryVariant : primary },
                  shop ? styles.checked : styles.option,
                ]}>
                <Text
                  style={
                    shop
                      ? { color: white, fontFamily: 'PlusJakartaSans-Regular' }
                      : {
                          color: primary,
                          fontFamily: 'PlusJakartaSans-Regular',
                        }
                  }>
                  Shop
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setOffice(!office);
                  office === false
                    ? dispatch(saveType([...type, 'office']))
                    : dispatch(
                        saveType(type.filter((item) => item !== 'office')),
                      );
                }}
                style={({ pressed }) => [
                  { backgroundColor: pressed ? primaryVariant : primary },
                  office ? styles.checked : styles.option,
                ]}>
                <Text
                  style={
                    office
                      ? { color: white, fontFamily: 'PlusJakartaSans-Regular' }
                      : {
                          color: primary,
                          fontFamily: 'PlusJakartaSans-Regular',
                        }
                  }>
                  Office
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setLand(!land);
                  land === false
                    ? dispatch(saveType([...type, 'land']))
                    : dispatch(
                        saveType(type.filter((item) => item !== 'land')),
                      );
                }}
                style={({ pressed }) => [
                  { backgroundColor: pressed ? primaryVariant : primary },
                  land ? styles.checked : styles.option,
                ]}>
                <Text
                  style={
                    land
                      ? { color: white, fontFamily: 'PlusJakartaSans-Regular' }
                      : {
                          color: primary,
                          fontFamily: 'PlusJakartaSans-Regular',
                        }
                  }>
                  Land
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.price}>
          <View style={styles.priceRange}>
            <View style={styles.priceInfo}>
              <Text
                style={{
                  color: primary,
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontFamily: 'PlusJakartaSans-Regular',
                }}>
                Price Range
              </Text>
            </View>
            <View>
              <Text style={styles.formLabel}>Minimum Price</Text>
              <View style={styles.content}>
                <CurrencyInput
                  value={minPrice}
                  onChangeValue={(value) => {
                    setMinPrice(value);
                    setQuery({ ...query, starting_price: value as number });
                  }}
                  prefix="TZS "
                  style={styles.input}
                  delimiter=","
                  separator="."
                  precision={0}
                  minValue={0}
                />
              </View>
            </View>
            <View>
              <Text style={styles.formLabel}>Maximum Price</Text>
              <View style={styles.content}>
                <CurrencyInput
                  value={maxPrice}
                  onChangeValue={(value) => {
                    setMaxPrice(value);
                    setQuery({ ...query, end_price: value as number });
                  }}
                  prefix="TZS "
                  style={styles.input}
                  delimiter=","
                  separator="."
                  precision={0}
                  minValue={0}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.location}>
          <Text
            style={{
              color: primary,
              fontWeight: 'bold',
              fontSize: 16,
              fontFamily: 'PlusJakartaSans-Regular',
              paddingVertical: 10,
            }}>
            City
          </Text>
          <View style={styles.content}>
            <Picker
              selectedValue={city}
              style={{ width: scale(280), color: black }}
              onValueChange={(item, _itemIndex) => {
                setCity(item);
                dispatch(saveCity(item));
                // setQuery({ ...query, city_id: item });
              }}>
              {cities?.map((item, index) => (
                <Picker.Item label={item.name} value={item.name} key={index} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.acquire}>
          <Text
            style={{
              color: primary,
              fontWeight: 'bold',
              fontSize: 16,
              marginBottom: 5,
              fontFamily: 'PlusJakartaSans-Regular',
            }}>
            Acquire type
          </Text>
          <View style={styles.acquireOpt}>
            <Pressable
              onPress={() => {
                setBuy(!buy);
                setQuery({ ...query, property_status: 'SALE' });
              }}
              style={() => [, buy ? styles.checkAcq : styles.buy]}>
              <Text
                style={
                  buy
                    ? {
                        color: white,
                        fontFamily: 'PlusJakartaSans-Regular',
                      }
                    : {
                        color: primary,
                        fontFamily: 'PlusJakartaSans-Regular',
                      }
                }>
                SALE
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setBuy(!buy);
                setQuery({ ...query, property_status: 'RENT' });
              }}
              style={() => [, !buy ? styles.checkAcq : styles.rent]}>
              <Text
                style={
                  !buy
                    ? {
                        color: white,
                        marginLeft: 5,
                        fontFamily: 'PlusJakartaSans-Regular',
                      }
                    : {
                        color: primary,
                        marginLeft: 5,
                        fontFamily: 'PlusJakartaSans-Regular',
                      }
                }>
                RENT
              </Text>
            </Pressable>
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            width: '90%',
          }}>
          <CustomButton
            disabled={loading}
            onClick={handleSearch}
            text="Search"
          />
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: white,
  },
  scrollContainer: {
    backgroundColor: white,
    flex: 1,
  },
  reset: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 'auto',
    paddingHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: '7%',
  },
  property: {
    width: '90%',
    flex: 0.1,
  },
  type: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  parts: {},
  option: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 5,
    paddingVertical: 5,
    paddingHorizontal: 7,
    backgroundColor: '#EFF1FF',
  },
  checked: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 5,
    paddingVertical: 5,
    paddingHorizontal: 7,
    backgroundColor: primary,
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 6,
    borderColor: 'grey',
    backgroundColor: lightGrey,
    color: black,
  },
  price: {
    flex: 0.1,
    width: '100%',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  priceRange: {
    flex: 0.7,
    width: '90%',
  },
  formLabel: {
    color: black,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Medium',
    marginBottom: 4,
  },
  content: {
    // width: '100%',
    backgroundColor: lightGrey,
    borderRadius: 5,
    marginBottom: 10,
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
  },
  location: {
    // flex: 0.1,
    width: '90%',
    marginBottom: 10,
  },
  locationInput: {
    backgroundColor: lightGrey,
    width: '99%',
    borderRadius: 5,
  },
  bedrooms: {
    flex: 0.1,
    width: '90%',
    alignItems: 'flex-start',
  },
  bed: {
    flexDirection: 'row',
    width: '90%',
  },
  acquire: {
    flex: 0.2,
    width: '90%',
  },
  acquireOpt: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  buy: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    width: '45%',
    backgroundColor: '#EFF1FF',
  },
  // option: {
  //   color: white,
  //   paddingVertical: 5,
  //   paddingHorizontal: 10,
  // },
  optionSelected: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: primary,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  rent: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '45%',
    backgroundColor: '#EFF1FF',
  },
  checkAcq: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '45%',
    backgroundColor: primary,
  },
});
