import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useCurrency } from '@/context/CurrencyContext'
import { router } from 'expo-router';
import { GlobalStyles } from '@/constants/GlobalStyles';
import CustomText from '@/components/CustomText';
import { Icon } from 'react-native-paper';
import { Images } from '@/constants/Images';
import { Colors } from '@/constants/Colors';
import CustomButton from '@/components/CustomButton';

const success = () => {
  const { dispatch } = useCurrency();

  const returnToIndex = () => {
    dispatch({ type: 'RESET_DATA' })
    router.push('/');
  }
  
  return (
    <View style={[GlobalStyles.container, {paddingBottom: 40, paddingHorizontal: 20}]}>
      <View style={styles.container}>
        <Icon source={Images.successScreen} size={200} />
        <CustomText weight='700' size={20} color={Colors.blue}>Pago recibido</CustomText>
        <CustomText color={Colors.textGrey}>El pago se ha confirmado con éxito</CustomText>
      </View>
      <CustomButton style={styles.button} handleClick={returnToIndex}>
        <CustomText weight='600' size={16} color={Colors.input}>Finalizar</CustomText>
      </CustomButton>
    </View>
  )
}

export default success;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: Colors.buttonBg
  }
});
