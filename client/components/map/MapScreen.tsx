import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

// Define a type for the location state
type LocationType = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

export default function MapScreen() {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  return (
    <View>
      {location ? (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title={'My Location'}
              description={'This is my current location'}
            />
          </MapView>
        </View>
      ) : (
        <View style={styles.map}></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({

  mapContainer: {
    borderRadius: 15,  // Add border radius to create rounded corners
    overflow: 'hidden',  // Apply overflow hidden to clip the content
  },
  map: {
    width: Dimensions.get('window').width * 0.9,  // Set width to 80% of the screen width
    height: Dimensions.get('window').height * 0.25,  // Set height to 50% of the screen height
  },
});
