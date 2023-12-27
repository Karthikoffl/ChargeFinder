import { Image, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewStyle from "../../utils/MapViewStyle.json";
import { UserLocationContext } from "../../Context/UserLocationContext";
import Markers from "./Markers";

export default function AppMapView({ placeList }) {
  const { location, setLocation } = useContext(UserLocationContext);
  return (
    location?.latitude && (
      <SafeAreaView>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ width: "100%", height: "100%" }}
          customMapStyle={MapViewStyle}
          region={{
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0421,
          }}
        >
          {location ? (
            <Marker
              coordinate={{
                latitude: location?.latitude,
                longitude: location?.longitude,
              }}
            >
              <Image
                source={require("../../../assets/images/car-marker.png")}
                resizeMode="contain"
                style={{ height: 40, width: 40 }}
              />
            </Marker>
          ) : null}
          {placeList &&
            placeList.map((item, index) => (
              <Markers key={index} place={item} index={index} />
            ))}
        </MapView>
      </SafeAreaView>
    )
  );
}
