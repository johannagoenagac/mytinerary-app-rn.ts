import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { User } from "../types/User";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const API_URL = "https://mytinerary-server.onrender.com/api/auth";

const saveUserToStorage = async (user: User) => {
  await AsyncStorage.setItem("user", JSON.stringify(user));
  await AsyncStorage.setItem("token", user.token);
};


export const loadTokenFromStorage = async () => {
  return await AsyncStorage.getItem("token");
};


export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: Omit<User, "_id" | "token">, { rejectWithValue, dispatch }) => {
    try {
      console.log("📤 Enviando datos de registro:", userData);
      const response = await axios.post(`${API_URL}/register`, userData);

      console.log("✅ Registro exitoso, respuesta completa:", response.data);

      let user = response.data.data as User;

      if (!user.token) {
        console.warn("⚠️ No se recibió un token en el registro. Haciendo login automático...");
        const loginResponse = await dispatch(loginUser({ email: userData.email, password: userData.password })).unwrap();
        return loginResponse;
      }

      await saveUserToStorage(user);
      return user;
    } catch (error: any) {
      console.error("❌ Error en el registro:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      console.log("📤 Enviando datos de login:", credentials);
      const response = await axios.post(`${API_URL}/login`, credentials);

      console.log("✅ Login exitoso, respuesta completa:", response.data);

      let user = response.data.data as User;

      if (!user.token) {
        console.error("❌ No se recibió un token en la respuesta del login");
        return rejectWithValue("Login failed: No token received");
      }

      await saveUserToStorage(user);
      return user;
    } catch (error: any) {
      console.error("❌ Error en el login:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = await loadTokenFromStorage();
      if (!token) {
        return rejectWithValue("No token found");
      }

      console.log("🔍 Validando token...");

      const response = await axios.post(`${API_URL}/token`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Token válido, usuario autenticado:", response.data.response);

      return response.data.response as User;
    } catch (error: any) {
      console.error("❌ Error validando token:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Token validation failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      AsyncStorage.removeItem("user");
      AsyncStorage.removeItem("token");
    },
    loadUserFromStorage: (state, action) => {
      state.user = action.payload;
      state.token = action.payload?.token || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload?.token || null;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload?.token || null;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(validateToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload?.token || null;
        state.loading = false;
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
