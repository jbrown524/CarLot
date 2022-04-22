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

export default function StaffWarning1Screen({ navigation }) {
  return (
    <SafeAreaView style={styles.warningOne}>
      {/* <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          Issue:
        </Text> */}
      <IonIcon
        name="md-warning-outline"
        size={150}
        style={styles.warningImage}
      />
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: 40,
          // position: "absolute",
          // top: 100,
          paddingBottom: 30,
        }}
      >
        WARNING #1
      </Text>

      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: 17,
          // position: "absolute",
          flexWrap: "wrap",
          width: 280,
          paddingLeft: 18,
          // top: 200,
        }}
      >
        Issue the <Text style={{ color: "#8dc9d9" }}>STAFF</Text> member their{" "}
        <Text style={{ color: "#8dc9d9" }}>first</Text> warning slip. The staff
        member has parked in the{" "}
        <Text style={{ color: "#8dc9d9" }}>incorrect spot.</Text> Upon further
        transgressions the severity of the warning will be
        <Text style={{ color: "#8dc9d9" }}> increased.</Text>
      </Text>
      <Pressable
        style={{
          position: "absolute",
          bottom: 50,
          borderRadius: 10,
          backgroundColor: "#8dc9d9",
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

const styles = StyleSheet.create({
  warningOne: {
    flex: 1,
    backgroundColor: "#ccecf4",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  warningImage: {
    color: "white",
    position: "absolute",
    top: 100,
  },
});

// Warning1Screen;
