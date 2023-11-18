
import { View, StyleSheet, Button, Text, Alert,TouchableOpacity, Pressable, } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ThematicBreak from "../ThematicBreak"
import React, {useState} from 'react';


export default function cartTotal(){
    var  [totalPrice, setTotalPrice] = useState(0); 

    return(
        <View >
            <View style={styles.container}>
                <View>
                    <Text style={styles.text} >
                    {`Total Price`}
                    </Text>
                    <Text style={styles.price}>
                    {totalPrice + "JOD"}
                    </Text>
                </View>
                <Pressable onPress={() => Alert.alert('Simple Button pressed')}>
                    <Text style={styles.button}>Checkout</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin:20,
        flexDirection: "row",
        alignItems:'center',
        justifyContent: "space-between",
    },
      text: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'normal',
      },
      price: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
      button:{
        height: 40,
        width: 150,
        borderRadius:5,
        textAlign:'center',
        textAlignVertical:'center',
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor:'rgba(246, 151, 127, 1)',
      }
})
