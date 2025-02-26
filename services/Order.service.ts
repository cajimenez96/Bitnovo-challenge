import axiosInstance from "./AxiosConfig";

export interface CreateOrderRequest {
  expected_output_amount: number;
  fiat: string;
  notes?: string;
  language?: string;
  email_client?: string;
  full_name?: string;
  phone_number?: string;
  nif?: string;
}

export interface CreateOrderResponse {
  identifier: string;
  web_url: string;
  address: string | null;
  tag_memo: string | null;
  input_currency: string | null;
  expected_input_amount: number | null;
  rate: number | null;
  notes: string;
  fiat: string;
  language: string;
}


export const orderCreate = async ( 
  data: CreateOrderRequest
): Promise<CreateOrderResponse> => {

  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value.toString());
    }
  });


  try {
    const response = await axiosInstance.post("/orders/", formData);
    return response.data;
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
    throw new Error("Error al crear la orden: " + error?.message);
  }
};