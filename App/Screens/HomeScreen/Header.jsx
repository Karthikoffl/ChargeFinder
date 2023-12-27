import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../utils/Colors";

export default function Header() {
  const { user } = useUser();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
      }}
    >
      <Image
        source={{ uri: user?.imageUrl }}
        style={{ width: 45, height: 45, borderRadius: 99 }}
        resizeMode="contain"
      />
      <Image
        source={require("../../../assets/images/logo.png")}
        style={{ width: 200, height: 45 }}
        resizeMode="contain"
      />
      <FontAwesome name="filter" size={26} color="black" />
    </View>
  );
}
