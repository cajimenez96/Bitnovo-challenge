import { useEffect } from 'react';
import 'react-native-reanimated';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Icon, PaperProvider } from 'react-native-paper';
import { theme } from '@/constants/GlobalStyles';
import { Colors } from '@/constants/Colors';
import {
  useFonts,
  Mulish_400Regular,
  Mulish_500Medium,
  Mulish_600SemiBold,
  Mulish_700Bold,
} from '@expo-google-fonts/mulish';
import Header from '@/components/Header';
import { SafeAreaView, StyleSheet } from 'react-native';
import { CurrencyProvider } from '@/context/CurrencyContext';
import WebSocketListener from '@/components/WebSocketListener';
import { Images } from '@/constants/Images';

SplashScreen.preventAutoHideAsync();

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

  const HeaderSuccess = () => (
    <SafeAreaView style={{alignItems: 'center', marginTop: 15}}>
      <Icon source={Images.bitnovoSuccess} size={88}/>
    </SafeAreaView>
  );

  return (
    <CurrencyProvider>
      <PaperProvider theme={theme}>
        <StatusBar style="dark" />
        <Stack screenOptions={{ contentStyle:  styles.container}}>
          <Stack.Screen
            name="index"
            options={{
              header: () => <Header title="Crear pago" right />,
            }} />
          <Stack.Screen
            name="shareOptions"
            options={{
              headerTitle: "",
              headerBackVisible: false
            }} />
          <Stack.Screen
            name="qrCode"
            options={{
              header: () => <Header title="" left />,
            }} />
          <Stack.Screen
            name="success"
            options={{
              header: () => <HeaderSuccess />,
            }} />
        </Stack>
      </PaperProvider>
    </CurrencyProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  }
})
