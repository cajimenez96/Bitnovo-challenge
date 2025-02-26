import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import CustomText from './CustomText';
import { Icon } from 'react-native-paper';
import { shareButtonIcon } from '@/constants/Images';
import { Colors } from '@/constants/Colors';

interface IShareButton {
  icon: 'link' | 'email' | 'whatsapp' | 'others';
  title: string;
  handleClick: () => void;
}

const ShareButton = ({icon, title, handleClick}: IShareButton) => {
  return (
    <Pressable style={styles.btnContainer} onPress={handleClick}>
      <View style={styles.iconContainer}>
        <Icon source={shareButtonIcon[icon]} size={20} />
      </View>
      <CustomText color={Colors.blue}>{title}</CustomText>
    </Pressable>
  )
}

export default ShareButton

const styles = StyleSheet.create({
  btnContainer: {
    height: 56,
    flexDirection: "row",
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconContainer: {
    marginHorizontal: 20
  }
})