import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { lighterBlue, primary } from '../../constants';
import ReservedItem from '../../components/ReservedItem';
//@ts-ignore
import { isEmpty } from 'lodash';
import { ScrollView } from 'react-native-gesture-handler';
import { getReservation } from '../../data';
import Empty from '../../components/Empty';
import { moderateScale } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';

const Reserved = () => {
  const [reservedProperties, setReservedProperties] = useState<any>();

  const isFocused = useIsFocused();

  const token = useSelector((state: any) => state.token);

  const fetchData = async (token: string) => {
    try {
      const response = await getReservation(token);
      setReservedProperties(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData(token.token);
    }
  }, [isFocused]);

  console.log(reservedProperties);
  return (
    <View style={styles.container}>
      {isEmpty(reservedProperties) ? (
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
            Empty
          </Text>
        </View>
      ) : (
        <ScrollView>
          {reservedProperties.map((item: any) => {
            return (
              <ReservedItem
                id={item?.reservation?.reservation_id}
                address={
                  item?.property?.address.address +
                  ', ' +
                  item?.property?.address.city
                }
                expiry_date={item?.reservation?.expiry_date}
                appointment_date={item?.reservation?.appointment_date}
                img={item?.property?.images[0]}
                title={item?.property?.property_name}
                status={item?.property?.property_status}
                price={item?.property?.price}
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default Reserved;

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
});
