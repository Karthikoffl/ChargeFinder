import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import Colors from "../../utils/Colors";
import GlobalApi from "../../utils/GlobalApi";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

export default function PlaceItem({ place }) {
  const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";

  return (
    <View
      style={{
        width: Dimensions.get("screen").width * 0.8,
        backgroundColor: Colors.WHITE,
        margin: 5,
        borderRadius: 10,
      }}
    >
      <LinearGradient colors={["transparent", "#fffffff", "#ffffff"]}>
        <Image
          source={
            place?.photos
              ? {
                  uri:
                    PLACE_PHOTO_BASE_URL +
                    place?.photos[0]?.name +
                    "/media?key=" +
                    GlobalApi.API_KEY +
                    "&maxHeightPx=800&maxWidthPx=1200",
                }
              : require("../../../assets/images/ev-charging.png")
          }
          style={{ width: "100%", borderRadius: 10, height: 180, zIndex: -1 }}
        />
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 23, fontFamily: "outfit-medium" }}>
            {place.displayName?.text}
          </Text>
          <Text style={{ color: Colors.GRAY, fontFamily: "outfit" }}>
            {place?.shortFormattedAddress}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ marginTop: 5 }}>
              <Text
                style={{
                  fontFamily: "outfit",
                  color: Colors.GRAY,
                  fontSize: 17,
                }}
              >
                Connectors
              </Text>
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  fontSize: 20,
                  marginTop: 2,
                }}
              >
                {place?.evChargeOptions?.connectorCount} Points
              </Text>
            </View>
            <View
              style={{
                backgroundColor: Colors.PRIMARY,
                padding: 12,
                borderRadius: 6,
                paddingHorizontal: 14,
              }}
            >
              <FontAwesome
                name="location-arrow"
                size={25}
                color={Colors.WHITE}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
