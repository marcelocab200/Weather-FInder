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
  FlatList,
  Platform,
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

const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

const iconsCodeToPath = {
  day: {
    1000: require("./assets/weatherIcons/finalIcons/day/113.png"),
    1003: require("./assets/weatherIcons/finalIcons/day/116.png"),
    1006: require("./assets/weatherIcons/finalIcons/day/119.png"),
    1009: require("./assets/weatherIcons/finalIcons/day/122.png"),
    1030: require("./assets/weatherIcons/finalIcons/day/143.png"),
    1063: require("./assets/weatherIcons/finalIcons/day/176.png"),
    1066: require("./assets/weatherIcons/finalIcons/day/179.png"),
    1069: require("./assets/weatherIcons/finalIcons/day/182.png"),
    1072: require("./assets/weatherIcons/finalIcons/day/185.png"),
    1087: require("./assets/weatherIcons/finalIcons/day/200.png"),
    1114: require("./assets/weatherIcons/finalIcons/day/227.png"),
    1117: require("./assets/weatherIcons/finalIcons/day/230.png"),
    1135: require("./assets/weatherIcons/finalIcons/day/248.png"),
    1147: require("./assets/weatherIcons/finalIcons/day/260.png"),
    1150: require("./assets/weatherIcons/finalIcons/day/263.png"),
    1153: require("./assets/weatherIcons/finalIcons/day/266.png"),
    1168: require("./assets/weatherIcons/finalIcons/day/281.png"),
    1171: require("./assets/weatherIcons/finalIcons/day/284.png"),
    1180: require("./assets/weatherIcons/finalIcons/day/293.png"),
    1183: require("./assets/weatherIcons/finalIcons/day/296.png"),
    1186: require("./assets/weatherIcons/finalIcons/day/299.png"),
    1189: require("./assets/weatherIcons/finalIcons/day/302.png"),
    1192: require("./assets/weatherIcons/finalIcons/day/305.png"),
    1195: require("./assets/weatherIcons/finalIcons/day/308.png"),
    1198: require("./assets/weatherIcons/finalIcons/day/311.png"),
    1201: require("./assets/weatherIcons/finalIcons/day/314.png"),
    1204: require("./assets/weatherIcons/finalIcons/day/317.png"),
    1207: require("./assets/weatherIcons/finalIcons/day/320.png"),
    1210: require("./assets/weatherIcons/finalIcons/day/323.png"),
    1213: require("./assets/weatherIcons/finalIcons/day/326.png"),
    1216: require("./assets/weatherIcons/finalIcons/day/329.png"),
    1219: require("./assets/weatherIcons/finalIcons/day/332.png"),
    1222: require("./assets/weatherIcons/finalIcons/day/335.png"),
    1225: require("./assets/weatherIcons/finalIcons/day/338.png"),
    1237: require("./assets/weatherIcons/finalIcons/day/350.png"),
    1240: require("./assets/weatherIcons/finalIcons/day/353.png"),
    1243: require("./assets/weatherIcons/finalIcons/day/356.png"),
    1246: require("./assets/weatherIcons/finalIcons/day/359.png"),
    1249: require("./assets/weatherIcons/finalIcons/day/362.png"),
    1252: require("./assets/weatherIcons/finalIcons/day/365.png"),
    1255: require("./assets/weatherIcons/finalIcons/day/368.png"),
    1258: require("./assets/weatherIcons/finalIcons/day/371.png"),
    1261: require("./assets/weatherIcons/finalIcons/day/374.png"),
    1264: require("./assets/weatherIcons/finalIcons/day/377.png"),
    1273: require("./assets/weatherIcons/finalIcons/day/386.png"),
    1276: require("./assets/weatherIcons/finalIcons/day/389.png"),
    1279: require("./assets/weatherIcons/finalIcons/day/392.png"),
    1282: require("./assets/weatherIcons/finalIcons/day/395.png"),
  },

  night: {
    1000: require("./assets/weatherIcons/finalIcons/night/113.png"),
    1003: require("./assets/weatherIcons/finalIcons/night/116.png"),
    1006: require("./assets/weatherIcons/finalIcons/night/119.png"),
    1009: require("./assets/weatherIcons/finalIcons/night/122.png"),
    1030: require("./assets/weatherIcons/finalIcons/night/143.png"),
    1063: require("./assets/weatherIcons/finalIcons/night/176.png"),
    1066: require("./assets/weatherIcons/finalIcons/night/179.png"),
    1069: require("./assets/weatherIcons/finalIcons/night/182.png"),
    1072: require("./assets/weatherIcons/finalIcons/night/185.png"),
    1087: require("./assets/weatherIcons/finalIcons/night/200.png"),
    1114: require("./assets/weatherIcons/finalIcons/night/227.png"),
    1117: require("./assets/weatherIcons/finalIcons/night/230.png"),
    1135: require("./assets/weatherIcons/finalIcons/night/248.png"),
    1147: require("./assets/weatherIcons/finalIcons/night/260.png"),
    1150: require("./assets/weatherIcons/finalIcons/night/263.png"),
    1153: require("./assets/weatherIcons/finalIcons/night/266.png"),
    1168: require("./assets/weatherIcons/finalIcons/night/281.png"),
    1171: require("./assets/weatherIcons/finalIcons/night/284.png"),
    1180: require("./assets/weatherIcons/finalIcons/night/293.png"),
    1183: require("./assets/weatherIcons/finalIcons/night/296.png"),
    1186: require("./assets/weatherIcons/finalIcons/night/299.png"),
    1189: require("./assets/weatherIcons/finalIcons/night/302.png"),
    1192: require("./assets/weatherIcons/finalIcons/night/305.png"),
    1195: require("./assets/weatherIcons/finalIcons/night/308.png"),
    1198: require("./assets/weatherIcons/finalIcons/night/311.png"),
    1201: require("./assets/weatherIcons/finalIcons/night/314.png"),
    1204: require("./assets/weatherIcons/finalIcons/night/317.png"),
    1207: require("./assets/weatherIcons/finalIcons/night/320.png"),
    1210: require("./assets/weatherIcons/finalIcons/night/323.png"),
    1213: require("./assets/weatherIcons/finalIcons/night/326.png"),
    1216: require("./assets/weatherIcons/finalIcons/night/329.png"),
    1219: require("./assets/weatherIcons/finalIcons/night/332.png"),
    1222: require("./assets/weatherIcons/finalIcons/night/335.png"),
    1225: require("./assets/weatherIcons/finalIcons/night/338.png"),
    1237: require("./assets/weatherIcons/finalIcons/night/350.png"),
    1240: require("./assets/weatherIcons/finalIcons/night/353.png"),
    1243: require("./assets/weatherIcons/finalIcons/night/356.png"),
    1246: require("./assets/weatherIcons/finalIcons/night/359.png"),
    1249: require("./assets/weatherIcons/finalIcons/night/362.png"),
    1252: require("./assets/weatherIcons/finalIcons/night/365.png"),
    1255: require("./assets/weatherIcons/finalIcons/night/368.png"),
    1258: require("./assets/weatherIcons/finalIcons/night/371.png"),
    1261: require("./assets/weatherIcons/finalIcons/night/374.png"),
    1264: require("./assets/weatherIcons/finalIcons/night/377.png"),
    1273: require("./assets/weatherIcons/finalIcons/night/386.png"),
    1276: require("./assets/weatherIcons/finalIcons/night/389.png"),
    1279: require("./assets/weatherIcons/finalIcons/night/392.png"),
    1282: require("./assets/weatherIcons/finalIcons/night/395.png"),
  },
};

