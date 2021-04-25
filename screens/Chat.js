import React, { useLayoutEffect, useState } from 'react';
import { TextInput, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
// import * as firebase from "firebase";//differs from original code due to version change
import firebase from "firebase";
import {auth, db} from "../firebase";

const ChatScreen = ({ navigation, route }) => {

    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",

            headerTitle: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <Avatar 
                        rounded 
                        source={{
                            uri:messages[0]?.data.photoURL
                        }} 
                    />
                    <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>{route.params.chatName}</Text>
                </View>
            ),
            // headerLeft:()=>(
            //     <TouchableOpacity 
            //         style={{marginLeft:10}} 
            //         onPress={navigation.goBack}
            //     >
            //         <AntDesign name="arrowLeft" size={24} color="white" />
            //     </TouchableOpacity>
            // ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 60,
                        marginRight: 20
                    }}
                >
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation, messages])

    const sendMessage = () => {        
        Keyboard.dismiss()
        db.collection("chats").doc(route.params.id).collection("messages").add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            displayName: auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL:auth.currentUser.photoURL
        })
        setInput("");
    }

    useLayoutEffect(() => {
        const unsubscribe = db
        .collection("chats")
        .doc(route.params.id)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot =>setMessages(
                snapshot.docs.map(doc=>({
                    id:doc.id,
                    data:doc.data()
                }))
            ))
        return unsubscribe;
    }, [route])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                {/* <Text>{route.params.chatName}</Text> */}
                <TouchableWithoutFeedback>
                    <>
                        <ScrollView contentContainerStyle={{paddingTop:15}}>
                            {messages.map(({id, data})=>(//id, data was destructed here
                                data.email===auth.currentUser.email?(
                                    <View key={id} style={styles.receiver}>
                                        <Avatar 
                                            position="absolute"
                                            rounded
                                            //web
                                            containerStyle={{
                                                position:"absolute",
                                                bottom:-15,
                                                right:-5
                                            }}
                                            bottom={-15}
                                            right={-5}
                                            size={30}
                                            source={{
                                                uri:data.photoURL
                                            }}
                                        />
                                        <Text style={styles.receiverText}>{data.message}</Text>
                                    </View>
                                ):(
                                    <View key={id} style={styles.sender}>
                                        <Avatar 
                                            position="absolute"
                                            rounded
                                            //web
                                            containerStyle={{
                                                position:"absolute",
                                                bottom:-15,
                                                left:-5
                                            }}
                                            bottom={-15}
                                            left={-5}
                                            size={30}
                                            source={{
                                                uri:data.photoURL
                                            }}
                                        />
                                        <Text style={styles.senderText}>{data.message}</Text>
                                    </View>
                                )
                            ))}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                                placeholder="Signal Message"
                                style={styles.textInput}
                                value={input}
                                onSubmitEditing ={sendMessage}
                                onChangeText={(text) => setInput(text)}
                            />
                            <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                                <Ionicons name="send" size={24} color="grey"></Ionicons>
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    receiver:{
        padding:15,
        backgroundColor:"#d2bcf7",
        alignSelf:"flex-end",
        borderRadius:30,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative"
    },
    sender:{
        padding:15,
        backgroundColor:"#b3f2d9",
        alignSelf:"flex-start",
        borderRadius:30,
        margin:15,
        maxWidth:"80%",
        position:"relative"
    },
    senderText:{
        color:"black",
        fontWeight:"500",
        marginLeft:10,
        // marginBottom:15
    },
    receiverText:{
        color:"black",
        fontWeight:"500",
        marginLeft:10
    },
    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:"black"
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30
    }
})
