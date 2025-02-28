import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import { AuthProvider } from "../src/context/authProvider";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </Provider>
  );
}
