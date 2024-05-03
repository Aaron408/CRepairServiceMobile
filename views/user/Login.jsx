import React, { useState } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { Input, Icon, Button } from "@rneui/themed";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Logo from "../../assets/Logo.png";

export default function Login() {
  const [visiblePassword, setVisiblePassword] = useState(false);
  return (
    <SafeAreaView style={styles.areaStyle}>
      <KeyboardAwareScrollView contentContainerStyle={styles.keyboarAware}>
        <View style={styles.title}>
          <Image
            source={Logo}
            style={styles.imageLogo}
          />
          <Text style={styles.titletext}>- Car Repair Service -</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.labelForm}>Email</Text>
          <Input inputStyle={styles.inputContainer} style={styles.inputForm} rightIcon={
            <Icon
              name="email"
              type="material-community"
              iconStyle={styles.inputIcon}
            />
          }/>
          <Text style={styles.labelForm}>Password</Text>
          <Input inputStyle={styles.inputContainer} style={styles.inputForm}
            secureTextEntry={!visiblePassword}
            rightIcon={
              <Icon
                name={ visiblePassword ? 'eye-off-outline' : 'eye-outline'}
                type="material-community"
                onPress={()=>setVisiblePassword(prev => !prev)}
                iconStyle={styles.inputIcon}
              />
            }
          />
          <Button title={'SIGN IN'} 
            buttonStyle={styles.btnForm}
            containerStyle={styles.btnContainer}
            titleStyle={styles.titleBtn}
          />
        </View>
        <View>
          <Text style={styles.signUP}>Dont have an account<Text style={{textDecorationLine: 'underline', color: '#FF7A00'}}> register now</Text></Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = new StyleSheet.create({
  areaStyle: {
    flex: 1,
  },
  keyboarAware: {
    flex: 1,
    alignItems: 'center', 
    backgroundColor: "#E6961D",
  },
  title: {
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  imageLogo:{
    width: '60%',
    height: '45%',
    marginBottom: 2
  },
  titletext:{
    textAlign: 'center',
    width: '100%',
    color: '#0e0e0e',
    fontSize: 20,
    fontStyle: 'italic',
    margin: 5
  },
  form:{
    width: '80%',
    justifyContent: 'center',
    alignContent:'center',
    alignItems: 'center'
  },
  inputForm:{
    width: '70%',
    color: '#0e0e0e',
  },
  inputIcon:{
    color: '#000'
  },
  inputContainer:{
    backgroundColor: 'white',
    borderRadius: 10
  },
  labelForm: {
    color: '#0e0e0e'
  },
  btnForm:{
    backgroundColor:'#0e0e0e'
  },
  btnContainer: {
    width: '50%',
    borderRadius: 8,
    marginBottom: '5%'
  },
  titleBtn:{
    color: '#fff',
    fontWeight: 'bold'
  },
  signUP:{
    color: '#0e0e0e'
  }
});
