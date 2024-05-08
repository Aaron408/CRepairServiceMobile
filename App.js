import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./views/user/Login";
import Home from "./views/user/Home";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </NavigationContainer>
  );
}
//We put our stacks and flow of views following log in
function AppContent() {
  const { state, signIn, signOut, signUp } = useAuth();
  return (
    <>
      <Stack.Navigator>
        {state.userToken ? (
          <Stack.Screen
            name="Home"
            component={Home}
            initialParams={{ state }} //share a prop with the component
          />
        ) : (
          <Stack.Screen
            options={{ headerShown: false }}
            name="Log In"
            component={Login}
          />
        )}
      </Stack.Navigator>
      <Toast />
    </>
  );
}
