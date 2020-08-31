import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ navigation, route }) => {
  const initialCoordinates = route.params?.initialLocation;
  const readonly = route.params?.readonly;

  const [selectedLocation, setSelectedLocation] = useState(initialCoordinates);

  const mapRegion = {
    latitude: selectedLocation ? selectedLocation.lat : 37.78,
    longitude: selectedLocation ? selectedLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (!selectedLocation || readonly) return;
        return (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={savePickedLocationHander}
          >
            <Text style={styles.headerButtonText}>Save</Text>
          </TouchableOpacity>
        );
      },
    });
  }, [selectedLocation]);

  const selectedLocationHandler = (event) => {
    if (readonly) return;
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const savePickedLocationHander = () => {
    if (!selectedLocation) {
      return;
    }

    navigation.navigate("NewPlace", { pickedLocation: selectedLocation });
  };

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectedLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
});

export default MapScreen;
