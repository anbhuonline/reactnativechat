import React, {useEffect, useState, useLayoutEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

import CustomListItem from '../components/CustomListItem';
import { auth, db } from "../firebase";

const HomeScreen=({navigation})=>{

    const [chats, setChats] = useState([]);
    const signOutUser=()=>{
        auth.signOut().then(()=>{
            navigation.replace("Login");
        })
    }
    const enterChat=(id, chatName)=>{
        navigation.navigate("Chat", {
            id, chatName
        })
    }
    useEffect(() => {
        const unsubscribe = db.collection("chatapp").onSnapshot((snapshot)=>
            setChats(
                snapshot.docs.map((doc)=>({
                    id:doc.id,
                    data:doc.data()
                }))
            )
        )        
        return unsubscribe
    }, [])

    useLayoutEffect(() => {        
        navigation.setOptions({
            title:"Chatapp",
            headerStyle:{backgroundColor:"#fff"},
            headerText:{color:"black"},
            headerTintColor:"black",
            headerLeft:()=>(
                <View style={{marginLeft:20}}>
                    <TouchableOpacity activeOpactiy={0.5} onPress={signOutUser}>
                    <Avatar rounded source={{uri:auth?.currentUser?.photoURL}}></Avatar>
                    </TouchableOpacity>
                </View>
            ),
            headerRight:()=>(
                <View style={{
                    flexDirection:"row",
                    justifyContent: "space-between",
                    width:80,
                    marginRight:20
                }}>
                    <TouchableOpacity 
                        activeOpactiy={0.5}>
                        <AntDesign name="camerao" size={24} color="grey" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        activeOpactiy={0.5} 
                        onPress={()=>navigation.navigate("AddChat")}>
                        <SimpleLineIcons name="pencil" size={24} color="grey" />
                    </TouchableOpacity>
                </View>
            )
        })

    }, [navigation])
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({id,data:{chatName}})=>(                    
                    <CustomListItem id={id} chatName={chatName} key={id} enterChat={enterChat}/>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        height:"100%"
    }
})
