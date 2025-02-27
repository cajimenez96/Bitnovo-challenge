import { useEffect } from "react";
import { ToastAndroid } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useCurrency } from "@/context/CurrencyContext";
import { WS } from "@/utils/utils";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

const WebSocketListener = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { state, dispatch } = useCurrency(); // Usa el contexto
  const data = state.data; // Accede al estado de la orden desde el contexto

  // Status flags from WebSocket
  const completedPaymentFlag: string = "CO";
  const cancelledPaymentFlag: string = "CA";

  useEffect(() => {
    // Si la orden tiene datos, conecta al WebSocket
    if (data) {
      const url = WS + data.identifier; // URL del WebSocket
      const socket = new WebSocket(url);

      // Listeners del WebSocket
      socket.onopen = () => {
        console.log("Conexión establecida.");
      };

      socket.onmessage = (event) => {
        const jsonData = JSON.parse(event.data);
        console.log("Mensaje recibido:", jsonData);

        // Si el pago se completa, actualiza la URL en el contexto
        if (jsonData?.status === completedPaymentFlag) {
          dispatch({ type: "SET_WEB_URL", payload: data.web_url || "" });
          router.push('/success');
        }

        // Si el pago se cancela, muestra un mensaje y redirige
        if (jsonData?.status === cancelledPaymentFlag) {
          dispatch({ type: 'RESET_DATA' });
          router.push('/');
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Pago cancelado'
          })
        }
      };

      socket.onerror = (error) => {
        console.error("Error en la conexión:", error);
        dispatch({ type: "RESET_DATA" }); // Reinicia los datos en el contexto
      };

      socket.onclose = (event) => {
        console.log("Conexión cerrada:", event.reason);
        dispatch({ type: "RESET_DATA" }); // Reinicia los datos en el contexto
      };

      // Limpiar el WebSocket al desmontar el componente
      return () => {
        socket.close();
      };
    }
  }, [data, dispatch, navigation]);

  return <Toast />;
};

export default WebSocketListener;