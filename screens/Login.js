import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import {auth} from '../firebase';

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const signIn=()=>{
        auth.signInWithEmailAndPassword(email, password).catch(error=>alert(error))
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            console.log(authUser);
            if(authUser){
                navigation.replace('Home');
            }
        })
        return unsubscribe;
    }, [])

    return (
        <View behavior="padding" style={styles.container}>
        {/* <KeyboardAvoidingView behavior="padding" style={styles.container}> */}
            <StatusBar style="light" />
            <Image source={require('../assets/cool.png')} 
              style={{ width: 100, height: 100 }}
            />
            <View style={styles.inputContainer}>
                <Input type="email" 
                    placeholder="Email" 
                    autoFocus 
                    value={email} 
                    onChangeText={(text)=>setEmail(text)}
                />
                <Input type="password" 
                    placeholder="Password" 
                    autoFocus 
                    secureTextEntry 
                    value={password} 
                    onChangeText={(text)=>setPassword(text)}
                    onSubmitEditing={signIn}
                />
            </View>            
            <Button 
                containerStyle={styles.button} 
                title="Login" 
                onPress={signIn}>                    
            </Button>
            <Button 
                onPress={()=>navigation.navigate("Register")} 
                containerStyle={styles.button} 
                title="Register" 
                type="outline">                
            </Button>
            <View style={{height:100}}></View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        backgroundColor:"white"
    },
    inputContainer:{
        width:300
    },
    button:{
        width:200,
        marginTop:10
    }
})
