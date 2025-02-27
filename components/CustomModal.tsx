import { Modal, StyleSheet, View } from 'react-native';
import React from 'react';
import { LeftButton } from './Header';
import CustomText from './CustomText';
import { Colors } from '@/constants/Colors';

interface ICustomModal {
  show: boolean;
  title?: string;
  children: React.ReactNode;
  setShowModal: (show: boolean) => void;
}

const CustomModal = ({show, title, children, setShowModal}: ICustomModal) => {
  const closeModal = () => setShowModal(!show);

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