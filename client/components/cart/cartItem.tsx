import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ThematicBreak from "../ThematicBreak"
import React, {useState} from 'react';


export default function cartItem() {
  const [timesPressed, setTimesPressed] = useState(0);

        return (
          
          <View>
            <View style={styles.container}>
              <View style={styles.info}>
                <Text style={styles.title} >
                  {`Embroidery`}
                </Text>
                <Text style={styles.customize} >
                  {`Customize`}
                </Text>
                <Text style={styles.description} >
                  {`Details: bla bla blaDetails: bla bla blaDetails: bla bla blaDetails: bla bla blaDetails: bla bla blaDetails: bla bla blaDetails: bla bla blaDetails: bla bla blaDetails: bla bla blaDetails: bla bla blaDetails: bla bla blaDetails: bla bla blaDetails: bla bla blaDetails: bla bla blaDetails: bla bla blaDetails: bla bla bla`}
                </Text>

                <View style={styles.footer}>
                  <Text style={styles.quantity} >
                    <Pressable><MaterialIcons name="add" size={14} color="#ffffff"/></Pressable>
                    {`    1    `}
                    <Pressable><MaterialIcons name="remove" size={14} color="#ffffff"/></Pressable>
                  </Text>
                  <Text style={styles.price} >
                    {`JOD 199.50`}
                  </Text>
                </View>
              </View>
              <Image source={require("../../assets/pic1.jpg")} style={styles.image} />
              </View>
              <ThematicBreak marginHorizontal={15} />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        marginTop: 20,
        flexDirection: "row",
        paddingBottom: 10,
        //borderColor: "#e6e6e6",
        //borderBottomWidth: 1,
      },
      footer: {
        flexDirection: "row",
      },
      title: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 16
      },
      customize: {
        color: 'rgba(246, 151, 127, 1)',
        fontSize: 14,
        textDecorationLine: 'underline',
      },
      image: {
        width: 130,
        height: 130,
        borderRadius: 10,
        marginLeft:40
      },
      info: {
        marginLeft: 15,
        flexDirection: "column",
        //justifyContent: "space-between",
        width: 160
      },
      description: {
        fontSize: 12,
        color: "#8e8e93",
        marginTop: 5,
        width: 206,
        height: 87,
        marginBottom:5
      },
      price: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 16,
        fontWeight:'bold',
        marginLeft: 40
      },
      quantity: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: 16,
      },
      });
      
