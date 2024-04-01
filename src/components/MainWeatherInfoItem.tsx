import {
  View,
  Image,
  Text,
  StyleSheet
} from "react-native";

import MainWeatherInfoProps from "../types/MainWeatherInfoItem";

export default function MainWeatherInfoItem(props: MainWeatherInfoProps) {
  return (
    <View style={styles.box}>
      <Image source={props.icon} style={styles.icon} resizeMode="contain" />
      <Text style={styles.valueText}>{props.value}</Text>
      <Text style={styles.measureText}> {props.measure}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 30,
    marginRight: 8,
  },
  valueText: {
    fontFamily: "Cabin-Regular",
    color: "white",
    fontSize: 16,
  },
  measureText: {
    fontFamily: "Cabin-Regular",
    color: "white",
    fontSize: 10,
    height: 19,
    textAlignVertical: "bottom",
  },
});
