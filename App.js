/**
 * CARLOT 2022
 * Program designed to increase the ease of tracking cars at STA
 * TODO configure heroku server backend | https://www.youtube.com/watch?v=OGRR79IIW7g
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
  // CheckBox,
} from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
// Icons
import IonIcon from "react-native-vector-icons/Ionicons";
import AntIcon from "react-native-vector-icons/AntDesign";
import ComIcon from "react-native-vector-icons/MaterialCommunityIcons";
// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
// Picker
import { Picker } from "@react-native-picker/picker";

// student warnings
import Warning1Screen from "./pages/warnings/student/WarningOne";
import Warning2Screen from "./pages/warnings/student/WarningTwo";
import Warning3Screen from "./pages/warnings/student/WarningThree";

import { createStore } from "state-pool";

import axios from "axios";
import { add } from "react-native-reanimated";

function handleError(e) {
  console.log(e);
}
const addCar = async (info) => {
  const url = `https://carlotbackend2.herokuapp.com/handlecar`;
  let res = await axios.post(url, info).catch(handleError);

  return res.data;
};

const Stack = createNativeStackNavigator();

const store = createStore();
store.setState("GCar", []);
store.setState("Editing", { isEditing: false, plate: "" });
store.setState("CarData", { warning: 1, misplacedAmount: "0" });

const CarEntry = ({ cars, navigation }) => {
  const [editing, setEditing] = store.useState("Editing");
  return (
    <View
      style={{
        // flexDirection: "column",

        width: "100%",
        // overflow: "scroll",
        // height: 100,

        // alignItems: "center",
        top: 55,
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
              // alert(car.plate);
              setEditing({ isEditing: true, plate: car.plate });
              navigation.navigate("Add");
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>
              {" "}
              <Text style={{ fontWeight: "bold" }}>PLATE:</Text> {car.plate} ||
              || <Text style={{ fontWeight: "bold" }}>SCHOOL: </Text>
              {car.school}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const CarShow = ({ cars }) => {
  if (cars.length <= 0) {
    return (
      <View styles={styles.container}>
        <IonIcon name="car" size={50} style={styles.carImage} />

        <Text style={styles.carText}>Empty lot</Text>
      </View>
    );
  } else {
    return <IonIcon style={{ position: "absolute", left: 50000 }}></IonIcon>;
  }
};

const EditingShow = ({ editing }) => {
  if (editing.isEditing) {
    return (
      <View
        style={{
          position: "absolute",
          top: 100,
          fontSize: 12,
        }}
      >
        <Text style={{ color: "#ff6666" }}>
          <Text style={{ fontWeight: "bold" }}> EDITING:</Text> {editing.plate}
        </Text>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  const [cars, setCars] = store.useState("GCar");

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "column",
          position: "absolute",
          width: "100%",
          alignItems: "center",
          overflow: "hidden",
          height: "92%",
          top: 0,
        }}
      >
        <CarEntry cars={cars} navigation={navigation} />
      </View>

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

function AddScreen({ navigation }) {
  const [text, setText] = useState("");
  const [selectedValue, setSelectedValue] = useState("STA");

  const [cars, setCars] = store.useState("GCar");
  const [editing, setEditing] = store.useState("Editing");

  const [isSelected, setSelection] = useState(false);

  const formatUserName = (textValue) => {
    setText({ userName: textValue.toUpperCase() });
  };
  navigation = useNavigation();

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
          defaultValue={text.userName}
          maxLength={7}
        />
      </View>

      <View
        style={[
          styles.container,
          {
            flexDirection: "row",
            position: "absolute",
            bottom: 300,
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
              backgroundColor: "transparent",
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
      <View
        style={[
          styles.checkboxContainer,
          {
            flexDirection: "row",
            position: "absolute",
            bottom: 220,
            paddingRight: 10,
            height: 50,
          },
        ]}
      >
        <Text style={styles.label}>Misplaced permit?</Text>
        <Checkbox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
      </View>
      <EditingShow editing={editing} />
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
        }}
        onPress={async () => {
          // console.log(text.userName);
          if (typeof text.userName === "undefined") {
            alert("Please input a plate number...");
            return;
          }

          const specialChars = `/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;`;

          const isSpecialCharsPresent = specialChars
            .split("")
            .some((char) => text.userName.includes(char));

          if (isSpecialCharsPresent) {
            alert("Invalid plate number...");
            return;
          }

          if (text.userName.length <= 7 && text.userName.length > 0) {
            let updatedCarsArray =
              cars.length >= 13
                ? [
                    {
                      plate: text.userName.toUpperCase(),
                      school: selectedValue.toUpperCase(),
                    },
                  ]
                : [
                    ...cars,
                    {
                      plate: text.userName.toUpperCase(),
                      school: selectedValue.toUpperCase(),
                    },
                  ];

            // setCars(updatedCarsArray);

            if (editing.isEditing) {
              updatedCarsArray = [];

              for (let car in cars) {
                let iterCar = cars[car];
                if (iterCar.plate === editing.plate) {
                  // console.log("test: " + iterCar.plate);
                  updatedCarsArray.push({
                    plate: text.userName.toUpperCase(),
                    school: selectedValue.toUpperCase(),
                  });
                  // iterCar.plate = text.userName.toUpperCase();
                  // iterCar.school = selectedValue.toUpperCase();
                } else {
                  updatedCarsArray.push(iterCar);
                }
              }
              // navigation.navigate("Home");
            }

            setCars(updatedCarsArray);

            // if(editing.isEditing)
            let truePlate = editing.isEditing
              ? editing.plate
              : text.userName.toUpperCase();

            let carData = await addCar({
              plate: truePlate,
              school: selectedValue.toUpperCase(),
              isEdit: editing.isEditing,
              misplaced: isSelected,
              editPlate: text.userName.toUpperCase(),
            });

            let warning = "w1";
            switch (carData.warningLevel) {
              case 1:
                warning = "w1";
                break;
              case 2:
                warning = "w2";
                break;
              case 3:
                warning = "w3";
                break;
              default:
                warning = "w3";
                break;
            }

            editing.isEditing
              ? navigation.navigate("Home")
              : navigation.navigate(warning, { carData });
            // console.log(carData);

            setEditing({ isEditing: false, plate: "" });

            // if()
          }
          // console.log(cars);
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
          Done
        </Text>
      </Pressable>

      <AntIcon
        style={styles.backArrow}
        onPress={() => {
          if (editing.isEditing) setEditing({ isEditing: false, plate: "" });
          navigation.navigate("Home");
        }}
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
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  label: {
    margin: 8,
    color: "white",
    // fontWeight: "bold",
    fontStyle: "italic",
    paddingTop: 5,
  },
  checkbox: {
    alignSelf: "center",
  },
});
