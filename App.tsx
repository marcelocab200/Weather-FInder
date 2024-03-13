import { StatusBar } from 'expo-status-bar';
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';

import { useState, useEffect } from 'react';

import { useFonts } from 'expo-font';

import Api from './src/services/api';

import * as Location from 'expo-location'
import { API_KEY } from '@env'

// console.log(API_KEY)

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const [fontsLoaded] = useFonts({
    "Cabin-Bold": require("./assets/fonts/Cabin-Bold.ttf"),
    "Cabin-Regular": require("./assets/fonts/Cabin-Regular.ttf")
  });

  if (!fontsLoaded) {
    return <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <ActivityIndicator color={"rgba(0,0,0,0.7)"}/>
    </View>;
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
    value: number,
    measure: string,
    icon: NodeRequire
  }

  function MainWeatherInfoCard(mainWeatherInfoProps: MainWeatherInfoProps) {

    return (
      <View style={{flexDirection: "row", justifyContent: "center"}}>
        <Image source={mainWeatherInfoProps.icon} style={{width: 30}} resizeMode="contain"/>
        <Text>{mainWeatherInfoProps.value}</Text><Text>{mainWeatherInfoProps.measure}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground style={styles.background} source={require("./assets/MainScreenBackground.jpg")}>
      <StatusBar style="auto" />

      <View style={styles.searchContainer}>
        <Image source={require("./assets/SearchIcon.png")}/>
        <View style={{flex: 1, marginLeft: 4}}>
          <TextInput style={styles.searchTextInput} placeholder={"Pesquisar localidade"} placeholderTextColor={"rgba(255, 255, 255, 0.7)"}/>
          <View style={styles.searchLine}></View>
        </View>
      </View>

      <View style={styles.mainBox}>
        <View style={{flex: 1}}>
          <View style={{alignItems: "center", justifyContent: "center"}}>
              <Image source={require("./assets/SunnyCloud.png")} style={{backgroundColor: "green"}}/>
          </View>
          <View style={{flexDirection: "row", width: "100%", justifyContent: "center", bottom: 50}}>
          <Text style={{fontSize: 48, fontFamily: "Cabin-Regular", color: "white"}}>24</Text><Text style={{fontSize: 48, fontFamily: "Cabin-Regular", color: "white"}}>ºC</Text>
          </View>
        </View>
        <View style={{flex: 1, backgroundColor: "red"}}>
          <MainWeatherInfoCard icon={require("./assets/MinTempIcon.png")} value={24} measure={"ºC"}/>
          <MainWeatherInfoCard icon={require("./assets/MaxTempIcon.png")} value={28} measure={"ºC"}/>
          <MainWeatherInfoCard icon={require("./assets/UmidityIcon.png")} value={24} measure={"%"}/>
          <MainWeatherInfoCard icon={require("./assets/WindIcon.png")} value={24} measure={"km/h"}/>
        </View>
      </View>


      </ImageBackground>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%"
  },
  searchTextInput: {
    fontFamily: "Cabin-Regular", color: "rgba(255, 255, 255, 0.7)", width: "100%", marginLeft: 5
  },
  searchLine: {
    height: 1, backgroundColor: "rgba(255, 255, 255, 0.4)"
  },
  mainBox: {
    flexDirection: "row"
  }
});
