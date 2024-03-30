import { View, Image, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";

interface SearchLocationProps {
    onChangeText: (text: string) => void;
    onSubmitEditing: () => void;
}

const testList = ["Ai meu deus, AAAA", "123, Testando", "OK, foi", 1]

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
      
      {/* <View style={{position: "absolute", top: 35, left: 4, height: 100, width: "100%", backgroundColor: "white", borderRadius: 10, gap: 5, paddingHorizontal: 10, paddingVertical: 5}}>
       {testList.map((item, index) => {
         return (
            <TouchableOpacity style={{alignItems: "center", justifyContent: "center", width: "100%", height: 25, backgroundColor: "red"}} onPress={() => console.log("clicou")}>
                <Text style={{fontFamily: "Cabin-Regular"}}>
                    {item}
                </Text>
            </TouchableOpacity> 
            )
         })
         } 
         </View> */}
      {/* </View>  */}
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

