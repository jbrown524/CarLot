/**
 * CARLOT 2022
 * Program designed to increase the ease of tracking cars at STA
 */

// React
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Platform,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
// Icons
import IonIcon from "react-native-vector-icons/Ionicons";
import AntIcon from "react-native-vector-icons/AntDesign";
import ComIcon from "react-native-vector-icons/MaterialCommunityIcons";
// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Picker
import { Picker } from "@react-native-picker/picker";

// student warnings
import Warning1Screen from "./pages/warnings/student/WarningOne";
import Warning2Screen from "./pages/warnings/student/WarningTwo";
import Warning3Screen from "./pages/warnings/student/WarningThree";
// staff warnings
import StaffWarning1Screen from "./pages/warnings/staff/StaffWarningOne";
import StaffWarning2Screen from "./pages/warnings/staff/StaffWarningTwo";
import StaffWarning3Screen from "./pages/warnings/staff/StaffWarningThree";
//force
import useForceUpdate from "use-force-update";

const Stack = createNativeStackNavigator();

let cars = [
  // { plate: "123 456", school: "UCM" },
  // { plate: "456 890", school: "STA" },
];

const CarEntry = ({ cars }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        position: "absolute",
        // borderWidth: 1,
        // borderColor: "white",
        // borderRadius: 20,
        // width: 350,
        // height: 700,
        // paddingTop: 20,
        width: "100%",
        alignItems: "center",
        top: 85,
      }}
    >
      {cars.map((car) => {
        return (
          <Pressable
            style={{
              backgroundColor: "black",
              padding: 10,
              marginBottom: 15,
              borderWidth: 1,
              borderColor: "#94D1BE",
              width: "100%",
            }}
            onPress={() => {
              alert(car.plate);
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>
              {" "}
              <Text style={{ fontWeight: "bold" }}>PLATE:</Text> {car.plate} ||
              || <Text style={{ fontWeight: "bold" }}>SCHOOL:</Text>
              {car.school}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const CarShow = ({ cars }) => {
  const forceUpdate = useForceUpdate();
  forceUpdate();
  if (cars.length <= 0) {
    return (
      <View styles={styles.container}>
        <CarEntry cars={cars} />

        <IonIcon name="car" size={50} style={styles.carImage} />

        <Text style={styles.carText}>Empty lot</Text>
      </View>
    );
  } else {
    return <IonIcon style={{ position: "absolute", left: 50000 }}></IonIcon>;
  }
};

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
        <Stack.Screen
          name="w1"
          component={Warning1Screen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="w2"
          component={Warning2Screen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="w3"
          component={Warning3Screen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="sw1"
          component={StaffWarning1Screen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="sw2"
          component={StaffWarning2Screen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="sw3"
          component={StaffWarning3Screen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  // this.forceUpdate();
  useForceUpdate();
  return (
    <SafeAreaView style={styles.container} on>
      <CarEntry cars={cars} />
      <CarShow cars={cars} />
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

function handleInput(text, selected, navigation) {
  console.log(text.userName);
  console.log(text.userName.length);

  if (text.userName.length <= 7 && text.userName.length > 0) {
    cars.push({ plate: text.userName.length, school: selected });
    navigation.navigate("w1");
  }
  console.log(cars);
}

function AddScreen({ navigation }) {
  const [text, setText] = useState("");
  const [selectedValue, setSelectedValue] = useState("STA");

  const formatUserName = (textValue) => {
    setText({ userName: textValue.toUpperCase() });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={false}
    >
      <View
        style={[
          styles.container,
          {
            flexDirection: "row",
            // flexWrap: "wrap",
            // height: 30,
            // width: 230,
            paddingRight: 30,
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
          maxLength={7}
        />
      </View>

      <View
        style={[
          styles.container,
          {
            flexDirection: "row",
            position: "absolute",
            bottom: 290,
            paddingRight: 30,
            height: 50,
          },
        ]}
      >
        <ComIcon style={styles.inputIcon} name="school-outline" size={20} />
        <View
          style={{
            height: 30,
            marginTop: -10,
            width: 170,
            borderColor: "white",
            borderWidth: 1,
            borderRadius: 3,
          }}
        >
          <Picker
            selectedValue={selectedValue}
            style={{
              height: 30,
              width: 160,
              marginTop: -13,
              // paddingBottom: 50,
              backgroundColor: "transparent",
              // borderColor: "white",
              // borderWidth: 1,
              // borderRadius: 3,
              color: "white",
            }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="STA" color="#94D1BE" value="sta" />
            <Picker.Item label="UCM" color="#e06a71" value="ucm" />
            <Picker.Item label="STAFF" color="#7ac1e1" value="staff" />
          </Picker>
        </View>
      </View>

      <Text
        style={{
          color: "#94D1BE",
          fontSize: 25,
          position: "absolute",
          paddingBottom: 150,
          // paddingLeft: 20,
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
          paddingLeft: 40,
          paddingRight: 40,
          // marginLeft: 40,
          // marginRight
        }}
        onPress={() => handleInput(text, selectedValue, navigation)}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
          Done
        </Text>
      </Pressable>

      <AntIcon
        style={styles.backArrow}
        onPress={() => navigation.navigate("Home")}
        name="arrowleft"
        size={20}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3B413C",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
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
    paddingLeft: 60,
    paddingRight: 60,
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
