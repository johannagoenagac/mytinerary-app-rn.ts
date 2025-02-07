import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

export default function CityDetail() {
  const { name } = useLocalSearchParams<{name: string}>();

  return (
    <>
    <Stack.Screen options={{title: name}}/>
    <View style={styles.container}>
      <Text style={styles.title}>Ciudad: {name}</Text>
    </View>
    </>
     );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

