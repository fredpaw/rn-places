import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import ENV from "../env";

const MapPreview = ({ location, children, style, onPress }) => {
  let imagePreviewUrl;

  if (location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${ENV.googleApiKey}`;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.mapPreview, ...style }}
    >
      {location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapImage: {
    width: "100%",
    height: "100%",
  },
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapPreview;
