import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ViewProps } from "react-native";

interface HeroProps extends ViewProps {
  title: string;
  subtitle: string;
}

const Hero = ({ title, subtitle, ...rest  }: HeroProps) => {
  return (
    <View style={styles.container}{...rest}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Explorar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#5cdca8",
    height: 200,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    marginVertical: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#5cdca8",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Hero;
