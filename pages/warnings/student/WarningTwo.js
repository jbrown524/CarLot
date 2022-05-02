import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Platform,
  // Picker,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";

import IonIcon from "react-native-vector-icons/Ionicons";

export default function Warning2Screen({ route, navigation }) {
  return (
    <SafeAreaView style={styles.warningTwo}>
      {/* <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          Issue:
        </Text> */}
      <IonIcon
        name="md-warning-outline"
        size={150}
        style={styles.warning2Image}
      />
      <Text
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: 40,
          // position: "absolute",
          // top: 100,
          paddingBottom: 30,
        }}
      >
        WARNING #2
      </Text>

      <Text
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: 17,
          // position: "absolute",
          flexWrap: "wrap",
          width: 280,
          paddingLeft: 18,
          paddingBottom: 50,
          // top: 200,
        }}
      >
        Issue the <Text style={{ color: "#ff6666" }}>STA/UCM</Text> student
        their <Text style={{ color: "#ff6666" }}>second</Text> warning slip.
        Student has parked in the{" "}
        <Text style={{ color: "#ff6666" }}>incorrect spot.</Text> Upon further
        transgressions the severity of the warning will be
        <Text style={{ color: "#ff6666" }}> increased to its maximum.</Text>
      </Text>
      <Text
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: 14,
          // position: "absolute",
          flexWrap: "wrap",
          width: 280,
          paddingLeft: 18,
          // top: 200,
        }}
      >
        Misplaced permit: {route.params.carData.misplacedCount}
      </Text>
      <Pressable
        style={{
          position: "absolute",
          bottom: 50,
          borderRadius: 10,
          backgroundColor: "black",
          padding: 10,
          paddingLeft: 40,
          paddingRight: 40,
          // marginLeft: 40,
          // marginRight
        }}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
          OK
        </Text>
      </Pressable>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

// export default Warning2Screen;
const styles = StyleSheet.create({
  warningTwo: {
    flex: 1,
    backgroundColor: "#FDFD96",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  warning2Image: {
    color: "black",
    position: "absolute",
    top: 100,
  },
});
