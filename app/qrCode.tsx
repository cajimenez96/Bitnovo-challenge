import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Icon } from 'react-native-paper';
import { useCurrency } from '@/context/CurrencyContext';
import CustomText from '@/components/CustomText';
import CustomCurrencyInput from '@/components/CustomCurrencyInput';
import { Images } from '@/constants/Images';
import { Colors } from '@/constants/Colors';

const qrCode = () => {
  const { state } = useCurrency();
  const amount = state.currencyAmount;
  const abb = state.currencyAbb;
  const webUrl = state.webUrl;
  const symbol = state.currencySymbol;

  const [webUrlToShow, setWebUrlToShow] = useState<string>(
    "https://paytest.bitnovo.com/f16a139c"
  );
  
  useEffect(() => {
    if (webUrl.length > 0) setWebUrlToShow(webUrl);
  }, [webUrl]);


  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Icon source={Images.infoCircle} size={20} />
        <CustomText size={12} color={Colors.blue} style={{width: '90%'}}>
          Escanea el QR y serás redirigido a la pasarela de pago de Bitnovo Pay.
        </CustomText>
      </View>

      <View style={styles.QRContainer}>
        <QRCode
          value={webUrlToShow}
          logo={Images.bitnovoLogo}
          logoSize={50}
          logoMargin={5}
          size={330}
        />
      </View>

      <View style={styles.amountContainer}>
        <CustomCurrencyInput
          amount={amount}
          symbol={symbol}
          currency={abb}
          customStyle={styles.amount}
        />
      </View>

      <CustomText color={Colors.white} style={styles.text}>
        Esta pantalla se actualizará automáticamente.
      </CustomText>
    </View>
  )
}

export default qrCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgQr,
    padding: 20,
  },
  infoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    backgroundColor: Colors.bgAlert
  },
  QRContainer: {
    padding: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 6,
  },
  amountContainer: {
    marginTop: 40,
    alignItems: 'center'
  },
  amount: {
    color: Colors.white,
    fontSize: 26,
  },
  text: {
    textAlign: 'center',
    marginTop: 30
  }
})