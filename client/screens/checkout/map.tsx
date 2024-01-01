import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import COLORS from "../../common/colors";

interface LocationObject {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export default function App() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      try {
        let locationData = await Location.getCurrentPositionAsync({});
        setLocation(locationData);
      } catch (error) {
        setErrorMsg("Error fetching location");
      }
    })();
  }, []);

  let mapRegion: Region | undefined = undefined;
  if (location) {
    mapRegion = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 1,
      longitudeDelta: 1
    };
  }

  return (
    <>
      <View style={styles.container}>
        {errorMsg && <Text>{errorMsg}</Text>}
        {location && (
          <MapView
            region={mapRegion}
            showsMyLocationButton={true}
            showsUserLocation={true}
            style={styles.map}
          >
            <Marker coordinate={mapRegion as any} title="My Location" />
          </MapView>
        )}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmPressable}>
          <Text style={styles.confirm}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.commonBackground,
    alignItems: "center",
    justifyContent: "center"
  },
  map: {
    width: "100%",
    height: "100%"
  },
  confirm: {
    color: "black",
    fontWeight: "500",
    fontSize: 20
  },
  confirmPressable: {
    width:"100%",
    backgroundColor: COLORS.CTAButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    height: 50,


  },
  footer: {
    justifyContent:"center",
    backgroundColor:COLORS.commonBackground,
    alignItems:"center"
  }
});
