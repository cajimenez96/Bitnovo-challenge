import { SafeAreaView, Modal, StyleSheet, View, Dimensions, DimensionValue } from 'react-native';
import React from 'react';
import { LeftButton } from './Header';
import CustomText from './CustomText';
import { Colors } from '@/constants/Colors';

interface ICustomModal {
  show: boolean;
  title?: string;
  back?: boolean;
  customHeight?: DimensionValue;
  children: React.ReactNode;
  setShowModal: (show: boolean) => void;
}

const CustomModal = ({show, title, children, back = true, customHeight = '100%', setShowModal}: ICustomModal) => {
  const closeModal = () => setShowModal(!show);

  return (
    <Modal
      visible={show}
      transparent={true}
      animationType={"slide"}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, {height: customHeight}]}>
          <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
              {back && <LeftButton handleClick={closeModal} />}
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
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  )
}

export default CustomModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.bgModal,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    paddingTop: '5%',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 20,
    alignItems: 'center',
  }
});