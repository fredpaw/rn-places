import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import PlacesListScreen from "../screens/PlacesListScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";
import Colors from "../constants/Colors";
import HeaderButton from "../components/HeaderButton";

const PlacesStack = createStackNavigator();

const PlacesNavigator = () => {
  return (
    <NavigationContainer>
      <PlacesStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : "",
          },
          headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
        }}
      >
        <PlacesStack.Screen
          name="Places"
          component={PlacesListScreen}
          options={({ navigation }) => ({
            headerTitle: "All Places",

            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Add Place"
                  iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
                  onPress={() => navigation.navigate("NewPlace")}
                />
              </HeaderButtons>
            ),
          })}
        />
        <PlacesStack.Screen
          name="PlaceDetail"
          component={PlaceDetailScreen}
          options={({ route }) => ({
            headerTitle: route.params.placeTitle,
          })}
        />
        <PlacesStack.Screen name="NewPlace" component={NewPlaceScreen} />
        <PlacesStack.Screen name="Map" component={MapScreen} />
      </PlacesStack.Navigator>
    </NavigationContainer>
  );
};

export default PlacesNavigator;
