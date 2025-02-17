import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, TextInput } from "react-native";
import CityCard from "../../../src/components/CityCard";
import { fetchCities } from "../../../src/services/api";
import { City } from "../../../src/types/city";

const Cities = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadCities = async () => {
      const data = await fetchCities();
      setCities(data);
      setLoading(false);
    };

    loadCities();
  }, []);

  const filteredCities = cities.filter((city: City) =>
    city.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search cities..."
        value={search}
        onChangeText={setSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#5cdca8" />
      ) : (
        <FlatList
          data={filteredCities}
          keyExtractor={(item) => item._id} 
          renderItem={({ item }) => <CityCard city={item} />}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  searchInput: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  list: {
    alignItems: "center",
  },
});

export default Cities;
