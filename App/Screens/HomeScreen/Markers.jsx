import { Image } from "react-native";
import React, { useContext } from "react";
import { Marker } from "react-native-maps";
import { SelectedMarkerContext } from "../../Context/SelectedMarkerContent";

export default function Markers({ place, index }) {
  const { selectedMarker, setSelectedMarker } = useContext(
    SelectedMarkerContext
  );
  return (
    place && (
      <Marker
        coordinate={{
          latitude: place?.location?.latitude,
          longitude: place?.location?.longitude,
        }}
        onPress={() => setSelectedMarker(index)}
      >
        {/* <Image
                source={require("../../../assets/images/car-marker.png")}
                resizeMode="contain"
                style={{ height: 40, width: 40 }}
              /> */}
      </Marker>
    )
  );
}
