import 'react-native-reanimated';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import CustomText from '@/components/CustomText';
import { Colors } from '@/constants/Colors';
import { PaperProvider } from 'react-native-paper';
import { theme } from '@/constants/GlobalStyles';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  useFonts,
  Mulish_400Regular,
  Mulish_500Medium,
  Mulish_600SemiBold,
  Mulish_700Bold,
} from '@expo-google-fonts/mulish';

SplashScreen.preventAutoHideAsync();

const CustomHeader = ({text}: {text: string}) => {
  return (
      <CustomText
        weight='700'
        color={Colors.blue}
        size={18}
        style={{marginHorizontal: 'auto'}}
      >
        {text}
      </CustomText>
  );
};

const CustomRightHeader = () => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>

    </View>
  )
};

export default function RootLayout() {
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_500Medium,
    Mulish_600SemiBold,
    Mulish_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar style="auto" />
        <Stack screenOptions={{ contentStyle: {backgroundColor: Colors.white, padding: 10} }}>
          <Stack.Screen
            name="index"
            options={{
              headerTitle: () => <CustomHeader text="Crear pago" />,
              headerRight: () => <CustomRightHeader />
            }}
          />
        </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
