import { View, FlatList, Dimensions } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import PlaceItem from "./PlaceItem";
import { SelectedMarkerContext } from "../../Context/SelectedMarkerContent";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../utils/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function PlaceListView({ placeList }) {
  const [favList, setFavList] = useState([]);
  //   console.log("***", placeList);
  const flatListRef = useRef(null);
  const { selectedMarker, setSelectedMarker } = useContext(
    SelectedMarkerContext
  );

  useEffect(() => {
    if (
      selectedMarker !== null &&
      selectedMarker >= 0 &&
      selectedMarker < placeList.length
    ) {
      scrollToIndex(selectedMarker);
    }
  }, [selectedMarker]);

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };

  const getItemLayout = (_, index) => ({
    length: Dimensions.get("window").width,
    offset: Dimensions.get("window").width * index,
    index,
  });

  //Get Data from Firestore
  const db = getFirestore(app);
  useEffect(() => {
    user && getFav();
  }, [user]);

  const { user } = useUser();
  const getFav = async () => {
    setFavList([]); //Updates Current FavList state to change icon state
    const q = query(
      collection(db, "ev-fav-place"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setFavList((favList) => [...favList, doc.data()]);
    });
  };

  const isFav = (place) => {
    const result = favList.find((item) => item?.place?.id == place?.id);
    console.log(result);
    return result ? true : false;
  };

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
            <PlaceItem
              place={item}
              isFav={isFav(item)}
              markedFav={() => getFav()}
            />
          </View>
        )}
      />
    </View>
  );
}
