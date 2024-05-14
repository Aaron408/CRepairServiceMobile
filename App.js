import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
//Stack Screens
import Login from "./views/guest/Login";
import SingUp from "./views/guest/SingUp";
import Home from "./views/user/Home";
import Profile from "./views/user/Profile";
import History from './views/user/History';

//Navigaton const
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//Compiler
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </NavigationContainer>
  );
}

//Components variables for Redirect app
function IsLoggedUser(){
  const { state,signOut} = useAuth();
  return(
    <Tab.Navigator initialRouteName="Home" screenOptions={
      //TabBar styles configuration
      ({route})=>({
        headerStyle: {backgroundColor: "#14171B"},
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTitle: () => {return null}, //Quit header title
        headerLeft: ()=>{ return <Icon type="material-community" name="logout" color='#fff' size={30} iconStyle={{marginLeft: '20%'}} onPress={signOut}/>},
        headerRight: ()=>{ return <Icon type="material-community" name="bell-ring" color='#fff' size={30} iconStyle={{marginRight: '20%'}}/>},
        tabBarIcon: ({color, size}) =>{
          let iconName = '';
          switch(route.name){
            case 'Home':{
              iconName = 'home'
              break;
            }
            case 'Profile':{
              iconName = 'account'
              break;
            }
            case 'History':{
              iconName = 'file-document-edit'
              break;
            }
          }
          return <Icon type="material-community" name={iconName} size={30} color={color}/>
        },
        tabBarActiveTintColor: '#E6961D',
        tabBarInactiveTintColor: '#fff',
        tabBarActiveBackgroundColor: '#14171B',
        tabBarInactiveBackgroundColor: '#14171B',
        tabBarShowLabel: false
      })
    }>
      <Tab.Screen name="Profile" component={Profile}/>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  )
}

//We put our stacks and flow of views following log in
function AppContent() {
  const { state, signIn, signOut, signUp } = useAuth();
  return (
    <>
      <Stack.Navigator>
        {state.userToken ? (
          //Group for separate Screens without access
          <Stack.Screen name="UserLogged" component={IsLoggedUser} options={{headerShown: false}}/>
        ) : (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Log In"
              component={Login}
            />
            <Stack.Screen
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


