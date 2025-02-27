import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { CreateOrderResponse } from "../services/Order.service";

// Definimos los tipos
interface CurrencyItem {
  id: number;
  flag: string;
  abb: "EUR" | "USD" | "GBP";
  name: string;
  symbol: string;
}

interface CurrencyState {
  currencyAmount: number;
  currencyAbb: "EUR" | "USD" | "GBP";
  currencySymbol: string;
  currencyList: CurrencyItem[];
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  data: CreateOrderResponse | null;
  webUrl: string;
  error: string | null;
}

// Estado inicial
const initialState: CurrencyState = {
  currencyAmount: 0,
  currencyAbb: "EUR",
  currencySymbol: "€",
  loading: "idle",
  data: null,
  webUrl: "",
  error: null,
  currencyList: [
    { id: 1, flag: "EU", abb: "EUR", name: "Euro", symbol: "€" },
    { id: 2, flag: "GB", abb: "GBP", name: "Libra Esterlina", symbol: "£" },
    { id: 3, flag: "US", abb: "USD", name: "Dolar Estadounidense", symbol: "$" },
  ],
};

// Creamos el contexto
const CurrencyContext = createContext<{
  state: CurrencyState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Definimos las acciones
type Action =
  | { type: "SET_AMOUNT"; payload: number }
  | { type: "SET_FIAT_DATA"; payload: { abb: "EUR" | "USD" | "GBP"; symbol: string } }
  | { type: "SET_WEB_URL"; payload: string }
  | { type: "RESET_DATA" }
  | { type: "CREATE_ORDER_PENDING" }
  | { type: "CREATE_ORDER_FULFILLED"; payload: CreateOrderResponse }
  | { type: "CREATE_ORDER_REJECTED"; payload: string };

// Reducer
const currencyReducer = (state: CurrencyState, action: Action): CurrencyState => {
  switch (action.type) {
    case "SET_AMOUNT":
      return { ...state, currencyAmount: action.payload };
    case "SET_FIAT_DATA":
      return {
        ...state,
        currencyAbb: action.payload.abb,
        currencySymbol: action.payload.symbol,
      };
    case "SET_WEB_URL":
      return { ...state, webUrl: action.payload };
    case "RESET_DATA":
      return { ...state, data: null, currencyAmount: 0, webUrl: "" };
    case "CREATE_ORDER_PENDING":
      return { ...state, loading: "pending", error: null };
    case "CREATE_ORDER_FULFILLED":
      return {
        ...state,
        loading: "fulfilled",
        data: action.payload,
        webUrl: action.payload.web_url || "",
        error: null,
      };
    case "CREATE_ORDER_REJECTED":
      return {
        ...state,
        loading: "rejected",
        error: action.payload || "Hubo un error al crear la orden.",
      };
    default:
      return state;
  }
};

// Provider
const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(currencyReducer, initialState);

  return (
    <CurrencyContext.Provider value={{ state, dispatch }}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Hook personalizado para usar el contexto
const useCurrency = () => useContext(CurrencyContext);

export { CurrencyProvider, useCurrency };
