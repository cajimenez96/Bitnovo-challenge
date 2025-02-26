import { StyleProp, StyleSheet, TextStyle } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import CurrencyInput from 'react-native-currency-input'

interface ICustomCurrencyInput {
  amount: number;
  currency: string;
  symbol: string;
  editable?: boolean;
  customStyle?: StyleProp<TextStyle>;
  setAmount?: (value: number) => void;
}

const CustomCurrencyInput = ({
  amount,
  currency,
  symbol,
  editable = true,
  customStyle,
  setAmount
}: ICustomCurrencyInput) => {

  const handleChangeValue = (value: number) => {
    if (setAmount)
      setAmount(value)
  } 

  return (
    <CurrencyInput
      value={amount}
      prefix={currency === 'EUR' ? '' : symbol}
      suffix={currency === 'EUR' ? symbol : ''}
      delimiter="."
      separator=","
      precision={2}
      minValue={0}
      editable={editable}
      style={[
        {color: amount === 0 ? Colors.placeholder : Colors.input},
        styles.input,
        customStyle
      ]}
      placeholder='0,00'
      onChangeValue={setAmount && handleChangeValue}
      />
  )
}

export default CustomCurrencyInput;

const styles = StyleSheet.create({
  input: {
    fontWeight: "700",
    fontSize: 40,
    paddingHorizontal: 10,
  },
})