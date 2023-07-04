import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../state/user/userSlice';
import { background, grey, primary, white } from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../components/Button/component';
import { ScrollView } from 'react-native-gesture-handler';

const User = () => {
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@AuthData');
    await AsyncStorage.removeItem('@Token');
    dispatch(signOut());
  };

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.userTitle}>
          <Text
            style={{
              color: primary,
              fontSize: 18,
              fontFamily: 'PlusJakartaSans-Regular',
              margin: 15,
              fontWeight: 'bold',
            }}>
            Account Settings
          </Text>
        </View>

        <View>
          <View>
            <Text style={styles.formLabel}>Full Name</Text>
            <View style={styles.content}>
              <Ionicons
                name="person-outline"
                size={20}
                color={grey}
                style={{ marginHorizontal: 10 }}
              />
              <TextInput
                style={styles.input}
                editable={false}
                selectTextOnFocus={false}
                placeholder="johndoe@gmail.com"
                placeholderTextColor={grey}
                value={`${auth.firstname} ${auth.lastname}`}
              />
            </View>
          </View>
          <View>
            <Text style={styles.formLabel}>Your Email</Text>
            <View style={styles.content}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={grey}
                style={{ marginHorizontal: 10 }}
              />
              <TextInput
                style={styles.input}
                editable={false}
                selectTextOnFocus={false}
                placeholder="johndoe@gmail.com"
                placeholderTextColor={grey}
                value={auth.email}
              />
            </View>
          </View>

          <View>
            <Text style={styles.formLabel}>Account Status</Text>
            <View style={styles.content}>
              <AntDesign
                name="unlock"
                size={20}
                color={grey}
                style={{ marginHorizontal: 10 }}
              />
              <TextInput
                style={styles.input}
                editable={false}
                selectTextOnFocus={false}
                placeholderTextColor={grey}
                value={auth.is_active ? 'Active' : 'Not active'}
              />
            </View>
          </View>
          <View>
            <Text style={styles.formLabel}>Payment Status</Text>
            <View style={styles.content}>
              <MaterialIcons
                name="payments"
                size={20}
                color={grey}
                style={{ marginHorizontal: 10 }}
              />
              <TextInput
                style={styles.input}
                editable={false}
                selectTextOnFocus={false}
                placeholderTextColor={grey}
                value={auth.has_paid ? 'Subscribed' : 'No Subscription'}
              />
            </View>
          </View>

          <View
            style={{
              marginVertical: 15,
            }}>
            <CustomButton onClick={handleLogout} text="Logout" width="100%" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: scale(270),
    borderRadius: 6,
    backgroundColor: background,
    color: primary,
  },
  formLabel: {
    color: grey,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Medium',
    marginBottom: 8,
  },
  content: {
    width: '100%',
    height: 50,
    backgroundColor: background,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userTitle: {
    textAlign: 'center',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  box: {
    borderBottomWidth: 1,
    borderColor: primary,
    width: '100%',
    marginBottom: verticalScale(10),
    padding: moderateScale(5),
  },
});
