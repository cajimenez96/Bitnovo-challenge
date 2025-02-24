import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
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

export const FontWeight = {
  '400': GlobalStyles.fontItem_400,
  '500': GlobalStyles.fontItem_500,
  '600': GlobalStyles.fontItem_600,
  '700': GlobalStyles.fontItem_700
}