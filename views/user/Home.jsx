import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text, FlatList } from "react-native";
import { Input, Button, Icon, ListItem, Avatar, Image } from "@rneui/themed";
import { Rating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { useAuth } from "../../contexts/AuthContext";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

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

const data = [
  { label: "5", value: "5" },
  { label: "4", value: "4" },
  { label: "3", value: "3" },
  { label: "2", value: "2" },
  { label: "1", value: "1" },
];

export default function Home( {iconName = 'star'} ) {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "black" }]}>
          Rating
        </Text>
      );
    }
    return null;
  };

  const { state, signOut } = useAuth();
  const navigation = useNavigation();

  return (
    <KeyboardAwareScrollView>
      <ScrollView contentContainerStyle={styles.mainView}>
        <View style={styles.inputContainer}>
          <Input
            inputContainerStyle={{ borderBottomWidth: 0 }}
            containerStyle={styles.input}
            rightIcon={<Icon type="material-community" name="magnify" />}
          />
        </View>
        <View style={styles.filtersContainer}>
          {renderLabel()}
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={"..."}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <FontAwesome
                style={styles.icon}
                color={isFocus ? "gold" : "gold"}
                name={iconName} // Use the icon name passed as prop
                size={20}
              />
            )}
          />
        </View>
        <ShowMechanicalWorkshops />
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

// Content Logic
function ShowMechanicalWorkshops() {
  return (
    <View>
      {talleres.map((taller, index) => (
        <View style={styles.parentDiv} key={index}>
          {/* Image and rating column */}
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
              imageSize={30.2}
              readonly={true}
              startingValue={taller.rate}
            />
          </View>
          {/* Text title and description column*/}
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
    marginTop: "5%",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filtersContainer: {
    width: "30%",
    alignSelf: "flex-end",
    marginRight: "5%",
    backgroundColor: "transparent",
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
    borderRadius: 30,
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
    marginBottom: 5
  },
  ratingContainer: {
    height: "15%",
    width: "100%",
  },
  titleTaller: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 2,
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
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 45,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 25,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
