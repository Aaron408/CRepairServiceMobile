import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { useAuth } from "../../contexts/AuthContext";

export default function Profile() {
  const { state } = useAuth();

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.mainView}>
        <View style={styles.upperView}>
          <Icon
            type="material-community"
            name="account-circle"
            size={150}
            iconStyle={styles.iconProfile}
          />
          {state.userToken && (
            <Text style={styles.nameProfile}>{state.userToken}</Text>
          )}
        </View>
        <View style={styles.bottomView}>
          <View style={styles.floatViewBottom}>
            <Text style={styles.contactTitle}>Contact Info</Text>
            <View style={styles.contactInfoContainer}>
              <View style={styles.contactInfo}>
                <Icon type="material-community" name="phone" size={15} iconStyle={styles.contactIcons}/>
                <Text style={styles.contactText}>+52 37740039</Text>
              </View>
              <View style={styles.contactInfo}>
                <Icon type="material-community" name="email" size={15} iconStyle={styles.contactIcons}/>
                <Text style={styles.contactText}>user*****@gmail.com</Text>
              </View>
            </View>
            <Button
              title='Edit'
              buttonStyle={styles.editBtn}
            />
            <View style={styles.lineSeparation}></View>
            <View style={styles.containerChangeOptions}>
              <View style={styles.changePasswordContainer}>
                <Icon type="material-community" name="security" size={15} iconStyle={{color: 'white', marginHorizontal: 5}}/>
                <Text style={styles.contactText}>Change Password</Text>
                <Button
                  title='Change'
                  size="sm"
                  buttonStyle={styles.changeBtn}
                  containerStyle={styles.btnChangeContainer}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  mainView: {
    flex: 1,
    flexDirection: "column",
  },
  upperView: {
    backgroundColor: "#14171B",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconProfile: {
    color: "#fff",
  },
  nameProfile: {
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 20,
  },
  bottomView: {
    backgroundColor: "#E6961D",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  floatViewBottom: {
    backgroundColor: "#14171B",
    borderRadius: 35,
    width: '80%',
    height: '80%',
    textAlign: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  contactIcons: {
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: 100,
    marginHorizontal: 10,
    padding: 5,
  },
  contactTitle: {
    color: '#fff',
    fontWeight: '600',
    marginVertical: 10,
    fontSize: 22,
    textAlign: 'center', // Center align the title
  },
  contactInfoContainer: {
    width: '100%',
    alignItems: 'start',
    paddingHorizontal: 10,
    marginTop: 5
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    color: '#fff',
  },
  editBtn: {
    borderRadius: 50,
    paddingHorizontal: 5,
    color: '#fff',
    backgroundColor: '#FF7A00',
    width: 150,
    fontSize: 5,
    fontWeight: 'bold',
    marginTop: 5,
    alignSelf: 'center',
  },
  lineSeparation: {
    height: 3,
    width: '95%',
    borderRadius: 100,
    backgroundColor: '#fff',
    marginVertical: 20,
  },
  containerChangeOptions: {
    height: '30%',
    width: '100%',
    alignItems: 'center',
  },
  changePasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeBtn: {
    backgroundColor: '#FF7A00',
    color: '#fff',
    marginHorizontal: 20,
    marginTop: 5,
    borderRadius: 50,
    paddingHorizontal: 15,
    fontSize: 5,
  },
  btnChangeContainer: {
    fontSize: 10,
    fontWeight: '500',
  },
});

