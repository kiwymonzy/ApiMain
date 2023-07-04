import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

type PillType = {
  id: string | number;
  name: string;
  icon: string;
  toggle: string | number;
  categHandler: () => void;
};

const Pill = ({ id, name, icon, categHandler, toggle }: PillType) => {
  return (
    <View key={id} style={{ margin: 10 }}>
      <Pressable
        //@ts-ignore
        onPress={categHandler}
        style={id == toggle ? styles.on : styles.off}>
        <Icon
          name={icon}
          size={15}
          color={id == toggle ? '#EFF1FF' : '#3546CB'}
          style={{ marginRight: 3 }}
        />

        <Text style={id == toggle ? styles.onFont : styles.offFont}>
          {name}
        </Text>
      </Pressable>
    </View>
  );
};

export default Pill;

const styles = StyleSheet.create({
  on: {
    backgroundColor: '#3546CB',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 8,
  },
  off: {
    backgroundColor: '#EFF1FF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 8,
  },
  onFont: {
    color: '#EFF1FF',
    fontFamily: 'PlusJakartaSans-Regular',
    fontWeight: 'bold',
  },
  offFont: {
    color: '#3546CB',
    fontFamily: 'PlusJakartaSans-Regular',
    fontWeight: 'bold',
  },
});
