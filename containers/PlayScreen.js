import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Constants from "expo-constants";

export default function () {
  const { params } = useRoute();
  let tab = [];
  for (let i = 0; i < 7; i++) {
    tab.push(<View style={styles.view} key={i}></View>);
  }
  //   console.log("params -> ", params);
  /*
  const renderRow = () => {
    return (
      <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
        <View style={{ flex: 1, alignSelf: "stretch" }} />{" "}
        <View style={{ flex: 1, alignSelf: "stretch" }} />
        <View style={{ flex: 1, alignSelf: "stretch" }} />
        <View style={{ flex: 1, alignSelf: "stretch" }} />
        <View style={{ flex: 1, alignSelf: "stretch" }} />
      </View>
    );
  };
  const data = [1, 2, 3, 4, 5];
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {data.map((datum) => {
        // This will render a row for each data element.
        return renderRow();
      })}
    </View>
  );
  */
  return tab;
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "lightgreen",
    borderWidth: 2,
    height: 100,
    // width: 200,
    width: Dimensions.get("window").width / 7,
  },

  container: {
    flexDirection: "row",
  },
});
