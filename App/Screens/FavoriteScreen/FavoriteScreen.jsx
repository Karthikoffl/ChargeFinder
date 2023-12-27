import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../utils/Colors";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../utils/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import PlaceItem from "../HomeScreen/PlaceItem";

export default function FavoriteScreen() {
  const { user } = useUser();
  const [favList, setFavList] = useState([]);
  const [loading, setLoading] = useState(false);

  //Get Data from Firestore
  const db = getFirestore(app);

  useEffect(() => {
    user && getFav();
  }, [user]);

  const getFav = async () => {
    setLoading(true);
    setFavList([]); //Updates Current FavList state to change icon state
    const q = query(
      collection(db, "ev-fav-place"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setFavList((favList) => [...favList, doc.data()]);
      setLoading(false);
    });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text style={{ fontFamily: "outfit-medium", padding: 10, fontSize: 30 }}>
        My Favorite <Text style={{ color: Colors.PRIMARY }}>Places</Text>
      </Text>
      {!favList ? (
        <View
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
          <Text style={{ fontFamily: "outfit", marginTop: 5 }}>Loading...</Text>
        </View>
      ) : null}
      <FlatList
        data={favList}
        style={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
        onRefresh={() => getFav()}
        refreshing={loading}
        renderItem={({ item, index }) => (
          <PlaceItem
            key={index}
            place={item.place}
            isFav={true}
            markedFav={() => getFav()}
          />
        )}
      />
    </SafeAreaView>
  );
}
