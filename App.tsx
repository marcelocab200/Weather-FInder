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
  StatusBar,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
  FlatList
} from "react-native";

import { useState, useEffect } from "react";


import { useFonts } from "expo-font";

import * as Location from "expo-location";

import { StatusBar as StatusBarExpo } from "expo-status-bar";


import Api from "./src/services/api";

import { API_KEY } from "@env";


import { AxiosError, AxiosResponse } from "axios";


const { width, height } = Dimensions.get("window");
const vw = width / 100;
const vh = height / 100;

var days = ['Dom','Seg','Ter','Qua','Qui','Sex','Sab']


export default function App() {

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [weatherInfo, setWeatherInfo] = useState<AxiosResponse | null>(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setLocation(location);

      // Faz a requisição para a Forecast API da Weather API
      try{
        const response = await Api.get('forecast.json', {
          params: {
            key: API_KEY,
            q: `${location.coords.latitude},${location.coords.longitude}`, // query de requisição que leva em consideração a latitude e longitude da localização
            days: 7,
            lang: 'pt'
          }
        })
        setWeatherInfo(response);
        console.log(response.data.forecast.forecastday[0].hour[0].time)
        console.log(new Date(response.data.location.localtime).getHours())
      }catch(error: any){
        Alert.alert("OPS! Ocorreu um erro:", error)
        console.log(error)
      }

    })();
  }, []);

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

  interface MainWeatherInfoProps {
    value: number;
    measure: "ºC" | "mm" | "km/h";
    icon: ImageSourcePropType;
  }

  function MainWeatherInfoCard(props: MainWeatherInfoProps) {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={props.icon}
          style={styles.mainWeatherInfoIcon}
          resizeMode="contain"
        />
        <Text
          style={[styles.regularFont, { fontSize: 16 }]}
        >
          {props.value}
        </Text>
        <Text
          style={[styles.regularFont, {
            fontSize: 10,
            height: 19,
            textAlignVertical: "bottom",
          }]}
        >
          {" "}
          {props.measure}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <ImageBackground
        style={styles.background}
        source={require("./assets/MainScreenBackground.jpg")}
      >
        <StatusBarExpo style={"light"} />

        <View
          style={{
            backgroundColor: "transparent",
            height: 45 * vh,
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            marginTop: StatusBar.currentHeight,
            paddingTop: 20,
            paddingBottom: 40,
          }}
        >
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

          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Cabin-Bold",
                color: "rgba(255,255,255,0.9)",
                fontSize: 15,
              }}
            >
              {weatherInfo?.data.location.name},{" "}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Cabin-Bold",
                color: "rgba(255,255,255,0.75)",
                fontSize: 15,
              }}
            >
              {weatherInfo?.data.location.region}
            </Text>
          </View>

          <View style={styles.mainBox}>
            <View style={{ backgroundColor: "transparent" }}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: 100,
                  width: 100,
                  // backgroundColor: "transparent",
                }}
              >
                <Image
                  source={require("./assets/SunnyCloud.png")}
                  style={{ left: 15, bottom: 25 }}
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
                  style={[styles.regularFont, {fontSize: 48}]}
                >
                  {weatherInfo?.data.current.temp_c}{"ºC"}
                </Text>
                {/* <Text
                  style={[styles.regularFont, {fontSize: 48}]}
                >
                  ºC
                </Text> */}
              </View>
            </View>
            <View
              style={{
                // backgroundColor: "transparent",
                justifyContent: "space-between",
              }}
            >
              <MainWeatherInfoCard
                icon={require("./assets/MinTempIcon.png")}
                value={weatherInfo?.data.forecast.forecastday[0].day.mintemp_c}
                measure={"ºC"}
              />
              <MainWeatherInfoCard
                icon={require("./assets/MaxTempIcon.png")}
                value={weatherInfo?.data.forecast.forecastday[0].day.maxtemp_c}
                measure={"ºC"}
              />
              <MainWeatherInfoCard
                icon={require("./assets/UmidityIcon.png")}
                value={weatherInfo?.data.current.precip_mm}
                measure={"mm"}
              />
              <MainWeatherInfoCard
                icon={require("./assets/WindIcon.png")}
                value={weatherInfo?.data.current.wind_kph}
                measure={"km/h"}
              />
            </View>
          </View>
        </View>

        <View
          style={{ height: 55 * vh, width: "100%", backgroundColor: "transparent", alignItems: "center" }}
        >

              <View style={{width: "85%", marginBottom: 16}}>
                <Text style={[styles.regularFont, {color: "rgba(255,255,255,0.9)", fontSize: 15, marginLeft: 8, marginBottom: 4}]}>Hoje</Text>
                <View style={{height: 1, backgroundColor: "rgba(255,255,255,0.4)", marginBottom: 16}}/>

                <FlatList 
                  data={weatherInfo?.data.forecast.forecastday[0].hour} // Dados provenientes da lista de informacoes hora a hora da API referente ao dia atual
                  keyExtractor={item => item.time} // Identificador se trata do time vide a data e horario serem unicos a cada item
                  style={{width: "95%", alignSelf: "center"}}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => 
                    {
                      let hours = new Date(item.time).getHours()
                      let currentLocalHours = new Date(weatherInfo?.data.location.localtime).getHours()

                      if (hours == 23) {
                        return;
                      }

                      if (hours > currentLocalHours) {
                        return(<View style={{backgroundColor: "transparent", width: 70, alignItems: "center", gap: 10}}>
                                <Text style={[styles.regularFont, {color: "rgba(255,255,255,0.9)", fontSize: 15}]}>{hours < 10 ? `0${hours}:00` : `${hours}:00`}</Text>
                                <View style={{height: 36, width: 36, justifyContent: "center", alignItems: "center"}}>
                                  <Image source={require("./assets/MoonCloud.png")} style={{}} />
                                </View>
                                <View style={{flexDirection: "row", gap: 10}}>
                                  <Text style={[styles.regularFont, {fontSize: 14}]}>{item.temp_c}ºC</Text>
                                  {/* <Text style={[styles.regularFont, {fontSize: 14, color: "rgba(255,255,255,0.7)"}]}>29º</Text> */}
                                </View>
                              </View>
                        )
                      }

  
                    }
                  }
                  horizontal
                />

                {/* <View style={{backgroundColor: "transparent", width: 70, alignItems: "center", gap: 10}}>
                  <Text style={[styles.regularFont, {color: "rgba(255,255,255,0.9)", fontSize: 15}]}>01:00</Text>
                  <View style={{height: 36, width: 36, justifyContent: "center", alignItems: "center"}}>
                    <Image source={require("./assets/MoonCloud.png")} style={{}} />
                  </View>
                  <View style={{flexDirection: "row", gap: 10}}>
                    <Text style={[styles.regularFont, {fontSize: 14}]}>24º</Text>
                    <Text style={[styles.regularFont, {fontSize: 14, color: "rgba(255,255,255,0.7)"}]}>29º</Text>
                  </View>
                </View> */}
            
              </View>

              <View style={{width: "85%", marginBottom: 16}}>
                <Text style={[styles.regularFont, {color: "rgba(255,255,255,0.9)", fontSize: 15, marginLeft: 8, marginBottom: 4}]}>Semana</Text>
                <View style={{height: 1, backgroundColor: "rgba(255,255,255,0.4)", marginBottom: 16}}/>

                <FlatList 
                  data={weatherInfo?.data.forecast.forecastday} // Dados provenientes da lista de informacoes dos proximos 7 dias da API 
                  keyExtractor={item => item.date} // Identificador se trata da data vide ser unica a cada item
                  style={{width: "95%", alignSelf: "center"}}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => 
                    {
                      let dayOfWeek = new Date(item.date).getDay()
                      let currentLocalDay = new Date(weatherInfo?.data.location.localtime).getDay()

                      if (dayOfWeek > currentLocalDay) {
                        return(<View style={{backgroundColor: "transparent", width: 70, alignItems: "center", gap: 10}}>
                                <Text style={[styles.regularFont, {color: "rgba(255,255,255,0.9)", fontSize: 15}]}>{days[dayOfWeek]}</Text>
                                <View style={{height: 36, width: 36, justifyContent: "center", alignItems: "center"}}>
                                  <Image source={require("./assets/MoonCloud.png")} style={{}} />
                                </View>
                                <View style={{flexDirection: "row", gap: 10}}>
                                  <Text style={[styles.regularFont, {fontSize: 14}]}>{item.day.maxtemp_c}º</Text>
                                  <Text style={[styles.regularFont, {fontSize: 14, color: "rgba(255,255,255,0.7)"}]}>{item.day.mintemp_c}º</Text>
                                </View>
                              </View>
                        )
                      }

  
                    }
                  }
                  horizontal
                />

                {/* <View style={{width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between"}}>

                <View style={{backgroundColor: "transparent", width: 70, alignItems: "center", gap: 10}}>
                  <Text style={[styles.regularFont, {color: "rgba(255,255,255,0.9)", fontSize: 15}]}>Seg</Text>
                  <View style={{height: 36, width: 36, justifyContent: "center", alignItems: "center"}}>
                    <Image source={require("./assets/MoonCloud.png")} style={{}} />
                  </View>
                  <View style={{flexDirection: "row", gap: 10}}>
                    <Text style={[styles.regularFont, {fontSize: 14}]}>24º</Text>
                    <Text style={[styles.regularFont, {fontSize: 14, color: "rgba(255,255,255,0.7)"}]}>29º</Text>
                  </View>
                </View>

                <View style={{backgroundColor: "transparent", width: 70, alignItems: "center", gap: 10}}>
                  <Text style={[styles.regularFont, {color: "rgba(255,255,255,0.9)", fontSize: 15}]}>Seg</Text>
                  <View style={{height: 36, width: 36, justifyContent: "center", alignItems: "center"}}>
                    <Image source={require("./assets/MoonCloud.png")} style={{}} />
                  </View>
                  <View style={{flexDirection: "row", gap: 10}}>
                    <Text style={[styles.regularFont, {fontSize: 14}]}>24º</Text>
                    <Text style={[styles.regularFont, {fontSize: 14, color: "rgba(255,255,255,0.7)"}]}>29º</Text>
                  </View>
                </View>

                <View style={{backgroundColor: "transparent", width: 70, alignItems: "center", gap: 10}}>
                  <Text style={[styles.regularFont, {color: "rgba(255,255,255,0.9)", fontSize: 15}]}>Seg</Text>
                  <View style={{height: 36, width: 36, justifyContent: "center", alignItems: "center"}}>
                    <Image source={require("./assets/MoonCloud.png")} style={{}} />
                  </View>
                  <View style={{flexDirection: "row", gap: 10}}>
                    <Text style={[styles.regularFont, {fontSize: 14}]}>24º</Text>
                    <Text style={[styles.regularFont, {fontSize: 14, color: "rgba(255,255,255,0.7)"}]}>29º</Text>
                  </View>
                </View>

                </View> */}
            
              </View>

        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
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
    gap: 50,
  },
  regularFont: {
    // fontSize: 48,
    fontFamily: "Cabin-Regular",
    color: "white",
  },
  boldFont: {
    // fontSize: 48,
    fontFamily: "Cabin-Bold",
    color: "white",
  },
  mainWeatherInfoIcon: { 
    width: 30, 
    marginRight: 8 
  }
});
