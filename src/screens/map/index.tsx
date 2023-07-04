//@ts-nocheck
import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import { verticalScale } from 'react-native-size-matters';
import { primary, primaryVariant, white } from '../../constants';
import { tSh } from '../../utility';
import { useSelector } from 'react-redux';
import { DefaultState } from '../../state/types';

const Map = ({ navigation }) => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { property } = useSelector((state: DefaultState) => ({
    property: state.properties.selectedProperty,
  }));

  // variables
  const snapPoints = useMemo(() => ['8%', '40%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View key={property.property_id} style={styles.MainContainer}>
        <MapView
          style={styles.mapStyle}
          showsUserLocation={false}
          zoomEnabled={true}
          zoomControlEnabled={true}
          initialRegion={{
            latitude: property?.address?.geo_location
              ? property.address.geo_location.latitude
              : 0,
            longitude: property?.address?.geo_location
              ? property.address.geo_location.longitude
              : 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: property?.address?.geo_location
                ? property.address.geo_location.latitude
                : 0,
              longitude: property?.address?.geo_location
                ? property.address.geo_location.longitude
                : 0,
            }}
            title={property.property_name}
            description={property.address?.address}
            onPress={() => bottomSheetRef.current?.expand()}
          />
        </MapView>
        <BottomSheet
          ref={bottomSheetRef}
          // index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styles.contentContainer}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'PlusJakartaSans-Regular',
                  fontWeight: '600',
                }}>
                Map View 📍
              </Text>
              <View style={styles.item}>
                <Image
                  source={{
                    uri: property.images[0],
                  }}
                  style={{ flex: 2.3, borderRadius: 10, margin: 7 }}
                />

                <View style={{ flex: 3, margin: 10 }}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '500',
                      fontSize: 14,
                      fontFamily: 'PlusJakartaSans-Regular',
                    }}>
                    {property.property_name}
                  </Text>
                  <Text
                    style={{
                      color: primary,
                      fontFamily: 'PlusJakartaSans-Regular',
                      fontSize: 11,
                    }}>
                    {property.address.address + ', ' + property.address.city}
                  </Text>
                </View>
                <Text
                  style={{
                    color: primary,
                    margin: 10,
                    fontFamily: 'PlusJakartaSans-Regular',
                  }}>
                  {tSh(property.price)}
                </Text>
              </View>
              <Pressable
                style={({ pressed }) => [
                  { backgroundColor: pressed ? primaryVariant : primary },
                  styles.btn,
                ]}
                onPress={() => navigation.navigate('Detail')}>
                <Text
                  style={{
                    color: white,
                    fontFamily: 'PlusJakartaSans-Regular',
                  }}>
                  More Details
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  item: {
    height: 'auto',
    backgroundColor: white,
    margin: 15,
    borderRadius: 15,
    flexDirection: 'row',
  },
  btn: {
    // flex:0.13,
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    borderRadius: 7,
    border: 'none',
    paddingVertical: verticalScale(10),
    height: 'auto',
    marginVertical: verticalScale(10),
  },
});

export default Map;
