import { View, FlatList, Dimensions } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import PlaceItem from "./PlaceItem";
import { SelectedMarkerContext } from "../../Context/SelectedMarkerContent";

export default function PlaceListView({ placeList }) {
  //   console.log("***", placeList);
  const flatListRef = useRef(null);
  const { selectedMarker, setSelectedMarker } = useContext(
    SelectedMarkerContext
  );

  useEffect(() => {
    selectedMarker && scrollToIndex(selectedMarker);
  }, [selectedMarker]);

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };

  const getItemLayout = (_, index) => ({
    length: Dimensions.get("window").width,
    offset: Dimensions.get("window").width * index,
    index,
  });

  return (
    <View>
      <FlatList
        data={placeList}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        getItemLayout={getItemLayout}
        renderItem={({ item, index }) => (
          <View key={index}>
            <PlaceItem place={item} />
          </View>
        )}
      />
    </View>
  );
}
