import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import MapView from "react-native-maps";

const Map = () => {
  return (
    <View style={styles.container}>
      <MapView>
        
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default Map;
