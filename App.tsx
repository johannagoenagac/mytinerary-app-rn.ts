import React from "react";
import { View, StyleSheet } from "react-native";
import Hero from "./src/components/Hero";
import CarouselComponent from "./src/components/Carousel";

const cities = [
  { name: "San Sebastian", image: "https://i.ibb.co/5WZ9PnRW/san-sebastian.jpg" },
  { name: "Londres", image: "https://i.ibb.co/SX838BkG/big-ben-londres.jpg" },
  { name: "Venecia", image: "https://i.ibb.co/PG8rDVkZ/venecia.webp" },
];

export default function App() {
  return (
    <View style={styles.container}>
      <Hero title="Mi plan de viaje" subtitle="Encuentra tu itinerario de viaje perfecto" />
      <CarouselComponent cities={cities} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
