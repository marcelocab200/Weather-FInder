import { StatusBar } from 'expo-status-bar';
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { useState, useEffect } from 'react';

import Api from './src/services/api';

import * as Location from 'expo-location'
import { API_KEY } from '@env'

console.log(API_KEY)

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

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

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground style={styles.background} source={require("./assets/MainScreenBackground.jpg")}>
      <StatusBar style="auto" />
      <View style={styles.searchContainer}>
        <Image source={require("./assets/SearchIcon.png")}/>
        <View>
          <Text style={{fontFamily: "Cabin", color: "rgba(255, 255, 255, 0.7)"}}>Pesquisar localidade</Text>
          <View style={{height: 1, backgroundColor: "rgba(255, 255, 255, 0.4)"}}></View>
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
    flexDirection: "row"
  }
});
