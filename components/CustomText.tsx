import { Text, type TextProps, ColorValue, StyleSheet } from 'react-native';
import {
  useFonts,
  Mulish_400Regular,
  Mulish_500Medium,
  Mulish_600SemiBold,
  Mulish_700Bold,
} from '@expo-google-fonts/mulish';


export type ThemedTextProps = TextProps & {
  children: React.ReactNode;
  size?: number;
  color?: ColorValue | string;
  weight?: '400' | '500' | '600' | '700' ;
};

const CustomText = ({
  style,
  color,
  children,
  size = 14,
  weight = '400',
  ...rest
}: ThemedTextProps) => {
  let [fontsLoaded] = useFonts({
    Mulish_400Regular,
    Mulish_500Medium,
    Mulish_600SemiBold,
    Mulish_700Bold
  });

  const fontFamilyWeight = {
    '400': styles.fontItem_400,
    '500': styles.fontItem_500,
    '600': styles.fontItem_600,
    '700': styles.fontItem_700
  }


  if (fontsLoaded) 
    return (
      <Text
        style={[
          { 
            fontSize: size,
            color: color,
          },
          fontFamilyWeight[weight],
          style,
        ]}
        {...rest}
      >
        {children}
      </Text>
    );
}

export default CustomText;

const styles = StyleSheet.create({
  fontItem_400: {
    fontFamily: 'Mulish_400Regular',
  },
  fontItem_500: {
    fontFamily: 'Mulish_500Medium',
  },
  fontItem_600: {
    fontFamily: 'Mulish_600SemiBold',
  },
  fontItem_700: {
    fontFamily: 'Mulish_700Bold',
  },
});
