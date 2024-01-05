import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapScreen from "../../components/map/MapScreen";

const AddressScreen = ({ route }: any) => {
  const { governorate, street } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <MapScreen />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  map: {}
});

export default AddressScreen;
