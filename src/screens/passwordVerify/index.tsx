import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Empty from '../../components/Empty';

const PasswordVerify = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.empty}>
          <Empty />
        </View>
        <Text
          style={{
            color: '#3546CB',
            fontSize: moderateScale(20),
            fontFamily: 'PlusJakartaSans-Regular',
          }}>
          No Data
        </Text>
      </View>
    </View>
  );
};

export default PasswordVerify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FAFCFF',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  empty: {
    width: scale(400),
    height: verticalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(50),
  },
});
