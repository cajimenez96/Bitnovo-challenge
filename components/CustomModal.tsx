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
  title?: string;
  children: React.ReactNode;
  setShowModal: (show: boolean) => void;
}

const CustomModal = ({show, title, children, setShowModal}: ICustomModal) => {
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
        <View style={styles.headerContainer}>
          <LeftButton handleClick={closeModal} />
          <CustomText
            weight='700'
            size={18}
            color={Colors.blue}
          >
            {title}
          </CustomText>
          <View />
        </View>
        
        {children}
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
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: '20%'
  },
});