export default function App() {
  const [location, setLocation] = useState<string>("");
  const [locationInput, setLocationInput] = useState<string>("");
  const [weatherInfo, setWeatherInfo] = useState<AxiosResponse | null>(null);
  const [filteredTodayData, setFilteredTodayData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      // Faz a requisição para a Forecast API da Weather API
      try {
        const response = await Api.get("forecast.json", {
          params: {
            key: API_KEY,
            q: location ? location : "auto:ip", // A query inicialmente leva em consideração o IP do dispositivo; será feita outra query com a nova localidade caso o usuário pesquise
            days: 3, // Configuração para as informações climáticas da semana, está fixada em 3 pois o plano gratuito da API fornece dados de apenas 3 dias após hoje
            lang: "pt",
          },
        });

        setWeatherInfo(response);

        // Filtra os dados para a FlatList de informações do dia de hoje, exibindo apenas os dados após o horário atual

        let currentLocalHours = new Date(
          response.data.location.localtime
        ).getHours();

        let filteredTodayData =
          response.data.forecast.forecastday[0].hour.filter((item: any) => {
            let hours = new Date(item.time).getHours();

            if (hours > currentLocalHours) return item;
          });
        setFilteredTodayData(filteredTodayData);
        console.log(filteredTodayData);
      } catch (error: any) {
        Alert.alert("OPS! Ocorreu um erro:", error);
        console.log(error);
      }
    })();
  }, [location]);

  // Auto-complete search input
  useEffect(() => {
    (async () => {
      if (locationInput !== "") {
        try {
          const response = await Api.get("search.json", {
            params: {
              key: API_KEY,
              q: locationInput, // query de requisição que leva em consideração a latitude e longitude da localização
              lang: "pt",
            },
          });
          console.log(response.data);
        } catch (error: any) {
          Alert.alert("OPS! Ocorreu um erro:", error);
          console.log(error);
        }
      }
    })();
  }, [locationInput]);

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
        <Text style={[styles.regularFont, { fontSize: 16 }]}>
          {props.value}
        </Text>
        <Text
          style={[
            styles.regularFont,
            {
              fontSize: 10,
              height: 19,
              textAlignVertical: "bottom",
            },
          ]}
        >
          {" "}
          {props.measure}
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ height: "100%", width: "100%" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -250}
    >
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
                onChangeText={(text) => setLocationInput(text)}
                onSubmitEditing={() => {
                  setLocation(locationInput);
                }}
                autoComplete="postal-address-region"
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
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: 100,
                  width: 100,
                }}
              >
                <Image
                  source={
                    weatherInfo?.data.current.is_day == 1
                      ? iconsCodeToPath.day[
                          weatherInfo?.data.current.condition.code
                        ]
                      : iconsCodeToPath.night[
                          weatherInfo?.data.current.condition.code
                        ]
                  }
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="center"
                />
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Text style={[styles.regularFont, { fontSize: 48 }]}>
                  {weatherInfo?.data.current.temp_c}
                  {"ºC"}
                </Text>
              </View>
            </View>
            <View
              style={{
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
          style={{
            height: 55 * vh,
            width: "100%",
            backgroundColor: "transparent",
            alignItems: "center",
          }}
        >
          <View style={{ width: "85%", marginBottom: 16 }}>
            <Text
              style={[
                styles.regularFont,
                {
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 15,
                  marginLeft: 8,
                  marginBottom: 4,
                },
              ]}
            >
              Hoje
            </Text>
            <View
              style={{
                height: 1,
                backgroundColor: "rgba(255,255,255,0.4)",
                marginBottom: 16,
              }}
            />

            <FlatList
              data={filteredTodayData} // Dados provenientes da lista de informacoes hora a hora da API referente ao dia atual
              keyExtractor={(item) => item?.time} // Identificador se trata do time vide a data e horario serem unicos a cada item
              style={{ width: 80 * vw, alignSelf: "center" }}
              contentContainerStyle={{ gap: (80 * vw - 70 * 3) / 2 }}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              renderItem={({ item }) => {
                let hours = new Date(item.time).getHours();

                return (
                  <View
                    style={{
                      backgroundColor: "transparent",
                      width: 70,
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Text
                      style={[
                        styles.regularFont,
                        { color: "rgba(255,255,255,0.9)", fontSize: 15 },
                      ]}
                    >
                      {hours < 10 ? `0${hours}:00` : `${hours}:00`}
                    </Text>
                    <View
                      style={{
                        height: 36,
                        width: 36,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={
                          item.is_day == 1
                            ? iconsCodeToPath.day[item.condition.code]
                            : iconsCodeToPath.night[item.condition.code]
                        }
                        style={{ height: 36, width: 36, resizeMode: "contain" }}
                      />
                    </View>
                    <Text style={[styles.regularFont, { fontSize: 14 }]}>
                      {item?.temp_c}ºC
                    </Text>
                  </View>
                );
              }}
            />
          </View>

          <View style={{ width: "85%", marginBottom: 16 }}>
            <Text
              style={[
                styles.regularFont,
                {
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 15,
                  marginLeft: 8,
                  marginBottom: 4,
                },
              ]}
            >
              Semana
            </Text>
            <View
              style={{
                height: 1,
                backgroundColor: "rgba(255,255,255,0.4)",
                marginBottom: 16,
              }}
            />

            <FlatList
              data={weatherInfo?.data.forecast.forecastday} // Dados provenientes da lista de informacoes dos proximos 7 dias da API
              keyExtractor={(item) => item.date} // Identificador se trata da data vide ser unica a cada item
              style={{ width: 80 * vw, alignSelf: "center" }}
              contentContainerStyle={{ gap: (80 * vw - 70 * 3) / 2 }}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              renderItem={({ item }) => {
                let dayOfWeek = new Date(item.date).getDay();

                return (
                  <View
                    style={{
                      backgroundColor: "transparent",
                      width: 70,
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Text
                      style={[
                        styles.regularFont,
                        { color: "rgba(255,255,255,0.9)", fontSize: 15 },
                      ]}
                    >
                      {days[dayOfWeek]}
                    </Text>
                    <View
                      style={{
                        height: 36,
                        width: 36,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={iconsCodeToPath.day[item.day.condition.code]}
                        style={{ height: 36, width: 36, resizeMode: "contain" }}
                      />
                    </View>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                      <Text style={[styles.regularFont, { fontSize: 14 }]}>
                        {item.day.maxtemp_c}º
                      </Text>
                      <Text
                        style={[
                          styles.regularFont,
                          { fontSize: 14, color: "rgba(255,255,255,0.7)" },
                        ]}
                      >
                        {item.day.mintemp_c}º
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
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
    marginRight: 8,
  },
});
