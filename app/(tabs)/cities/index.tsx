import { View, FlatList, StyleSheet } from "react-native";
import CityCard from "../../../src/components/CityCard"; // Ajusta la ruta según tu estructura


const cities = [
  { name: "New York", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDYwODZ8MHwxfHNlYXJjaHw0fHxjaXR5fGVufDB8fHx8MTczODg0NDk5OXww&ixlib=rb-4.0.3&q=80&w=400" },
  { name: "Londres", image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDYwODZ8MHwxfHNlYXJjaHw1fHxjaXR5fGVufDB8fHx8MTczODg0NDk5OXww&ixlib=rb-4.0.3&q=80&w=400" },
  { name: "Buenos Aires", image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDYwODZ8MHwxfHNlYXJjaHwzfHxjaXR5fGVufDB8fHx8MTczODg0NDk5OXww&ixlib=rb-4.0.3&q=80&w=400" },
];

const Cities = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={cities}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <CityCard city={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  list: {
    alignItems: "center",
  },
});

export default Cities;
