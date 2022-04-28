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
import { createStore } from "state-pool";
const Stack = createNativeStackNavigator();

const store = createStore();
store.setState("GCar", []);
// TODO
// If click on added car, add a conditional editing look to add page as well as change appending logic to home screen
store.setState("Editing", { isEditing: false, plate: "" });

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
  // const forceUpdate = useForceUpdate();
  // forceUpdate();
  if (cars.length <= 0) {
    return (
      <View styles={styles.container}>
        {/* <CarEntry cars={cars} /> */}

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
  const [cars, setCars] = store.useState("GCar");

  return (
    <SafeAreaView style={styles.container}>
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
          overflow: "hidden",
          height: "92%",
          // maxHeight: 100,

          top: 0,
        }}
      >
        <CarEntry cars={cars} navigation={navigation} />
      </View>

      <CarShow cars={cars} />
      <AntIcon
        style={styles.circleIcon}
        onPress={() => {
          // const updatedCarsArray = [
          //   ...cars,
          //   { plate: "567123", school: "UCM" },
          // ];
          // // cars.push({ plate: text.userName.length, school: selected });
          // setCars(updatedCarsArray);
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
        onPress={() => {
          // console.log(text.userName);
          if(typeof text.userName === 'undefined') {
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
              

              for(let car in cars) {
                let iterCar = cars[car];
                if(iterCar.plate === editing.plate) {
                  console.log("test: " + iterCar.plate)
                  updatedCarsArray.push({
                    plate: text.userName.toUpperCase(),
                    school: selectedValue.toUpperCase()
                  })
                  // iterCar.plate = text.userName.toUpperCase();
                  // iterCar.school = selectedValue.toUpperCase();
                  
                } else {
                  updatedCarsArray.push(iterCar);
                }
              }

              setEditing({ isEditing: false, plate: "" });

            }

            setCars(updatedCarsArray);
            navigation.navigate("w1");
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
        onPress={() =>{
          if(editing.isEditing) setEditing({isEditing: false, plate: ""});
          navigation.navigate("Home");
          
        } }
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
