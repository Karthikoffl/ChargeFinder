import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ToastAndroid,
  Platform,
  Linking,
} from "react-native";
import React from "react";
import Colors from "../../utils/Colors";
import GlobalApi from "../../utils/GlobalApi";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../../utils/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function PlaceItem({ place, isFav, markedFav }) {
  const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";

  const { user } = useUser();

  const db = getFirestore(app);
  const onSetFav = async (place) => {
    await setDoc(doc(db, "ev-fav-place", place.id.toString()), {
      place: place,
      email: user?.primaryEmailAddress?.emailAddress,
    });
    markedFav();
    ToastAndroid.show("Favorite Added!", ToastAndroid.TOP); // add popup message for favorite added successfull
  };

  const onRemoveFav = async (placeId) => {
    await deleteDoc(doc(db, "ev-fav-place", placeId.toString()));
    ToastAndroid.show("Favorite Removed!", ToastAndroid.TOP); // add popup message for favorite added successfull
    markedFav();
  };

  const onDirectionClick = () => {
    const url = Platform.select({
      ios:
        "maps:" +
        place.location.latitude +
        "," +
        place?.location?.longitude +
        "?q=" +
        place?.formattedAddress,
      android:
        "geo:" +
        place.location.latitude +
        "," +
        place?.location?.longitude +
        "?q=" +
        place?.formattedAddress,
    });

    Linking.openURL(url);
  };

  return (
    <View
      style={{
        width: Dimensions.get("screen").width * 0.9,
        backgroundColor: Colors.WHITE,
        margin: 5,
        borderRadius: 10,
      }}
    >
      <LinearGradient colors={["transparent", "#fffffff", "#ffffff"]}>
        {!isFav ? (
          <Pressable
            onPress={() => onSetFav(place)}
            style={{ position: "absolute", right: 0, margin: 5 }}
          >
            <Ionicons name="heart-outline" size={30} color="white" />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => onRemoveFav(place.id)}
            style={{ position: "absolute", right: 0, margin: 5 }}
          >
            <Ionicons name="heart" size={30} color="red" />
          </Pressable>
        )}
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
            <Pressable
              onPress={() => onDirectionClick()}
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
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
