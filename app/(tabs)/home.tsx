import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import Header from "../../src/components/Header";
import CarouselComponent from "../../src/components/Carousel";
import { fetchCities } from "../../src/services/api";
import { City } from "../../src/types/City";
import { logout } from "../../src/store/authSlice";

const Home = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const loadCities = async () => {
      const data = await fetchCities();
      setCities(data);
      setLoading(false);
    };

    loadCities();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
     

      <Header title="Mi plan de viaje" subtitle="Encuentra tu itinerario perfecto" />
      
      {loading ? (
        <ActivityIndicator size="large" color="#5cdca8" />
      ) : (
        <CarouselComponent cities={cities} />
      )}
      <View style={styles.logoutButton}>
      <TouchableOpacity onPress={handleLogout} >
        <Text style={styles.logoutText}>Salir</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
  },
  logoutButton: {
    position: "absolute",
    top: 10, 
    right: 20,
    backgroundColor: "#ff4d4d",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 0
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Home;
