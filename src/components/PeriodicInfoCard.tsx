import { View, Text, Image, StyleSheet, ImageSourcePropType } from "react-native";

interface WeekValues {
    maxValue: number;
    minValue: number;
}

interface PeriodicItemCardProps {
    hours?: number;
    dayOfWeek?: string;
    value: number | WeekValues;
    icon: ImageSourcePropType;
    periodicity: "today" | "week"
}

export default function PeriodicItemCard(props: PeriodicItemCardProps) {
  return (
    <View
      style={styles.container}
    >
      <Text
        style={styles.hoursText}
      >
        { props.periodicity === "today" && props.hours !== undefined ?
        (props.hours < 10 ? `0${props.hours}:00` : `${props.hours}:00`)
        : props.dayOfWeek}
      </Text>
      <View
        style={styles.iconContainer}
      >
        <Image
          source={props.icon}
          style={styles.iconImage}
        />
      </View>
      {
        props.periodicity === "today" &&
        <Text style={styles.todayValueText}>
        {props.value}ºC
      </Text>
      }
      {
        props.periodicity === "week" &&                       
        <View style={styles.weekValuesContainer}>
            <Text style={styles.weekMaxValueText}>
            {props.value.maxValue}º
            </Text>
            <Text
            style={styles.weekMinValueText}
            >
            {props.value.minValue}º
            </Text>
        </View>
      }

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: 70,
        alignItems: "center",
        gap: 10,
      },
    hoursText: {
        fontFamily: "Cabin-Regular",
        color: "rgba(255,255,255,0.9)", 
        fontSize: 15
    },
    iconContainer: {
        height: 36,
        width: 36,
        justifyContent: "center",
        alignItems: "center",
    },
    iconImage: {
        height: 36,
        width: 36,
        resizeMode: "contain",
    },
    todayValueText: {
        fontSize: 14,
        fontFamily: "Cabin-Regular",
        color: "white",
    },
    weekValuesContainer: { 
        flexDirection: "row", 
        gap: 8 
    },
    weekMaxValueText: {
        fontFamily: "Cabin-Regular",
        color: "white",
        fontSize: 14, 
    },
    weekMinValueText: {
        fontFamily: "Cabin-Regular",
        fontSize: 14, 
        color: "rgba(255,255,255,0.7)"
    }
});
