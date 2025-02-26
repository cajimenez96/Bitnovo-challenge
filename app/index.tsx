import { StyleSheet, View, TextInput } from 'react-native';
import { useCurrency } from '@/context/CurrencyContext';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { GlobalStyles } from '@/constants/GlobalStyles';

import CurrencyInput from 'react-native-currency-input';
import CustomText from '@/components/CustomText';
import CustomButton from '@/components/CustomButton';
import { orderCreate } from '@/services/Order.service';
import { ActivityIndicator } from 'react-native-paper';

const MAX_CHARACTERS = 140;


export default function HomeScreen() {
  const { state, dispatch } = useCurrency();

  const [amount, setAmount] = useState(state.currencyMount);
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
    setIsLoading(true);

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

    dispatch({ type: "SET_MOUNT", payload: amount });

    await orderCreate(orderDataTest)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false))
  };


  return (
    <View style={[GlobalStyles.container, GlobalStyles.padding, styles.between]}>

      <View>
        <View style={styles.mountContainer}>
          <CurrencyInput
            value={amount}
            prefix={abb === 'EUR' ? '' : symbol}
            suffix={abb === 'EUR' ? symbol : ''}
            delimiter="."
            separator=","
            precision={2}
            minValue={0}
            style={[
              {color: amount === 0 ? Colors.placeholder : Colors.input},
              styles.input
            ]}
            placeholder='0,00'
            onChangeValue={setAmount}
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

      

      <View>
        <CustomButton handleClick={handleSubmit} disabled={amount === 0 || isLoading} style={styles.button}>
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
          
    </View>
  );
}

const styles = StyleSheet.create({
  mountContainer: {
    marginVertical: '10%',
    justifyContent: "center",
    alignItems: "center",
    height: 100
  },
  input: {
    fontWeight: "700",
    fontSize: 40,
    paddingHorizontal: 10,
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
