import React, { useState } from "react";
import { View, Text, Image, Button, StyleSheet, Alert } from "react-native";
import { launchCameraAsync } from "expo-image-picker";
import { askAsync, CAMERA, CAMERA_ROLL } from "expo-permissions";

import Colors from "../constants/Colors";

const ImgPicker = ({ onImageTaken }) => {
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    const result = await askAsync(CAMERA, CAMERA_ROLL);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this feature.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.uri);
    onImageTaken(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
        <Button
          title="Take Image"
          color={Colors.primary}
          onPress={takeImageHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImgPicker;
