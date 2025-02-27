import { useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, View, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useCurrency } from '@/context/CurrencyContext';
import CustomText from '@/components/CustomText';
import CustomButton from '@/components/CustomButton';
import { orderCreate } from '@/services/Order.service';
import { MAX_CHARACTERS } from '@/utils/utils';
import CustomCurrencyInput from '@/components/CustomCurrencyInput';
import { GlobalStyles } from '@/constants/GlobalStyles';
import { Colors } from '@/constants/Colors';


export default function HomeScreen() {
  const { state, dispatch } = useCurrency();

  const [amount, setAmount] = useState(state.currencyAmount);
  const [noteLength, setNoteLength] = useState(0);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const symbol = state.currencySymbol;
  const abb = state.currencyAbb;

  const handleChange = (value: string) => {
    setNote(value);

    if (value.length <= MAX_CHARACTERS) {
      setNoteLength(value.length);
    }
  };

  const handleSubmit = async () => {
    const orderDataTest = {
      expected_output_amount: amount,
      fiat: abb,
      notes: note,
      language: "ES",
      email_client: "cliente@example.com",
      full_name: "Juan Pérez",
      phone_number: "+34123456789",
      nif: "12345678A",
    };

    setIsLoading(true);
    dispatch({ type: 'CREATE_ORDER_PENDING' });

    try {
      const response = await orderCreate(orderDataTest);
      dispatch({ type: "SET_AMOUNT", payload: amount });
      dispatch({ type: "CREATE_ORDER_FULFILLED", payload: response });
      router.push('/shareOptions');
    } catch (error: any) {
      dispatch({ type: "CREATE_ORDER_FAILURE", payload: error.message });
      console.error("Error al crear la orden:", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    style={GlobalStyles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[GlobalStyles.container, GlobalStyles.padding, styles.between]}>

          <View>
            <View style={styles.mountContainer}>
              <CustomCurrencyInput
                amount={amount}
                currency={abb}
                symbol={symbol}
                setAmount={setAmount}
              />
            </View>

            <View style={{gap: 10}}>
              <CustomText
                weight='700'
                size={14}
                color={Colors.blue}
              >
                Concepto
              </CustomText>

              <TextInput
                placeholder='Añade descripción del pago'
                style={styles.textInput}
                multiline
                maxLength={MAX_CHARACTERS}
                onChangeText={handleChange}
              />
              <CustomText size={12} color={Colors.textGrey} style={{textAlign: 'right'}}>
                {noteLength + '/'+ MAX_CHARACTERS + ' caracteres'}
              </CustomText>
            </View>
          </View>

          

          
          <CustomButton
            handleClick={handleSubmit}
            disabled={amount === 0 || isLoading}
            style={styles.button}
          >
            <CustomText
              weight='600'
              size={16}
              color={amount === 0 ? Colors.check : Colors.white}
            >
              Continuar
            </CustomText>
            {isLoading && <ActivityIndicator animating={true} color={Colors.check} />}
          </CustomButton>
          
              
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mountContainer: {
    marginVertical: '10%',
    justifyContent: "center",
    alignItems: "center",
    height: 100
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 18
  },
  between: {
    justifyContent: 'space-between'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  }
});
