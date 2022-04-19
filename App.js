import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  Platform,
} from "react-native";
import React, { useState } from "react";

import IonIcon from "react-native-vector-icons/Ionicons";
import AntIcon from "react-native-vector-icons/AntDesign";
import ComIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add"
          component={AddScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <IonIcon name="car" size={50} style={styles.carImage} />
      <Text style={styles.carText}>Empty lot</Text>
      <AntIcon
        style={styles.circleIcon}
        onPress={() => {
          navigation.navigate("Add");
        }}
        name="pluscircleo"
        size={25}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

function AddScreen({ navigation }) {
  const [text, setText] = useState("");

  const formatUserName = (textValue) => {
    setText({ userName: textValue.toUpperCase() });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.container,
          {
            flexDirection: "row",
          },
        ]}
      >
        <ComIcon
          style={styles.inputIcon}
          name="card-bulleted-outline"
          size={20}
        />
        <TextInput
          style={styles.plateInput}
          placeholderTextColor="#FFFF"
          keyboardType={Platform.OS === "ios" ? "default" : "visible-password"}
          placeholder="123 456"
          onChangeText={(newText) => formatUserName(newText)}
          defaultValue={text}
        />
      </View>

      <Text
        style={{
          color: "#94D1BE",
          fontSize: 20,
          position: "absolute",
          top: 290,
          // fontWeight: "bold",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Car Information
      </Text>

      <AntIcon
        style={styles.backArrow}
        onPress={() => navigation.navigate("Home")}
        name="arrowleft"
        size={20}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3B413C",
    alignItems: "center",
    justifyContent: "center",
  },
  carText: {
    opacity: 0.5,
    paddingTop: 10,
    color: "white",
    fontStyle: "italic",
    // fontFamily: "arial",
    fontSize: 13,
  },
  carImage: {
    opacity: 0.5,
    color: "#94D1BE",
  },

  circleIcon: {
    position: "absolute",
    color: "#94D1BE",
    bottom: 20,
  },

  backArrow: {
    top: 30,
    left: 15,
    position: "absolute",
    color: "#94D1BE",
  },

  plateInput: {
    height: 40,
    textAlign: "center",
    borderColor: "white",
    borderWidth: 1,
    color: "#94D1BE",
    borderRadius: 5,
    // position: "absolute",
    // top: 150,
  },
  inputIcon: {
    color: "#94D1BE",
    padding: 10,
  },
});
