import { ImageSourcePropType } from "react-native";

export interface IconPaths {
  [code: number]: ImageSourcePropType;
}

export default interface IconsByTime {
  [time: string]: IconPaths;
}