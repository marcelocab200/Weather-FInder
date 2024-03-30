import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
  FlatList,
  Platform,
} from "react-native";

import { useState, useEffect } from "react";

import { useFonts } from "expo-font";

import { StatusBar as StatusBarExpo } from "expo-status-bar";

import Api from "./src/services/api";

import { API_KEY } from "@env";

import { AxiosResponse } from "axios";

import iconsCodeToPath from "./src/utilities/iconsCodeToPath";

import MainWeatherInfoItem from "./src/components/MainWeatherInfoItem";
import SearchLocation from "./src/components/SearchLocation";
import PeriodicItemCard from "./src/components/PeriodicInfoCard";

import { MainWeatherInfoProps } from "./src/components/MainWeatherInfoItem";

const { width, height } = Dimensions.get("window");
const vw = width / 100;
const vh = height / 100;

const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

export default function App() {
  const [location, setLocation] = useState<string>("");
  const [locationInput, setLocationInput] = useState<string>("");
  const [weatherInfo, setWeatherInfo] = useState<AxiosResponse | null>(null);
  const [filteredTodayData, setFilteredTodayData] = useState<any>(null);

  const mainWeatherInfoData: Array<MainWeatherInfoProps> = [
    {
      icon: require("./assets/MinTempIcon.png"),
      value: weatherInfo?.data.forecast.forecastday[0].day.mintemp_c.toFixed(0),
      measure: "ºC",
    },
    {
      icon: require("./assets/MaxTempIcon.png"),
      value: weatherInfo?.data.forecast.forecastday[0].day.maxtemp_c.toFixed(0),
      measure: "ºC",
    },
    {
      icon: require("./assets/UmidityIcon.png"),
      value: weatherInfo?.data.current.precip_mm.toFixed(0),
      measure: "mm",
    },
    {
      icon: require("./assets/WindIcon.png"),
      value: weatherInfo?.data.current.wind_kph.toFixed(0),
      measure: "km/h",
    },
  ];

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

            if (currentLocalHours === 23 || hours > currentLocalHours)
              return item;
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
              q: locationInput, // Query de requisição que leva em consideração a localidade pesquisada pelo usuário
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

  return (
    <SafeAreaView style={styles.fullScreen}>
      <KeyboardAvoidingView
        style={styles.fullScreen}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -250}
      >
        <ImageBackground
          style={styles.background}
          source={require("./assets/MainScreenBackground.jpg")}
        >
          <StatusBarExpo style={"light"} />

          <View style={styles.topSection}>
            <SearchLocation
              onChangeText={(text) => setLocationInput(text)}
              onSubmitEditing={() => setLocation(locationInput)}
            />

            <View style={styles.location}>
              <Text style={styles.locationCityText}>
                {weatherInfo?.data.location.name},{" "}
              </Text>
              <Text style={styles.locationRegionText}>
                {weatherInfo?.data.location.region}
              </Text>
            </View>

            <View style={styles.mainBox}>
              <View style={styles.mainContainer}>
                <View style={styles.mainImageContainer}>
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
                    style={styles.mainImage}
                  />
                </View>
                <Text style={styles.mainBoxText}>
                  {weatherInfo?.data.current.temp_c.toFixed(0)}
                  {"ºC"}
                </Text>
              </View>
              <View style={styles.mainWeatherInfoBox}>
                {mainWeatherInfoData.map((item, index) => (
                  <MainWeatherInfoItem
                    key={index}
                    icon={item.icon}
                    value={item.value}
                    measure={item.measure}
                  />
                ))}
              </View>
            </View>
          </View>

          <View style={styles.bottomSection}>
            <View style={styles.periodInfo}>
              <Text style={styles.periodText}>
                {new Date(weatherInfo?.data.location.localtime).getHours() !==
                23
                  ? "Hoje"
                  : "Amanhã"}
              </Text>
              <View style={styles.periodLine} />

              <FlatList
                data={filteredTodayData} // Dados provenientes da lista de informacoes hora a hora da API referente ao dia atual
                keyExtractor={(item) => item?.time} // Identificador se trata do time vide a data e horario serem unicos a cada item
                style={styles.periodContainer}
                contentContainerStyle={styles.periodContent}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                renderItem={({ item }) => {
                  let hours = new Date(item.time).getHours();

                  return (
                    <PeriodicItemCard
                      hours={hours}
                      value={item?.temp_c.toFixed(0)}
                      icon={
                        item.is_day == 1
                          ? iconsCodeToPath.day[item.condition.code]
                          : iconsCodeToPath.night[item.condition.code]
                      }
                      periodicity="today"
                    />
                  );
                }}
              />
            </View>

            <View style={styles.periodInfo}>
              <Text style={styles.periodText}>Semana</Text>
              <View style={styles.periodLine} />

              <FlatList
                data={weatherInfo?.data.forecast.forecastday} // Dados provenientes da lista de informacoes dos proximos 7 dias da API
                keyExtractor={(item) => item.date} // Identificador se trata da data vide ser unica a cada item
                style={styles.periodContainer}
                contentContainerStyle={styles.periodContent}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                renderItem={({ item }) => {
                  let dayOfWeek = new Date(item.date).getDay();

                  return (
                    <PeriodicItemCard
                      dayOfWeek={days[dayOfWeek]}
                      value={{
                        maxValue: item.day.maxtemp_c.toFixed(0),
                        minValue: item.day.mintemp_c.toFixed(0),
                      }}
                      icon={
                        item.is_day == 1
                          ? iconsCodeToPath.day[item.day.condition.code]
                          : iconsCodeToPath.night[item.day.condition.code]
                      }
                      periodicity="week"
                    />
                  );
                }}
              />
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  background: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  topSection: {
    height: 45 * vh,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
    paddingTop: 20,
    paddingBottom: 40,
  },
  location: {
    flexDirection: "row",
  },
  locationCityText: {
    fontFamily: "Cabin-Bold",
    fontSize: 15,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
  },
  locationRegionText: {
    fontFamily: "Cabin-Bold",
    fontSize: 15,
    color: "rgba(255,255,255,0.75)",
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
  },
  searchTextInput: {
    width: "100%",
    marginLeft: 5,
    fontFamily: "Cabin-Regular",
    color: "rgba(255, 255, 255, 0.7)",
  },
  searchLine: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  mainBox: {
    height: 150,
    gap: 50,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  mainImageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  mainImage: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  mainBoxText: {
    fontFamily: "Cabin-Regular",
    fontSize: 48,
    color: "white",
  },
  mainWeatherInfoBox: {
    justifyContent: "space-between",
  },
  bottomSection: {
    height: 55 * vh,
    width: "100%",
    alignItems: "center",
  },
  periodInfo: {
    width: "85%",
    marginBottom: 16,
  },
  periodText: {
    fontFamily: "Cabin-Regular",
    fontSize: 15,
    color: "rgba(255,255,255,0.9)",
    marginLeft: 8,
    marginBottom: 4,
  },
  periodLine: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginBottom: 16,
  },
  periodContainer: { 
    width: 80 * vw, 
    alignSelf: "center" 
  },
  periodContent: { 
    gap: (80 * vw - 70 * 3) / 2 // Calculo para fazer com que apareça 3 itens em tela na Flatlist de período
  },
});
