import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, ViewProps } from "react-native";
import Carousel from "react-native-reanimated-carousel";

interface City {
  name: string;
  image: string;
}

interface CarouselProps extends ViewProps {
  cities: City[];
}

const { width } = Dimensions.get("window");

const CarouselComponent = ({ cities, ...rest }: CarouselProps) => {
  return (
    <View style={styles.container}{...rest}>
      <Carousel
        loop
        width={width}
        height={250}
        autoPlay={true}
        data={cities}
        scrollAnimationDuration={1000}
        renderItem={({ item }: { item: City }) => (
          <View style={styles.carouselItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.cityName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  carouselItem: {
    alignItems: "center",
  },
  image: {
    width: width * 0.8,
    height: 200,
    borderRadius: 10,
  },
  cityName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default CarouselComponent;
