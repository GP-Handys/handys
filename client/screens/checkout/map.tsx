import React, { useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import * as Location from "expo-location";
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

  const fetchAddress = async (latitude: number, longitude: number) => {
    const apiKey = "AIzaSyCxob-cVDq_N7Ct1DfMHjAW1v7mM5kelyU"; // Replace with your API key

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch geocoding data: ${response.statusText}`
        );
      }

      const data = await response.json();

      console.log("Geocoding API Response:", data);

      if (data.status === "OK") {
        const results = data.results;
        if (results && results.length > 0) {
          let Governorate = "";
          let street = "";

          // Loop through address components to extract Governorate and street
          for (const result of results) {
            for (const component of result.address_components) {
              if (component.types.includes("administrative_area_level_1")) {
                Governorate = component.long_name;
              }
              if (component.types.includes("route")) {
                street = component.long_name;
              }
            }
          }

          const formattedResponse = `Governorate: ${Governorate}\nStreet: ${street}`;
          console.log(formattedResponse);

          return { Governorate, street, formattedResponse };
        } else {
          console.log("No results found");
          return null;
        }
      } else {
        console.log("Geocoding failed due to:", data.status);
        return null;
      }
    } catch (error) {
      console.log("Error fetching geocoding data:", error);
      return null;
    }
  };

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
        console.log(locationData);

        if (locationData && locationData.coords) {
          await fetchAddress(
            locationData.coords.latitude,
            locationData.coords.longitude
          );
        }
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
    width: "100%",
    backgroundColor: COLORS.CTAButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    height: 50
  },
  footer: {
    justifyContent: "center",
    backgroundColor: COLORS.commonBackground,
    alignItems: "center"
  }
});
