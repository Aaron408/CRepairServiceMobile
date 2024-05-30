import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from "../../contexts/AuthContext";

export default function History () {
  const { state, signOut } = useAuth();

  return (
    <ScrollView contentContainerStyle={styles.mainView}>
      <View style={styles.container}>
        <StackHistoryOption title="Your Orders" description="View your completed orders." buttonText="More"/>
        <StackHistoryOption title="In process" description="View your active order, if you have it." buttonText="More"/>
        <StackHistoryOption title="New Order" description="Place a new order" buttonText="New"/>
      </View>
    </ScrollView>
  );
}

function StackHistoryOption({ title='Title option', description='Info About', buttonText }) {
  return (
    <View style={styles.parentDiv}>
      <Text style={styles.titleTaller}>{title}</Text>
      <View style={styles.buttonRow}>
        <Text style={styles.description}>{description}</Text>
        <TouchableOpacity
          onPress={() => console.log('Button pressed')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "#E6961D",
    paddingVertical: 20,
    alignItems: 'center',
    height: "100%",
    justifyContent: "center"
  },
  container: {
    width: '90%',
    marginVertical: 10,
  },
  parentDiv: {
    backgroundColor: "#14171B",
    marginVertical: 10,
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    height: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleTaller: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  description: {
    paddingTop: 12,
    flex: 0.7,
    color: '#fff',
    marginRight: 5,
  },
  button: {
    backgroundColor: "#FF7A00",
    paddingVertical: 5,
    paddingHorizontal: 35,
    borderRadius: 40,
    marginTop: "5%"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
