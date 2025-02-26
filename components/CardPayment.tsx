import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-paper';
import CustomText from './CustomText';
import CustomCurrencyInput from './CustomCurrencyInput';
import { Images } from '@/constants/Images';
import { Colors } from '@/constants/Colors'

interface ICardPayment {
  amount: number;
  symbol: string;
  currency: string;
}
  
const CardPayment = ({amount, currency, symbol}: ICardPayment) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardContent}>
        <Icon source={Images.cardPayment} size={58} />
        <View>
          <CustomText color={Colors.textGrey}>Solicitud de pago</CustomText>
          <CustomCurrencyInput
            amount={amount}
            currency={currency}
            symbol={symbol}
            editable={false}
            customStyle={styles.input}
          />
        </View>
      </View>
      <CustomText size={12} color={Colors.textGrey}>
        Comparte el enlace de pago con el cliente
      </CustomText>
    </View>
  )
}

export default CardPayment;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: Colors.bgCard,
  },
  input: {
    fontSize: 30,
    color: Colors.blue,
    paddingTop: 0
  },
  cardContent: {
    flexDirection: 'row',
    gap: 10
  }
});