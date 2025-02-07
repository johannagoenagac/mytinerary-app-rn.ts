import { Text, Image, StyleSheet, TouchableOpacity, ViewProps } from "react-native";
import { useRouter } from "expo-router";

interface City {
  name: string;
  image: string;
}

interface CityCardProps extends ViewProps {
  city: City;
}

const CityCard = ({city }:CityCardProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      
      onPress={() => 
        router.push(`/tabs/cities/${city.name}`)}
    >
      <Image source={{ uri: city.image }} style={styles.image} />
      <Text style={styles.name}>{city.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
    elevation: 5,
    width: 250,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 150,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
  },
});

export default CityCard;
