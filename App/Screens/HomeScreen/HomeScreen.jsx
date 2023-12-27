import { SafeAreaView, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppMapView from "./AppMapView";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { UserLocationContext } from "../../Context/UserLocationContext";
import GlobalApi from "../../utils/GlobalApi";
import PlaceListView from "./PlaceListView";
import { SelectedMarkerContext } from "../../Context/SelectedMarkerContent";

export default function HomeScreen() {
  const { location, setLocation } = useContext(UserLocationContext);
  const [selectedMarker, setSelectedMarker] = useState([]);
  const [placeList, setPlaceList] = useState([]);

  useEffect(() => {
    location && GetNearByPlace();
  }, [location]);

  const GetNearByPlace = () => {
    const data = {
      includedTypes: ["electric_vehicle_charging_station"],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: location?.latitude,
            longitude: location?.longitude,
          },
          radius: 5000.0,
        },
      },
    };
    GlobalApi.NewNearByPlace(data).then((resp) => {
      // console.log(JSON.stringify(resp.data));
      setPlaceList(resp.data?.places);
    });
  };

  return (
    <SelectedMarkerContext.Provider
      value={{ selectedMarker, setSelectedMarker }}
    >
      <SafeAreaView>
        <View
          style={{
            position: "absolute",
            zIndex: 10,
            padding: 10,
            width: "100%",
            paddingHorizontal: 20,
          }}
        >
          <Header />
          <SearchBar
            searchedLocation={(location) =>
              setLocation({ latitude: location.lat, longitude: location.lng })
            }
          />
        </View>
        {placeList && <AppMapView placeList={placeList} />}
        <View
          style={{ position: "absolute", bottom: 0, zIndex: 10, width: "100%" }}
        >
          {placeList && <PlaceListView placeList={placeList} />}
        </View>
      </SafeAreaView>
    </SelectedMarkerContext.Provider>
  );
}
