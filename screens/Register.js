import React, {useState, useLayoutEffect} from 'react';
import {KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import {Input, Button, Text} from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import {auth} from '../firebase';

const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageURL, setImageUrl] = useState('')
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle:"Back to Login"
        })            
    }, [navigation])
    
    const register=()=>{
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser)=>{
                authUser.user.updateProfile({
                    displayName:name,
                    photoURL:imageURL||<Image source={require('../assets/butterfly.jpg')} 
                    style={{ width: 100, height: 100 }}
                  />
                })
            })
            .catch((error)=>alert(error.message))
    }
    return (
        <View behavior="padding" style={styles.container}>
        {/* <KeyboardAvoidingView behavior="padding" style={styles.container}> */}
            <StatusBar style="light" />
            <Text h3 style={{marginBottom:50}}>Hello from Register screen</Text>
            <View style={styles.input}>
                <Input placeholder="Enter name" type="text" value={name} onChangeText={(text)=>setName(text)} />
                <Input placeholder="Enter email" type="email" value={email} onChangeText={(text)=>setEmail(text)} />
                <Input placeholder="Enter password" type="password" secureTextEntry value={password} onChangeText={(text)=>setPassword(text)} />
                <Input placeholder="Profile picture URL (optional)" type="text" value={imageURL} onChangeText={(text)=>setImageUrl(text)} onSubmitEditing={register}/>
            </View>
            <View style={styles.button}>
                <Button title="Register" raised containerStyle={styles.button} onPress={register}></Button>
            </View>
            <View style={{height:100}}></View>
        {/* </KeyboardAvoidingView> */}
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        backgroundColor:"white"
    },
    input:{
        width:300
    },  
    button:{
        width:200,
        marginTop:10
    }
})
