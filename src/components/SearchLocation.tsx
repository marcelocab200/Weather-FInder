import { BlurView } from "expo-blur";
import { ReactNode } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface SearchLocationProps {
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
  onFocus: () => void;
  onBlur: () => void;
  isSelected: boolean;
  autoCompleteData: Array<object>;
  children?: ReactNode;
}

const testList = [
  "Uberlândia, Minas Gerais",
  "Ribeirão Preto, São Paulo",
  "Rio de Janeiro, Rio de Janeiro",
  "Brasília, Distrito Federal",
];

export default function SearchLocation(props: SearchLocationProps) {
  return (
    <View style={styles.fullContainer}>
      <Image source={require("../../assets/SearchIcon.png")} />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={"Pesquisar localidade"}
          placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
          selectionColor={"rgba(255, 255, 255, 0.4)"}
          onChangeText={props.onChangeText}
          onSubmitEditing={props.onSubmitEditing}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        />
        <View style={styles.searchLine} />
      </View>
      {props.isSelected && (
        <View
          style={{
            flex: 1,
            width: "100%",
            position: "absolute",
            top: 40,
            zIndex: 99,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.5)",
            overflow: "hidden",
          }}
        >
          <BlurView
            experimentalBlurMethod="dimezisBlurView"
            tint={"default"}
            blurReductionFactor={2.5}
            intensity={25}
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              paddingVertical: 8,
            }}
          >
            {props.autoCompleteData &&
              props.autoCompleteData.map((item, index) => (
                <View key={index}>
                  {index !== 0 && (
                    <View
                      style={{
                        width: "90%",
                        height: 0.5,
                        backgroundColor: "rgba(255,255,255,0.3)",
                        alignSelf: "center",
                      }}
                    />
                  )}
                  <TouchableOpacity
                    style={{
                      height: 40,
                      paddingHorizontal: 24,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Cabin-Regular",
                        fontSize: 14,
                        color: "rgba(255,255,255,1)",
                      }}
                    >
                      {`${item.name}, ${item.region}`}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
          </BlurView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
  },
  searchContainer: {
    flex: 1,
    marginLeft: 4,
  },
  textInput: {
    fontFamily: "Cabin-Regular",
    color: "rgba(255, 255, 255, 0.7)",
    width: "100%",
    marginLeft: 5,
    fontSize: 14,
  },
  searchLine: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
});
