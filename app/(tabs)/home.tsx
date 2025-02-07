import { View, StyleSheet } from "react-native";
import Hero from "../../src/components/Hero";
import CarouselComponent from "../../src/components/Carousel";

const Home = () => {

    const title="Mi plan de viaje" 
    const subtitle="Encuentra tu itinerario perfecto";


  const cities = [
    { name: "New York", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDYwODZ8MHwxfHNlYXJjaHw0fHxjaXR5fGVufDB8fHx8MTczODg0NDk5OXww&ixlib=rb-4.0.3&q=80&w=400" },
    { name: "Londres", image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDYwODZ8MHwxfHNlYXJjaHw1fHxjaXR5fGVufDB8fHx8MTczODg0NDk5OXww&ixlib=rb-4.0.3&q=80&w=400" },
    { name: "Buenos Aires", image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDYwODZ8MHwxfHNlYXJjaHwzfHxjaXR5fGVufDB8fHx8MTczODg0NDk5OXww&ixlib=rb-4.0.3&q=80&w=400" },
  ];

  return (
    <View style={styles.container}>
      <Hero title={title} subtitle={subtitle} />
      <CarouselComponent cities={cities} />
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
