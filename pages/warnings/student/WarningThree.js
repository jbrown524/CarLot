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

export default function Warning3Screen({ navigation }) {
  return (
    <SafeAreaView style={styles.warningThree}>
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
        WARNING #3
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
          // top: 200,
        }}
      >
        Issue the <Text style={{ color: "white" }}>STA/UCM</Text> student their{" "}
        <Text style={{ color: "white" }}>FINAL</Text> warning slip. Student has
        parked in the <Text style={{ color: "white" }}>incorrect spot.</Text>{" "}
        Upon further transgressions action against the{" "}
        <Text style={{ color: "white" }}>car or student</Text> may be required.
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

// export default Warning3Screen;
const styles = StyleSheet.create({
  warning2Image: {
    color: "black",
    position: "absolute",
    top: 100,
  },

  warningThree: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#ff6666",
  },
});
