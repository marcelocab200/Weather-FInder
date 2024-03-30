import { View, Image, TextInput, StyleSheet } from "react-native";

interface SearchLocationProps {
    onChangeText: (text: string) => void;
    onSubmitEditing: () => void;
}

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
        />
        <View style={styles.searchLine}></View>
      </View>
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
        marginLeft: 4 
    },
    textInput: {
        fontFamily: "Cabin-Regular",
        color: "rgba(255, 255, 255, 0.7)",
        width: "100%",
        marginLeft: 5,
      },
    searchLine: {
        height: 1,
        backgroundColor: "rgba(255, 255, 255, 0.4)",
      },
})

