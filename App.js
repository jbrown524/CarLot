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
} from "react-native";
import React, { useState } from "react";

import IonIcon from "react-native-vector-icons/Ionicons";
import AntIcon from "react-native-vector-icons/AntDesign";
import ComIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";

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
  const [selectedValue, setSelectedValue] = useState("java");

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

      <View
        style={[
          styles.container,
          {
            flexDirection: "row",
            position: "absolute",
            bottom: 270,
          },
        ]}
      >
        <ComIcon style={styles.inputIcon} name="school-outline" size={20} />
        <Picker
          selectedValue={selectedValue}
          style={{
            height: 30,
            width: 160,
            backgroundColor: "transparent",
            borderColor: "white",
            borderWidth: 1,
            borderRadius: 3,
            color: "white",
          }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="STA" color="#94D1BE" value="sta" />
          <Picker.Item label="UCM" color="#e06a71" value="ucm" />
          <Picker.Item label="STAFF" color="#7ac1e1" value="staff" />
        </Picker>
      </View>

      <Text
        style={{
          color: "#94D1BE",
          fontSize: 20,
          position: "absolute",
          paddingBottom: 100,
          paddingLeft: 20,
          fontWeight: "bold",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white" }}>NEW</Text> CAR
      </Text>

      <Pressable
        style={{
          position: "absolute",
          bottom: 50,
          borderRadius: 10,
          backgroundColor: "#49D6AA",
          padding: 10,
          paddingLeft: 20,
          paddingRight: 20,
          marginLeft: 20,
        }}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
          Done
        </Text>
      </Pressable>

      {/* <Button
        title="Done"
        color="#58DEB4"
        style={{
          position: "absolute",
          bottom: 500,
          zIndex: 99,
          borderRadius: 10,
        }}
        onPress={)}
      /> */}

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
  schoolIcon: {
    color: "#94D1BE",
    padding: 15,
  },
});
