import React, { useState } from 'react'
import { Linking, ScrollView, StyleSheet, ToastAndroid, View } from 'react-native'
import { Icon } from 'react-native-paper';
import * as Clipboard from "expo-clipboard";
import * as Sharing from 'expo-sharing';
import { useNavigation } from 'expo-router';
import CardPayment from '@/components/CardPayment';
import CustomButton from '@/components/CustomButton';
import CustomText from '@/components/CustomText';
import ShareButton from '@/components/ShareButton';
import { Images } from '@/constants/Images';
import { useCurrency } from '@/context/CurrencyContext';
import { Colors } from '@/constants/Colors';
import { validatePhone } from '@/utils/utils';

const shareOptions = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useCurrency();

  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const amount = state.currencyAmount;
  const abb = state.currencyAbb;
  const symbol = state.currencySymbol;
  const webUrl = state.webUrl;

  const createNewOrden = () => {
    dispatch({ type: 'RESET_DATA' })
    navigation.navigate('index');
  }

  const copyLinkToClipboard = async () => {
    await Clipboard.setStringAsync(webUrl);
    ToastAndroid.show("Link copiado en portapapeles", ToastAndroid.SHORT);
  }

  const sendToMail = () => {
    Linking.openURL(
      `mailto:${email}?subject=Payment&body=${webUrl}`
    );
  };

  const sendToPhoneNumber = (phone: string) => {
    console.log(phone)
    if (validatePhone(phone))
      Linking.openURL(
        "whatsapp://send?text=" +
          "El link de pago para tu compra es: " +
          webUrl +
          "&phone=" +
          whatsapp
      );
    else
      ToastAndroid.show("Debe ingresar un número valido.", ToastAndroid.LONG);
  };

  const shareOthers =  () => {
    console.log('hola')
    Sharing.shareAsync(webUrl, {
      dialogTitle: 'Compartir enlace',
    });
  }
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <CardPayment
          amount={amount}
          currency={abb}
          symbol={symbol}
        />

        <View style={styles.shareContainer}>
          <View style={styles.linkContent}>
            <ShareButton
              title={webUrl || "Generando link, por favor espere..."}
              type="link"
              width={'80%'}
              handleClick={copyLinkToClipboard}
            />
            <CustomButton
              handleClick={() => navigation.navigate('qrCode')}
              style={styles.qrButton}
            >
              <Icon source={Images.qrScan} size={20} />
            </CustomButton>
          </View>

          <ShareButton
            title={"Enviar por correo electrónico"}
            type="email"
            placeholder="example@example.com"
            handleClick={sendToMail}
            value={email}
            setValue={setEmail}
          />

          <ShareButton
            title={"Enviar a número de WhatsApp"}
            type="whatsapp"
            value={whatsapp}
            setValue={setWhatsapp}
            handleClick={(value) => sendToPhoneNumber(value)}
          />

          <ShareButton
            title={"Compartir con otras aplicaciones"}
            type="link"
            handleClick={shareOthers}
          />
          
        </View>
      </View>

      <CustomButton style={styles.button} handleClick={createNewOrden}>
        <CustomText weight='600' size={16} color={Colors.blue}>Nueva solicitud</CustomText>
        <Icon source={Images.newOrder} size={20}/>
      </CustomButton>
    </ScrollView>
  )
}

export default shareOptions

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: 40,
    padding: 20,
  },
  shareContainer: {
    marginTop: 20
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.bgCard,
    borderWidth: 1, 
    borderColor: Colors.border
  },
  linkContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qrButton: {
    width: 56,
    marginLeft: 20
  }
})