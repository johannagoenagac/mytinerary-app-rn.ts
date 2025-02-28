import axios from "axios";
import { City } from "../types/City";

const API_URL = "https://mytinerary-server.onrender.com/api/cities";

export const fetchCities = async (): Promise<City[]> => {
  try {
    const response = await axios.get<{ data: City[] }>(API_URL);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error; 
  }
};
