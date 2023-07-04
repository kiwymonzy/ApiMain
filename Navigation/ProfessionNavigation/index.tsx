/* eslint-disable*/
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import professionals from '../../src/screens/professionals';
import professional from '../../src/screens/professional';
import ProfessionalMenu from '../../src/screens/professionalMenu';
import Mortgage from '../../src/screens/mortgage';
import HardwareSuppliers from '../../src/screens/hardwareSuppliers';
import HardwareSupplier from '../../src/screens/hardwareSupplier';
import Filter from '../../src/components/Filter';

const Profession = createNativeStackNavigator();

const ProfessionNavigation = () => {
  return (
    <Profession.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ProfessionalMenu">
      <Profession.Screen
        options={{ headerShown: false }}
        name="ProfessionalMenu"
        component={ProfessionalMenu}
      />
      <Profession.Screen
        options={{ title: 'Professionals', headerShown: true }}
        name="Professionals"
        component={professionals}
      />
      <Profession.Screen
        options={{ headerShown: false }}
        name="Professional"
        component={professional}
      />
      <Profession.Screen
        options={{ headerShown: false }}
        name="Mortgage Calculator"
        component={Mortgage}
      />
      <Profession.Screen
        options={{ title: 'Hardware Suppliers', headerShown: true }}
        name="Hardware Suppliers"
        component={HardwareSuppliers}
      />
      <Profession.Screen
        options={{ headerShown: false }}
        name="Hardware Supplier"
        component={HardwareSupplier}
      />
      <Profession.Screen name="Filter" component={Filter} />
    </Profession.Navigator>
  );
};

export default ProfessionNavigation;
