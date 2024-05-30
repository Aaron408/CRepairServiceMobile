import "react-native-gesture-handler";
import { Image, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
import { MenuProvider } from "react-native-popup-menu"; //Menu popup
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

//Stack Screens
import Login from "./views/guest/Login";
import SingUp from "./views/guest/SingUp";
import Home from "./views/user/Home";
import Profile from "./views/user/Profile";
import History from "./views/user/History";

//Navigaton const
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//Compiler
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <MenuProvider>
          <AppContent />
        </MenuProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

const Divider = () => <View style={styles.divider} />;

//Components variables for Redirect app
function IsLoggedUser() {
  const { state, signOut } = useAuth();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={
        //TabBar styles configuration
        ({ route }) => ({
          headerStyle: {
            backgroundColor: "#14171B",
            height: 100,
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitle: () => {
            return null;
          }, //Quit header title

          //Solo mostrar el logout cuando se está en pantalla de perfil
          headerLeft: () => {
            if (route.name === "Profile") {
              return (
                <View>
                  <Menu style={{ marginLeft: "12%" }}>
                    <MenuTrigger >
                      <Icon
                        type="feather"
                        name="more-horizontal"
                        color="#fff"
                        size={30}
                      />
                    </MenuTrigger>
                    <MenuOptions style={{ backgroundColor: "#1F2227"}}>
                      <MenuOption onSelect={() => alert("Ajustes")} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 11, paddingHorizontal: "10%"}}>
                          <Icon
                            type="feather"
                            name="settings"
                            color="white"
                            size={20}
                            style={{marginRight: 15}}
                          />
                          <Text style={{ color: 'white'}}>Settings</Text>
                      </MenuOption>
                      <MenuOption onSelect={() => alert("Terminos y condiciones")} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 11, paddingHorizontal: "10%"}}>
                          <Icon
                            type="material-icons"
                            name="my-library-books"
                            color="white"
                            size={20}
                            style={{marginRight: 15}}
                          />
                          <Text style={{ color: 'white'}}>Terms & Conditions</Text>
                      </MenuOption>
                      <MenuOption onSelect={() => alert("Servicio al cliente")} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 11, paddingHorizontal: "10%"}}>
                          <Icon
                            type="feather"
                            name="headphones"
                            color="white"
                            size={20}
                            style={{marginRight: 15}}
                          />
                          <Text style={{ color: 'white'}}>Client service</Text>
                      </MenuOption>
                      <Divider />
                      <MenuOption onSelect={signOut} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: "10%"}}>
                        <Icon
                          type="material-community"
                          name="logout"
                          color="white"
                          size={20}
                          style={{marginRight: 15}}
                        />
                        <Text style={{ color: 'white'}}>Logout</Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              );
            } else {
              return (
                <Image
                  source={require("./images/Logo1.png")}
                  style={{ width: 50, height: 42, marginLeft: 20 }}
                />
              );
            }
          },
          headerRight: () => {
            return (
              <Icon
                type="material-community"
                name="bell-ring"
                color="#fff"
                size={30}
                iconStyle={{ marginRight: "20%" }}
              />
            );
          },
          tabBarIcon: ({ color, size }) => {
            let iconName = "";
            switch (route.name) {
              case "Home": {
                iconName = "home";
                break;
              }
              case "Profile": {
                iconName = "account";
                break;
              }
              case "History": {
                iconName = "file-document-edit";
                break;
              }
            }
            return (
              <Icon
                type="material-community"
                name={iconName}
                size={30}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: "#E6961D",
          tabBarInactiveTintColor: "#fff",
          tabBarActiveBackgroundColor: "#14171B",
          tabBarInactiveBackgroundColor: "#14171B",
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopWidth: 0,
            height: 55,
          },
        })
      }
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
}

//We put our stacks and flow of views following log in
function AppContent() {
  const { state, signIn, signOut, signUp } = useAuth();
  return (
    <>
      <Stack.Navigator>
        {state.userToken ? (
          //Group for separate Screens without access
          <Stack.Screen
            name="UserLogged"
            component={IsLoggedUser}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="login"
              component={Login}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Sign Up"
              component={SingUp}
            />
          </>
        )}
      </Stack.Navigator>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#7F8487",
  },
});
 