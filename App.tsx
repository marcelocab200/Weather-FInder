import { StatusBar as StatusBarExpo } from "expo-status-bar";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  ImageSourcePropType,
  StatusBar
} from "react-native";

import { useState, useEffect } from "react";

import { useFonts } from "expo-font";

import Api from "./src/services/api";

import * as Location from "expo-location";
import { API_KEY } from "@env";

// console.log(API_KEY)

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const [fontsLoaded] = useFonts({
    "Cabin-Bold": require("./assets/fonts/Cabin-Bold.ttf"),
    "Cabin-Regular": require("./assets/fonts/Cabin-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={"rgba(0,0,0,0.7)"} />
      </View>
    );
  }

  // useEffect(() => {
  //   (async () => {

  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       // setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     console.log(location)
  //     setLocation(location);

  //     // Faz a requisição para a Realtime API da Weather API
  //     try{
  //       const response = await Api.get('/current.json', {
  //         params: {
  //           key: API_KEY,
  //           q: `${location.coords.latitude},${location.coords.longitude}`,
  //           lang: 'pt'
  //         }
  //       })
  //       console.log(JSON.stringify(response))
  //     }catch(error){
  //       console.log(error)
  //     }

  //   })();
  // }, []);

  interface MainWeatherInfoProps {
    value: number;
    measure: string;
    icon: ImageSourcePropType;
  }

  function MainWeatherInfoCard(props: MainWeatherInfoProps) {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={props.icon}
          style={{ width: 30, marginRight: 8 }}
          resizeMode="contain"
        />          
        <Text style={{fontFamily: "Cabin-Regular", color: "white", fontSize: 16, }}>{props.value}</Text>
        <Text style={{fontFamily: "Cabin-Regular", color: "white", fontSize: 10, height: 19, textAlignVertical: "bottom"}}> {props.measure}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, width: "100%" }}>
      <ImageBackground
        style={styles.background}
        source={require("./assets/MainScreenBackground.jpg")}
      >
        <StatusBarExpo style={"light"} />

        <View style={{ backgroundColor: "blue", flex: 4, justifyContent: "space-between", width: "100%", alignItems: "center", marginTop: StatusBar.currentHeight, paddingTop: 15, paddingBottom: 40 }}>

          <View style={styles.searchContainer}>
            <Image source={require("./assets/SearchIcon.png")} />
            <View style={{ flex: 1, marginLeft: 4 }}>
              <TextInput
                style={styles.searchTextInput}
                placeholder={"Pesquisar localidade"}
                placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
              />
              <View style={styles.searchLine}></View>
            </View>
          </View>

          <Text style={{textAlign: "center", fontFamily: "Cabin-Bold", color: "rgb(255,255,255)"}}>Uberlândia, Minas Gerais</Text>

          <View style={styles.mainBox}>
            <View style={{backgroundColor: "transparent"}}>
              <View style={{ alignItems: "center", justifyContent: "center", height: 100, width: 100, backgroundColor: "transparent" }}>
                <Image
                  source={require("./assets/SunnyCloud.png")}
                  style={{ left: 15, bottom: 20 }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  // width: "100%",
                  justifyContent: "center",
                  bottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 48,
                    fontFamily: "Cabin-Regular",
                    color: "white",
                  }}
                >
                  24
                </Text>
                <Text
                  style={{
                    fontSize: 48,
                    fontFamily: "Cabin-Regular",
                    color: "white",
                  }}
                >
                  ºC
                </Text>
              </View>
            </View>
            <View style={{ backgroundColor: "transparent", justifyContent: "space-between" }}>
            <MainWeatherInfoCard
              icon={require("./assets/MinTempIcon.png")}
              value={24}
              measure={"ºC"}
            />
            <MainWeatherInfoCard
              icon={require("./assets/MaxTempIcon.png")}
              value={24}
              measure={"ºC"}
            />
            <MainWeatherInfoCard
              icon={require("./assets/UmidityIcon.png")}
              value={24}
              measure={"%"}
            />
            <MainWeatherInfoCard
              icon={require("./assets/WindIcon.png")}
              value={24}
              measure={"km/h"}
            />
          </View>
          </View>

        </View>
        
        <View style={{flex: 6, width: "100%", backgroundColor: "orange"}}>

        </View>

      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // width: "100%"
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
  },
  searchTextInput: {
    fontFamily: "Cabin-Regular",
    color: "rgba(255, 255, 255, 0.7)",
    width: "100%",
    marginLeft: 5,
  },
  searchLine: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  mainBox: {
    flexDirection: "row",
    backgroundColor: "transparent",
    height: 150,
    gap: 50
  },
});
