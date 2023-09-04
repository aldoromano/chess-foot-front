import {
  Alert,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import Constants from "expo-constants";

// Composants internes
import Cell from "../components/Cell";

export default function () {
  const { params } = useRoute();
  const [playerOnMove, setPlayerOnMove] = useState("");
  const [playerDestination, setPlayerDestination] = useState([]);
  const [ballPosition, setBallPosition] = useState([1, 3]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastObjectMove, setLastObjectMove] = useState("");
  const [data, setData] = useState([
    ["", "", "", "R1", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "R4", "", "R5", "", ""],
    /*   ["R2", "", "", "", "", "", "R3"],
    ["", "", "", "R6", "", "", ""],
    ["", "R8", "", "", "", "R10", ""],
    ["R7", "", "", "R9", "", "", "R11"],

    ["B11", "", "", "B9", "", "", "B7"],
    ["", "B10", "", "", "", "B8", ""],
    ["", "", "", "B6", "", "", ""],
    ["B3", "", "", "", "", "", "B2"], */
    ["", "", "B5", "", "B4", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "B1", "", "", ""],
  ]);
  //   console.log("params -> ", params);

  // Validation
  const submit = async () => {
    console.log("submit ....");
    try {
      setIsLoading(true);
      const response = await axios.post(
        //"https://bf34-193-252-55-178.eu.ngrok.io/user/signup",
        //"https://site--happy-cow-backend--7j9qcvd6v4p4.code.run/user/signup",
        "http:localhost:4010/play",
        {
          arrayData: data,
          ballPosition: ballPosition,
        }
      );
      setData(response.data);
      setIsLoading(false);
      console.log(response.data);
    } catch (error) {
      console.log("Erreur >> ", error.message);
    }
  };
  // Copie profonde de tableau
  function deepCopy(obj) {
    if (Object.prototype.toString.call(obj) === "[object Array]") {
      var len = obj.length,
        out = new Array(len),
        i = 0;
      for (; i < len; i++) {
        out[i] = arguments.callee(obj[i]);
      }
      return out;
    }
    return obj;
  }

  // Changement de position de ball
  useEffect(() => {
    console.log("useEffect ball");
    try {
      if (lastObjectMove === "") return;
      setLastObjectMove("");
    } catch (error) {
      console.log("Erreur >> ", error.message);
    }
  }, [ballPosition]);
  // Changement des destination d'un joueur
  useEffect(() => {
    console.log("useEffect :", playerOnMove, " - ", playerDestination);
    try {
      if (!playerOnMove) return;

      setIsLoading(true);
      console.log;
      let dataNew = deepCopy(data);

      for (let i = 0; i < dataNew.length; i++) {
        for (let j = 0; j < dataNew[i].length; j++) {
          if (dataNew[i][j].includes(playerOnMove)) {
            dataNew[i][j] = dataNew[i][j].replace(playerOnMove, "");

            console.log(
              "J'ai trouvé -> ",
              dataNew[i][j],
              " - ",
              dataNew[i][j].replace(playerOnMove, "")
            );
            break;
          }
        }
      }
      dataNew[playerDestination[0]][playerDestination[1]] =
        dataNew[playerDestination[0]][playerDestination[1]].length > 0
          ? dataNew[playerDestination[0]][playerDestination[1]].concat(
              "-" + playerOnMove
            )
          : playerOnMove;

      console.log("dataNew : ", dataNew);
      setLastObjectMove("");
      setData(dataNew);

      setIsLoading(false);
    } catch (error) {
      console.log("Erreur >> ", error.message);
    }
  }, [playerDestination]);

  function Row({ column, rowNumber }) {
    return (
      <View style={styles.rowStyle}>
        {column.map((data, index) => (
          <Cell
            row={rowNumber}
            column={index}
            player={data}
            ballPosition={ballPosition}
            setBallPosition={setBallPosition}
            setPlayerOnMove={setPlayerOnMove}
            setPlayerDestination={setPlayerDestination}
            lastObjectMove={lastObjectMove}
            setLastObjectMove={setLastObjectMove}
            key={index + 10}
          />
        ))}
      </View>
    );
  }

  function Grid() {
    return isLoading ? (
      <View>
        <Text>Chargement en cours</Text>
      </View>
    ) : (
      <View style={styles.gridContainer}>
        {data.map((column, index) => (
          <Row column={column} rowNumber={index} key={index + 100} />
        ))}
        <TouchableOpacity style={styles.btn} onPress={submit}>
          <Text style={styles.textSubmit}>PLAY !</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return Grid();
}

const styles = StyleSheet.create({
  gridContainer: {
    width: Dimensions.get("window").width,
  },

  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  btn: {
    borderColor: "lightgreen",
    backgroundColor: "blue",
    borderWidth: 3,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    //margin: 40,
    borderRadius: 10,
  },

  textSubmit: {
    color: "white",
    fontWeight: "bold",
  },
});
