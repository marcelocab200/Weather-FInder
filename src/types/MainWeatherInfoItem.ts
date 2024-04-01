import { ImageSourcePropType } from "react-native";

export default interface MainWeatherInfoProps {
    value: number;
    measure: "ºC" | "mm" | "km/h";
    icon: ImageSourcePropType;
  }