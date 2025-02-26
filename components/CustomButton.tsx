import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';

interface ICustomButton {
  children: React.ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  handleClick: () => void;
}

const CustomButton = ({children, disabled = false, style, handleClick}: ICustomButton) => {
  return (
    <Pressable
      style={[
        styles.button,
        disabled ? styles.disabled : styles.primary,
        style
      ]}
      onPress={handleClick}
      disabled={disabled}
    >
      {children}
    </Pressable>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 56,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: Colors.input,
    borderColor: 'transparent',
  },
  disabled: {
    backgroundColor: Colors.disabled,
    borderColor: 'transparent',
  }
})