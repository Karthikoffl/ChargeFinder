import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../utils/Colors";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../../hooks/warmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 60,
      }}
    >
      <Image
        source={require("../../../assets/images/logo.png")}
        style={{ width: 600, height: 60 }}
        resizeMode="contain"
      />
      <Image
        source={require("../../../assets/images/ev-charging.png")}
        resizeMode="contain"
        style={{ height: 320, width: "100%", marginTop: 20 }}
      />
      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 24,
            fontFamily: "outfit-bold",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Your Ultimate EV Charging Station Finder App
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            textAlign: "center",
            marginTop: 15,
            fontSize: 17,
            color: Colors.GRAY,
          }}
        >
          Find EV charging station near you, plan trip and so much more in just
          one click
        </Text>
        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 16,
            display: "flex",
            borderRadius: 99,
            marginTop: 50,
          }}
        >
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontFamily: "outfit",
              fontSize: 17,
            }}
          >
            Login With Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
