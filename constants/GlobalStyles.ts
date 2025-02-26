import { StyleSheet } from "react-native";
import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  colors: {
    text: "#000",
    placeholder: "#A8AFB9",
    elevation: {
      level3: "#FFFFFF",
    }
  },
};

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  padding: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
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