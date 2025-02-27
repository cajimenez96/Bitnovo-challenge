import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Avatar } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import CustomText from './CustomText';
import { Colors } from '@/constants/Colors';
import { countryFlag } from '@/constants/Images';

interface IItemList {
  flag: string;
  name: string;
  text: string;
  code: string;
  check: boolean;
  handleClick?: (text: string, code: string) => void;
}

const ItemList = ({
  flag,
  name,
  text,
  code,
  check,
  handleClick
}: IItemList) => {
  return (
    <Pressable style={styles.container} onPress={() => handleClick && handleClick(text, code)}>
      <View style={styles.info}>
        <Avatar.Image source={countryFlag[flag]} size={32} />
        <View>
          <CustomText>{name}</CustomText>
          <CustomText>{text}</CustomText>
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

export default ItemList;

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
