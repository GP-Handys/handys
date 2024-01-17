import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import COLORS from "../../common/colors";

type LocationType = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

export default function MapScreen() {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [isFetchingAddress, setIsFetchingAddress] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == "granted") {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        setIsFetchingAddress(false);
      }
    })();
  }, []);

  if (isFetchingAddress) {
    return (
      <View style={styles.loadingPage}>
        <ActivityIndicator size={"small"} color={COLORS.normalText} />
      </View>
    );
  } else {
    return (
      <View>
        {location ? (
          <View style={styles.mapContainer}>
            <MapView
              provider="google"
              scrollEnabled={false}
              zoomEnabled={false}
              rotateEnabled={false}
              pitchEnabled={false}
              showsUserLocation={false}
              showsMyLocationButton={false}
              style={styles.map}
              region={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            >
              <Marker
                draggable={false}
                onPress={() => {}}
                onCalloutPress={() => {}}
                stopPropagation={false}
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
              />
            </MapView>
          </View>
        ) : (
          <View style={styles.map}></View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    marginTop: 20,
    marginHorizontal: "5%",
    borderRadius: 7.5,
    overflow: "hidden",
  },
  map: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.15,
  },
  loadingPage: {
    backgroundColor: COLORS.commonBackground,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
});
