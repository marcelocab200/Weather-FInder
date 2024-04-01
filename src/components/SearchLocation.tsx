import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { BlurView } from "expo-blur";

import { useRef } from "react";

import SearchLocationProps from "../types/SearchLocation";

export default function SearchLocation(props: SearchLocationProps) {
  const inputRef = useRef<TextInput>(null);

  // function handleItemSelection(item: any) {
  //   inputRef.current?.blur();
  //   props.onItemSelection(`${item.name}, ${item.region}`);
  // }

  return (
    <View style={styles.fullContainer}>
      <Image source={require("../../assets/SearchIcon.png")} />
      <View style={styles.searchContainer}>
        <TextInput
          ref={inputRef}
          style={styles.textInput}
          placeholder={"Pesquisar localidade"}
          placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
          selectionColor={"rgba(255, 255, 255, 0.4)"}
          value={props.inputValue}
          onChangeText={props.onChangeText}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        />
        <View style={styles.searchLine} />
      </View>
      {props.isSelected &&
        props.autoCompleteData?.length !== undefined &&
        props.autoCompleteData?.length > 0 && ( // Caso o TextInput esteja em foco e o usuário fez a pesquisa, irá renderizar a lista das localidades
          <View style={stylesAutoSearch.outViewContainer}>
            <BlurView
              experimentalBlurMethod="dimezisBlurView"
              tint={"default"}
              blurReductionFactor={2.5}
              intensity={25}
              style={stylesAutoSearch.blurView}
            >
              {props.autoCompleteData &&
                props.autoCompleteData.map((item, index) => (
                  <View key={index}>
                    {index !== 0 && <View style={stylesAutoSearch.itemBox} />}
                    <TouchableOpacity
                      style={stylesAutoSearch.itemTouchable}
                      onPress={() => {
                        inputRef.current?.blur();
                        props.onItemSelection(`${item.name}, ${item.region}`);
                      }}
                    >
                      <Text style={stylesAutoSearch.itemText}>
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
    height: 30,
  },
  searchContainer: {
    flex: 1,
    marginLeft: 4,
  },
  textInput: {
    fontFamily: "Cabin-Regular",
    color: "rgba(255, 255, 255, 0.8)",
    width: "100%",
    marginLeft: 3,
    fontSize: 14,
    padding: 4,
  },
  searchLine: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
});

const stylesAutoSearch = StyleSheet.create({
  outViewContainer: {
    flex: 1,
    width: "100%",
    position: "absolute",
    top: 40,
    zIndex: 99,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    overflow: "hidden",
  },
  blurView: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingVertical: 8,
  },
  itemBox: {
    width: "90%",
    height: 0.5,
    backgroundColor: "rgba(255,255,255,0.3)",
    alignSelf: "center",
  },
  itemTouchable: {
    height: 40,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  itemText: {
    fontFamily: "Cabin-Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
  },
});
