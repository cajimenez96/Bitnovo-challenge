import React, { useMemo, useState } from 'react';
import { DimensionValue, Pressable, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Icon, TextInput } from 'react-native-paper';
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import { shareButtonIcon } from '@/constants/Images';
import { Colors } from '@/constants/Colors';
import CustomModal from './CustomModal';
import CustomSearchbar from './CustomSearchbar';
import { Countries } from '@/constants/Countries';
import ItemList from './ItemList';

interface IShareButton {
  type: 'link' | 'email' | 'whatsapp' | 'others';
  title: string;
  width?: DimensionValue;
  placeholder?: string;
  value?: string;
  loading?: boolean;
  setValue?: (state: string) => void;
  handleClick: (value?: string) => void;
}

const ShareButton = ({
  type,
  title,
  width = '100%',
  placeholder,
  value,
  loading = false,
  handleClick,
  setValue,
}: IShareButton) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [listCountries, setListCountries] = useState(Countries);
  const [codCountry, setCodCountry] = useState('+34');

  const handleClickButton = () => {
    if (type !== 'link' && type !== 'others') {
      setIsEditing(true);
      return;
    }
    handleClick();
  };

  const changeCountry = (name: string, code: string) => {
    setCodCountry(code)
    setShowModal(false);
  }

  const sendRequest = () => {
    handleClick(codCountry+value)
  }

  const CustomInput = useMemo(() => {
    
    return (
      <View style={styles.inputContent}>
        
        {type === 'whatsapp' && (
          <CustomText color={Colors.blue} onPress={() => setShowModal(true)}>
            {codCountry}
          </CustomText>
        )}
        
        <TextInput
          keyboardType={type === 'email' ? 'email-address' : 'number-pad'}
          placeholder={placeholder}
          value={value}
          style={styles.inputStyle}
          onBlur={() => value?.length === 0 && setIsEditing(false)}
          onChangeText={(text: string) => setValue && setValue(text)}
        />
        
        <CustomButton
          handleClick={sendRequest}
          style={styles.sendButton}
        >
          <CustomText weight='700' size={12} color={Colors.white}>
            Enviar
          </CustomText>
        </CustomButton>
      </View>
    );
  }, [value, codCountry]);

  return (
    <View style={{width: width}}>
      <Pressable style={styles.btnContainer} onPress={handleClickButton} disabled={loading}>
        <View style={styles.iconContainer}>
          <Icon source={shareButtonIcon[type]} size={20} />
        </View>
        
        {!isEditing ? (
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <CustomText
              color={Colors.blue}
              style={{flexShrink: 1, width: '85%'}}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {title}
            </CustomText>
            {loading && <ActivityIndicator animating={true} color={Colors.input} />}
          </View>
        ) : (
          CustomInput
        )}

      </Pressable>

      <CustomModal
        title='Seleccionar país'
        show={showModal}
        setShowModal={setShowModal}
      >
        <View style={styles.bodyContainer}>
          <CustomSearchbar
            data={Countries}
            setFiltered={setListCountries}
          />
          <View style={styles.countriesStyle}>
            {listCountries.map((c, index) => (
              <ItemList
                key={index}
                flag={c.name}
                code={c.code}
                name={c.code}
                text={c.text}
                check={c.code === codCountry}
                handleClick={changeCountry}
              />
            ))}
          </View>
        </View>
      </CustomModal>

    </View>
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
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    flex: 1
  },
  inputStyle: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.textGrey,
    marginRight: 0,
    paddingRight: 0,
    flex: 1
  },
  sendButton: {
    width: 53,
    height: 24,
  },
  phoneContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  countriesStyle: {
    marginTop: '5%',
    gap: 20,
    padding: 10
  }
});