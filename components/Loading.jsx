import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "@rneui/themed";

export default function Loading(props) {
  const { isVisible, text } = props;

  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0, 0, 0, 0.5)"
      overlayBackgroundColor=""
      overlayStyle={styles.overlay}
    >
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#ffffff" />
        {
          //Condicion de si llega un valor dentro de text
          text && <Text style={styles.text}>{text}</Text>
        }
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: "#14171B",
    borderRadius: 10,
  },
  view: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
  },
  text: {
    color: "#ffffff",
    textTransform: "uppercase",
    marginTop: 10,
  },
});
