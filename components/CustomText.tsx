import { FontWeight } from '@/constants/GlobalStyles';
import { Text, type TextProps, ColorValue, StyleSheet } from 'react-native';

export type ICustomText = TextProps & {
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
}: ICustomText) => {
  return (
    <Text
      style={[
        { 
          fontSize: size,
          color: color,
        },
        FontWeight[weight],
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

export default CustomText;
