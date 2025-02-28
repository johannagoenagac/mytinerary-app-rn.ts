import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        setIsAuthenticated(!!userData); 
      } catch (error) {
        console.error("Error checking authentication status:", error);
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, []);


  if (isAuthenticated === null) {
    return null;
  }

 
  if (isAuthenticated) {
    return <Redirect href="/home" />;
  } else {
    return <Redirect href="/auth/login" />;
  }
}
