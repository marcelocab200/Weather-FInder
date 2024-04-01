import { ImageSourcePropType } from "react-native";

interface WeekValues {
    maxValue: number;
    minValue: number;
}

export default interface PeriodicItemCardProps {
    hours?: number;
    dayOfWeek?: string;
    value?: number;
    weekValues?: WeekValues;
    icon: ImageSourcePropType;
    periodicity: "today" | "week"
}