import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";

export default function Home() {
  const { state, signOut } = useAuth();
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.mainView}>
      <StackHistoryOption title="Your Orders" description="View your completed orders."/>
      <StackHistoryOption title="In process" description="View your active order, if you have it."/>
      <StackHistoryOption title="New Order" description="Place a new order"/>
    </ScrollView>
  );
}

// Content Logic
function StackHistoryOption({title='Title option', description='Info About', actionButton = ()=>console.log('hello')}) {
  return (
    <View style={styles.parentDiv}>
      {/* Text title and description */}
      <View style={styles.textColumn}>
        <Text style={styles.titleTaller}>{title}</Text>
        <Text style={styles.infoTaller}>{description}</Text>
      </View>
      <View style={styles.buttonColumn}>
        <Button
          title="More"
          onPress={actionButton}
          buttonStyle={styles.moreButton}
        />
      </View>
    </View>
  );
}

// Screen Styles
const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "#E6961D",
    paddingVertical: 20, // Espacio adicional para permitir el desplazamiento
  },
  parentDiv: {
    flexDirection: "row",
    backgroundColor: "#14171B",
    width: "90%",
    margin: 10,
    height: 200, // Ajuste de altura para que todos los elementos se visualicen correctamente
    borderRadius: 40,
    paddingHorizontal: 10,
    shadowColor: "#000", // Color de la sombra
    shadowOffset: {
      width: 5, // Desplazamiento horizontal de la sombra
      height: 15, // Desplazamiento vertical de la sombra
    },
    shadowOpacity: 1, // Aumentar la opacidad de la sombra
    shadowRadius: 10, // Aumentar el radio de desenfoque de la sombra
    elevation: 15, // Aumentar la elevación para Android
  },
  textColumn: {
    flex: 1,
    padding: 10,
  },
  buttonColumn: {
    flex: 1,
    alignContent: 'center',
    alignSelf: 'center'
  },
  titleTaller: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    margin: 15,
  },
  infoTaller: {
    color: "#fff",
  },
  moreButton: {
    borderRadius: 40,
    backgroundColor: "#FF7A00",
  },
});
