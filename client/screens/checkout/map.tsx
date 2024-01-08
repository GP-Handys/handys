import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Region } from "react-native-maps";
import COLORS from "../../common/colors";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../../components/navigation/NavigationStack";

interface LocationObject {
  coords: {
    latitude: number;
    longitude: number;
  };
  location: {
    governorate: any;
    street: any;
  };
}

export default function Map({ route }: any) {
  const { totalAmount } = route.params;

  const [location, setLocation] = useState<LocationObject | any>(null);
  const [errorMsg, setErrorMsg] = useState<any | null>(null);
  const navigation = useNavigation<StackProps["navigation"]>();

  const fetchAddress = async (latitude: number, longitude: number) => {
    const apiKey = "AIzaSyCxob-cVDq_N7Ct1DfMHjAW1v7mM5kelyU";

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

      if (data.status === "OK") {
        let governorate = null;
        let street = null;

        for (const result of data.results) {
          for (const component of result.address_components) {
            if (component.types.includes("administrative_area_level_1")) {
              governorate = component.long_name;
            }
            if (component.types.includes("route")) {
              street = component.long_name;
            }
          }
        }

        return { governorate, street };
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error fetching geocoding data:", error);
      return null;
    }
  };

  const handleConfirmPress = async () => {
    if (location && location.coords) {
      const addressData = await fetchAddress(
        location.coords.latitude,
        location.coords.longitude
      );

      if (addressData) {
        navigation.navigate("AddressScreen", {
          governorate: addressData.governorate,
          street: addressData.street,
          totalAmount: totalAmount
        });
      } else {
        console.log("Failed to fetch address data");
      }
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
            provider="google"
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
        <TouchableOpacity
          style={styles.confirmPressable}
          onPress={handleConfirmPress}
        >
          <Text style={styles.confirm}>Confirm</Text>
        </TouchableOpacity>
        <View style={styles.bar}></View>
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
    alignItems: "center"
  },
  bar: {
    height: 20,
    backgroundColor: COLORS.commonBackground,
    width: "100%"
  }
});
