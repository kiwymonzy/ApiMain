import React from 'react';
import { primary, primaryVariant } from '../../constants';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

interface Props {
  onClick: any;
  disabled?: boolean;
  text?: string;
  children?: Element;
  width?: string | number;
}
const CustomButton = ({
  onClick,
  disabled = false,
  text = undefined,
  children = undefined,
  width = '100%',
}: Props) => {
  return (
    <Pressable
      onPress={onClick}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? primaryVariant : primary, width },
      ]}>
      {disabled ? (
        <ActivityIndicator size={25} />
      ) : (
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontFamily: 'PlusJakartaSans-Bold',
          }}>
          {text && text}
          {children && children}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});

export default CustomButton;
