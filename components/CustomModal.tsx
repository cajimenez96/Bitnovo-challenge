import { Modal, StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from 'expo-router';
import { LeftButton } from './Header';
import CustomText from './CustomText';
import { Colors } from '@/constants/Colors';
import { useCurrency } from '@/context/CurrencyContext';
import ItemFiat from './ItemFiat';
import CustomSearchbar from './CustomSearchbar';

interface ICustomModal {
  show: boolean;
  setShowModal: (show: boolean) => void;
}

const CustomModal = ({show, setShowModal}: ICustomModal) => {
  const { state, dispatch } = useCurrency();
  const originalListCurrency = state.currencyList;
  const [listCurrency, setListCurrency] = useState(originalListCurrency);

  const closeModal = () => setShowModal(!show);

  const changeCurrency = (abbSelected: string, symbolSelected: string) => {
    dispatch({ type: 'SET_FIAT_DATA', payload: {abb: abbSelected, symbol: symbolSelected} });
    closeModal();
  };

  return (
    <Modal
      visible={show}
      transparent={true}
      animationType={"slide"}
    >
      <View style={styles.container}>
          <View style={{gap: 20}}>
            <View style={styles.headerContainer}>
              <LeftButton handleClick={closeModal} />
              <CustomText
                weight='700'
                size={18}
                color={Colors.blue}
              >
                Selecciona una divisa
              </CustomText>
              <View />
            </View>

            <View>

              <View style={styles.bodyContainer}>
                <CustomSearchbar
                  data={originalListCurrency}
                  setFiltered={setListCurrency}
                />
              </View>

              <View style={styles.abbStyle}>
                {listCurrency.map((item, index) => (
                  <ItemFiat
                    key={index}
                    id={item.id}
                    abb={item.abb}
                    flag={item.flag}
                    name={item.name}
                    symbol={item.symbol}
                    handleClick={changeCurrency}
                    check={state.currencyAbb === item.abb}
                  />
                ))}
              </View>
            </View>

          </View>
      </View>
    </Modal>
  )
}

export default CustomModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '5%',
    backgroundColor: Colors.white
  },
  bodyContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: '20%'
  },
  abbStyle: {
    marginTop: '5%',
    gap: 20,
    padding: 10
  }
});