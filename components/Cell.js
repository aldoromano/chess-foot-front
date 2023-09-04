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

export default function Cell({
  row,
  column,
  player,
  ballPosition,
  setBallPosition,
  setPlayerOnMove,
  setPlayerDestination,
  lastObjectMove,
  setLastObjectMove,
}) {
  let tabPlayers = player.split("-");
  let player1 = tabPlayers[0];
  let player2 = tabPlayers.length > 1 ? tabPlayers[1] : null;
  if (player) {
    console.log(
      "tabPlayers -> ",
      tabPlayers,
      " - ",
      player,
      " - ",
      player1,
      " - ",
      player2,
      " - ",
      row,
      " - ",
      column,
      " - ",
      ballPosition
    );
  }

  if (ballPosition[0] === row && ballPosition[1] === column) {
    console.log("La balle est ici : ", row, " - ", column);
  }
  return (
    <TouchableHighlight
      style={styles.cellStyle}
      underlayColor="yellow"
      onPress={() => {
        console.log("Cellule pressed : ", row, " - ", column);

        let tab = [row, column];
        if (lastObjectMove === "Player") {
          setPlayerDestination(tab);
        } else {
          setBallPosition(tab);
        }
        //Alert.alert("Un message");
      }}
    >
      <View style={styles.viewText}>
        <TouchableHighlight
          underlayColor="black"
          onPress={() => {
            console.log("Player pressed : ", player1);
            //Alert.alert("Un joueur");
            setLastObjectMove("Player");
            setPlayerOnMove(player1);
          }}
        >
          <Text
            style={player1[0] === "R" ? styles.btnRedText : styles.btnBlueText}
          >
            {player.length === 0 ? player : player1.substring(1)}
          </Text>
        </TouchableHighlight>

        {player2 ? (
          <TouchableHighlight
            style={styles.areaPlayer2}
            underlayColor="black"
            onPress={() => {
              console.log("Player   (2)pressed : ", player2);
              //Alert.alert("Un second joueur");
              setLastObjectMove("Player");

              setPlayerOnMove(player2);
            }}
          >
            <Text
              style={
                player2[0] === "R" ? styles.btnRedText : styles.btnBlueText
              }
            >
              {player2.substring(1)}
            </Text>
          </TouchableHighlight>
        ) : null}
        {ballPosition[0] === row && ballPosition[1] === column ? (
          <TouchableHighlight
            style={{
              borderRadius:
                Math.round(
                  Dimensions.get("window").width +
                    Dimensions.get("window").height
                ) / 2,
              width: Dimensions.get("window").width * 0.03,
              height: Dimensions.get("window").width * 0.03,
              backgroundColor: "black",
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
            }}
            underlayColor="#ccc"
            onPress={() => {
              setLastObjectMove("Ball");
              console.log("Ball pressed...");
            }}
          >
            <Text></Text>
          </TouchableHighlight>
        ) : null}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  btnBlueText: {
    color: "blue",
    fontSize: 15,
    fontWeight: "bold",
  },

  btnRedText: {
    color: "red",
    fontSize: 15,
    fontWeight: "bold",
  },

  viewText: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },

  cellStyle: {
    flex: 1,
    backgroundColor: "lightgreen",
    borderWidth: 1,
    borderColor: "#cfe8d5",
    height: 50,
  },

  areaPlayer2: {
    margin: 5,
  },
});
