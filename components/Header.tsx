import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from "expo-router";
import CustomText from './CustomText';
import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CustomModal from './CustomModal';
import { useCurrency } from '@/context/CurrencyContext';

interface IHeader {
  title: string;
  right?: boolean;
  left?: boolean;
}

interface ILeftButton {
  handleClick: () => void;
}

export const LeftButton = ({handleClick}: ILeftButton) => {
  return (
    <Pressable style={styles.backButton} onPress={handleClick}>
      <Ionicons
        name="arrow-back"
        size={20}
        color={Colors.blue}
      />
    </Pressable>
  )
}


const Header = ({ title, right = false, left = false}: IHeader) => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState<boolean>(false);
  
  const handleBack = () => navigation.goBack();
  const handleOpenModal = () => setShowModal(true);


  const { state, dispatch } = useCurrency();
  const abb = state.currencyAbb;



  return (
    <View style={styles.container}>
      {left ? ( <LeftButton handleClick={handleBack}/> ) : (<View />)}

      <CustomText
        weight='700'
        size={18}
        color={Colors.blue}
        style={styles.titleHeader}
      >
        {title}
      </CustomText>
      
      {right ? (
        <Pressable onPress={handleOpenModal} style={styles.rightButton}>
          <CustomText
            weight='700'
            size={12}
            color={Colors.blue}
          >
            {abb}
          </CustomText>
          
          <MaterialIcons
            name="keyboard-arrow-down"
            size={25}
            color={Colors.blue}
          />
        </Pressable>
      ) : (<View />)}

      <CustomModal show={showModal} setShowModal={setShowModal} />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    paddingHorizontal: 10,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  titleHeader: {
    justifyContent: 'center',
    marginLeft: '10%'
  },
  backButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.buttonBg,
    borderRadius: '100%'
  },
  rightButton: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: Colors.buttonBg,
  },
})