import React, { useState } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { Input, Icon, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Toast from "react-native-toast-message";
import Logo from "../../assets/BlackLogo.png";
import { useAuth } from "../../contexts/AuthContext";
import { validateEmail } from "../../services/EmailTest"; //return true if email is valid
import Loading from "../../components/Loading";

export default function Login() {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [keyboardActive, setKeyboardActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(initalizeForm());
  const {signUp} = useAuth(); //Context for the app flow
  const navigation = useNavigation();
  const handleKeyboardDidShow = () => {
    setKeyboardActive(true);
  };

  const handleKeyboardDidHide = () => {
    setKeyboardActive(false);
  };

  //Logic for handle changes and send data to auth
  const handleChange = (e, target) =>{
    setLoginForm({...loginForm, [target]: e.nativeEvent.text});
  }

  const handleSignUp = async() => {
    if(validateEmail(loginForm.email)){
      //if email is valid
      console.log('valid email');
      setLoading(true);
      setTimeout(()=>{
        setLoading(false);
        signIn(loginForm);
      }, 3000)
    }else{
      //show a toast
      Toast.show({
        type: 'info',
        text1: 'Invalid Email',
        text2: 'please check your email'
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.scrollViewContent,
          keyboardActive && styles.keyboardActive,
        ]}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        onKeyboardDidShow={handleKeyboardDidShow}
        onKeyboardDidHide={handleKeyboardDidHide}
      >
        <View style={styles.title}>
          <Image source={Logo} style={styles.imageLogo} />
          <Text style={styles.titleText}>"General"</Text>
        </View>

        <View style={styles.form}>

          {/**FIRST ELEMENT */}
          <Text style={styles.label}>Name</Text>
          <View style={styles.inputContainer}>
            <Input
              inputStyle={styles.input}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              onChange={(e)=>handleChange(e,'name')}
            />
            <Icon
              name="account"
              type="material-community"
              iconStyle={styles.icon}
            />
          </View>
          {/**SECOND ELEMENT */}
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <Input
              inputStyle={styles.input}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              onChange={(e)=>handleChange(e,'email')}
            />
            <Icon
              name="email"
              type="material-community"
              iconStyle={styles.icon}
            />
          </View>
           {/**THIRD ELEMENT */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <Input
              inputStyle={styles.input}
              secureTextEntry={!visiblePassword}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              onChange={(e)=>handleChange(e,'password')}
            />
            <Icon
              name={visiblePassword ? "eye-off-outline" : "eye-outline"}
              type="material-community"
              onPress={() => setVisiblePassword((prev) => !prev)}
              iconStyle={styles.icon}
            />
          </View>
           {/**FOURTH ELEMENT */}
          <Text style={styles.label}>Confirm password</Text>
          <View style={styles.inputContainer}>
            <Input
              inputStyle={styles.input}
              secureTextEntry={!visiblePassword}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              onChange={(e)=>handleChange(e,'confirmPassword')}
            />
            <Icon
              name={visiblePassword ? "eye-off-outline" : "eye-outline"}
              type="material-community"
              onPress={() => setVisiblePassword((prev) => !prev)}
              iconStyle={styles.icon}
            />
          </View>
        </View>

        <Button
          title="SIGN UP"
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.buttonTitle}
          onPress={handleSignUp}
        />

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            Already have an account? {" "}
            <Text style={styles.registerLink} onPress={()=>navigation.navigate('Sign Up')}>Sign in</Text>
          </Text>
        </View>
        <Loading isVisible={loading} text={'LOGGING IN...'}/>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6961D",
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  keyboardActive: {
    justifyContent: "flex-start",
  },
  title: {
    alignItems: "center",
    marginBottom: 30,
  },
  imageLogo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  titleText: {
    color: "#0e0e0e",
    fontSize: 24,
    marginTop: 10,
  },
  form: {
    width: "80%",
    marginBottom: 20,
  },
  label: {
    color: "#0e0e0e",
    marginBottom: 5,
    paddingLeft: 10,
    paddingBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 55,
    borderRadius: 25,
    paddingTop: 5, // reduce padding top
    paddingBottom: 5, // reduce padding bottom
    paddingRight: 40, // add padding right
    marginBottom: 30,
  },
  icon: {
    color: "#000",
    paddingRight: 10,
  },
  input: {
    flex: 1,
    marginTop: 25,
    paddingLeft: 5
  },
  button: {
    backgroundColor: "#0e0e0e",
    borderRadius: 25,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  buttonTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  registerContainer: {
    alignSelf: "flex-end",
    paddingRight: "10%",
    paddingTop: 5,
  },
  registerText: {
    color: "#0e0e0e",
    fontSize: 16,
    marginBottom: 10
  },
  registerLink: {
    color: "#fff",
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});

function initalizeForm(){
  return {
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
  }
}