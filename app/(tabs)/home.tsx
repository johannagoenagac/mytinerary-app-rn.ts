import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Hero from "../../src/components/Hero";
import CarouselComponent from "../../src/components/Carousel";
import { fetchCities } from "../../src/services/api";
import { City } from "../../src/types/city";

const Home = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCities = async () => {
      const data = await fetchCities();
      setCities(data);
      setLoading(false);
    };

    loadCities();
  }, []);

  return (
    <View style={styles.container}>
      <Hero title="Mi plan de viaje" subtitle="Encuentra tu itinerario perfecto" />
      
      {loading ? (
        <ActivityIndicator size="large" color="#5cdca8" />
      ) : (
        <CarouselComponent cities={cities} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
});

export default Home;
