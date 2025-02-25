import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Avatar } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import CustomText from './CustomText';
import { Colors } from '@/constants/Colors';
import { countryFlag } from '@/constants/Images';

interface IItemFiat {
  id: number;
  abb: string;
  flag: string;
  name: string;
  symbol: string;
  check: boolean;
  handleClick: (abb: string, symbol: string) => void;
}

const ItemFiat = ({id, abb, flag, name, symbol, check, handleClick}: IItemFiat) => {
  return (
    <Pressable style={styles.container} onPress={() => handleClick(abb, symbol)}>
      <View style={styles.info}>
        <Avatar.Image source={countryFlag[flag]} size={32} />
        <View>
          <CustomText>{name}</CustomText>
          <CustomText>{abb}</CustomText>
        </View>
      </View>
      
      <AntDesign
        name={check ? 'checkcircle' : 'right'}
        size={16}
        color={check ? Colors.check : Colors.border}
      />
    </Pressable>
  )
}

export default ItemFiat;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  info: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  }
});
