import { View, Text } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Colors from "../../utils/Colors";
import { Entypo } from "@expo/vector-icons";

export default function SearchBar({ searchedLocation }) {
  return (
    <View
      style={{
        marginTop: 20,
        flexDirection: "row",
        paddingHorizontal: 5,
        backgroundColor: Colors.WHITE,
        borderRadius: 6,
      }}
    >
      <Entypo
        name="location-pin"
        size={24}
        color={Colors.GRAY}
        style={{ paddingTop: 10 }}
      />
      <GooglePlacesAutocomplete
        placeholder="Search EV Charging Station"
        fetchDetails={true}
        onPress={(data, details = null) => {
          searchedLocation(details?.geometry?.location); //to get lat and long coords
        }}
        query={{
          key: "AIzaSyB9ctiAb-J9CZil_ZlpAg3ZOXpxwudHlNw", //replace places api
          language: "en",
        }}
      />
    </View>
  );
}
