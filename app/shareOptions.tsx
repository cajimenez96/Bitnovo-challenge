import React, { useState } from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Icon } from 'react-native-paper';
import * as Clipboard from "expo-clipboard";
import * as Sharing from 'expo-sharing';
import { router } from 'expo-router';
import CardPayment from '@/components/CardPayment';
import CustomButton from '@/components/CustomButton';
import CustomText from '@/components/CustomText';
import ShareButton from '@/components/ShareButton';
import { Images } from '@/constants/Images';
import { useCurrency } from '@/context/CurrencyContext';
import { Colors } from '@/constants/Colors';
import { validatePhone } from '@/utils/utils';
import CustomModal from '@/components/CustomModal';

const shareOptions = () => {
  const { state, dispatch } = useCurrency();

  const [openModal, setOpenModal] = useState(false); 
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const amount = state.currencyAmount;
  const abb = state.currencyAbb;
  const symbol = state.currencySymbol;
  const webUrl = state.webUrl;

  const createNewOrden = () => {
    dispatch({ type: 'RESET_DATA' })
    router.push('/');
  }

  const copyLinkToClipboard = () => {
    Clipboard.setStringAsync(webUrl)
    .then(() => {
      Toast.show({
        type: 'success',
        text1: 'Listo!',
        text2: 'Link copiado en portapapeles',
        position: 'bottom'
      });
    })
  }

  const sendToMail = () => {
    Linking.openURL(
      `mailto:${email}?subject=Payment&body=${webUrl}`
    );
  };

  const sendToPhoneNumber = (phone: string) => {
    if (validatePhone(phone)) {
      Linking.openURL(
        `whatsapp://send?phone=${phone}&text=El link de pago para tu compra es: ${webUrl}`
      )
      .then(() => setOpenModal(true))
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Error!',
          text2: 'Ha ocurrido un inconveniente.',
          position: 'bottom'
        });
      });

    } else {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Debe ingresar un número valido.',
        position: 'bottom'
      });
    }
  };

  const shareOthers =  () => {
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
              handleClick={() => router.push('/qrCode')}
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
            handleClick={() => shareOthers()}
          />
          
        </View>
      </View>

      <CustomButton style={styles.button} handleClick={createNewOrden}>
        <CustomText weight='600' size={16} color={Colors.blue}>
          Nueva solicitud
        </CustomText>
        <Icon source={Images.newOrder} size={20}/>
      </CustomButton>


      <CustomModal
        back={false}
        show={openModal}
        setShowModal={setOpenModal}
        customHeight={'50%'}
      >
        <View style={styles.modalContent}>
          <View style={styles.content}>
            <View>
              <Icon source={Images.success} size={80} />
            </View>
            <CustomText weight='700' size={26} color={Colors.blue}>
              Solicitud enviada
            </CustomText>
            <CustomText color={Colors.textGrey} style={{textAlign: 'center'}}>
              Tu solicitud de pago enviada ha sido enviado con éxito por WhatsApp .
            </CustomText>
          </View>

          <CustomButton handleClick={() => setOpenModal(false)}>
            <CustomText weight='600' size={16} color={Colors.white}>
              Entendido
            </CustomText>
          </CustomButton>
        </View>
      </CustomModal>

      <Toast />
    </ScrollView>
  )
}

export default shareOptions;

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
  },
  modalContent: {
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 45,
    justifyContent: 'space-between',
  },
  content: {
    alignItems: 'center',
    gap: 30
  },
});
