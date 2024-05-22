import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Input, Button, Icon, ListItem, Avatar, Image } from "@rneui/themed";
import { Rating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { useAuth } from "../../contexts/AuthContext";

const talleres = [
  {
    id: 133,
    address: "LA California",
    name: "Gas Monkey",
    rate: 3,
    logo: "https://www.48hourslogo.com/48hourslogo_data/2020/11/16/2020111603550976708.png",
  },
  {
    id: 134,
    address: "New York, NY",
    name: "West Coast Customs",
    rate: 4,
    logo: "https://th.bing.com/th/id/R.834bacfc7de1b786fd605cc45bab0e46?rik=69D6ynitwFZulQ&pid=ImgRaw&r=0",
  },
  {
    id: 135,
    address: "Miami, FL",
    name: "Unique Autosports",
    rate: 2,
    logo: "https://thumbs.dreamstime.com/b/east-end-mobile-detailing-280759044.jpg",
  },
  {
    id: 136,
    address: "Houston, TX",
    name: "Texas Metal",
    rate: 4.5,
    logo: "https://i0.wp.com/tallermecanicoespecialista.com.mx/wp-content/uploads/2017/05/Logo-Euro-Service.png?fit=1574%2C538",
  },
  {
    id: 137,
    address: "Las Vegas, NV",
    name: "Count's Kustoms",
    rate: 3.5,
    logo: null,
  },
  {
    id: 138,
    address: "Detroit, MI",
    name: "Mobsteel",
    rate: 1.5,
    logo: null,
  },
];

export default function Home() {
  const { state, signOut } = useAuth();
  const navigation = useNavigation();

  return (
    <KeyboardAwareScrollView>
      <ScrollView contentContainerStyle={styles.mainView}>
        <View style={styles.inputContainer}>
          <Input
            inputContainerStyle={{borderBottomWidth:0}}
            containerStyle={styles.input}
            rightIcon={<Icon type="material-community" name="magnify" />}
          />
        </View>
        <View style={styles.filtersContainer}>
          <RNEListItemAccordion />
        </View>
        <ShowMechanicalWorkshops />
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

// Example of Accordion of items for filter the current stack of data
function RNEListItemAccordion() {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <ListItem.Accordion
      content={
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "bold" }}>Rating</ListItem.Title>
        </ListItem.Content>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}
      style={styles.listAccordion}
    >
      <ListItem>
        <Avatar
          rounded
          source={{
            uri: "https://randomuser.me/api/portraits/men/32.jpg",
          }}
        />
        <ListItem.Content>
          <ListItem.Title>John Doe</ListItem.Title>
          <ListItem.Subtitle>Principle Engineer</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem>
        <Avatar
          rounded
          source={{
            uri: "https://randomuser.me/api/portraits/men/36.jpg",
          }}
        />
        <ListItem.Content>
          <ListItem.Title>Albert</ListItem.Title>
          <ListItem.Subtitle>Staff Engineer</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </ListItem.Accordion>
  );
}

// Content Logic
function ShowMechanicalWorkshops() {
  return (
    <View>
      {talleres.map((taller, index) => (
        <View style={styles.parentDiv} key={index}>
          {/* Columna de la imagen */}
          <View style={styles.imageColumn}>
            <Image
              source={{
                uri: taller.logo
                  ? taller.logo
                  : "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
              }}
              style={styles.image}
            />
            <Rating
              showRating={false}
              type="custom"
              ratingBackgroundColor="#1C2025"
              tintColor="#1C2025"
              ratingColor="#E7E700"
              ratingCount={5}
              imageSize={30}
              readonly={true}
              startingValue={taller.rate}
            />
          </View>
          {/* Columna del texto y botón */}
          <View style={styles.textColumn}>
            <Text style={styles.titleTaller}>Taller {taller.id}</Text>
            <Text style={styles.infoTaller}>{taller.name}</Text>
            <Text style={styles.addressTaller}>{taller.address}</Text>
            <Button
              title="More"
              onPress={() => console.log("Botón presionado")}
              buttonStyle={styles.moreButton}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

// Screen Styles
const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "#E6961D",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "80%",
    height: 45,
    borderRadius: 30,
    marginTop: 5,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filtersContainer: {
    width: "50%",
    alignSelf: "flex-end",
    marginRight: "5%",
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
  },
  listAccordion: {
    borderRadius: 30,
    textAlign: "center",
  },
  parentDiv: {
    flexDirection: "row",
    backgroundColor: "#1C2025",
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
  imageColumn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  textColumn: {
    flex: 1,
    padding: 10,
    justifyContent: "space-evenly",
  },
  image: {
    width: 150, // Ajusta la imagen al ancho del contenedor
    height: 100, // Ajusta la imagen al alto del contenedor
    borderRadius: 10,
  },
  ratingContainer: {
    height: "15%",
    width: "100%",
  },
  titleTaller: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  infoTaller: {
    color: "#fff",
  },
  addressTaller: {
    color: "#fff",
  },
  moreButton: {
    borderRadius: 40,
    backgroundColor: "#FF7A00",
  },
});
