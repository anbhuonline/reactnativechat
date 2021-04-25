import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from "react-native-vector-icons/FontAwesome"
import { db } from '../firebase'

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState('')

    const createChat = async () => {
        await db.collection("chatapp").add({
            chatName: input
        }).then(() => {
            navigation.goBack();
        })
            .catch((error) => alert(error));
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle: "Chats"//This will work in ios and android but not on web
        })
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter a chat name"
                value={input}
                onChangeText={(text) => { setInput(text) }}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24} color="grey" />
                }
                onSubmitEditing={createChat}
            />
            <Button disabled={!input} onPress={createChat} title="Create Chat"></Button>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        padding:30,
        height:"100%"
    }    
})
