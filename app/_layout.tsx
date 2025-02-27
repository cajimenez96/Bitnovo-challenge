import { useEffect } from 'react';
import 'react-native-reanimated';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
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
import { StyleSheet } from 'react-native';
import { CurrencyProvider } from '@/context/CurrencyContext';
import WebSocketListener from '@/components/WebSocketListener';

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

  return (
    <CurrencyProvider>
      <PaperProvider theme={theme}>
        <StatusBar style="auto" />
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
        </Stack>
        <WebSocketListener />
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
