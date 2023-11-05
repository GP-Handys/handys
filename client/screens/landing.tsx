import React from "react"
import {Image, StyleSheet, View, Text, Pressable} from "react-native"
import CommonBackground from "../common/background"
import STRINGS from "../strings/strings"
import COLORS from "../common/colors"

export default function Landing() {
    return (
        <CommonBackground>
            <View style={styles.defaultContainer}>
                <Image
                source={require("../assets/landing.png")}
                />
                <Image
                style={styles.logo}
                source={require("../assets/logo.png")}
                />
            </View>
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcome}>
                    {STRINGS.welcome}
                </Text>
            </View>
            <View style={styles.pressableContainer}>
                <Pressable style={styles.signInPressable}>
                    <Text style={{color: "#202525", fontWeight: "bold", fontSize: 18.44}}>
                        {STRINGS.signIn}
                    </Text>
                </Pressable>
            </View>
            <View style={styles.pressableContainer}>
                <Pressable style={styles.signUpPressable}>
                    <Text style={{color: "#FFFF", fontWeight: "bold", fontSize: 18.44}}>
                        {STRINGS.signUp}
                    </Text>
                </Pressable>
            </View>
        </CommonBackground>
    )
}

const styles = StyleSheet.create({
    defaultContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        marginTop: 15,
    },
    welcomeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 18
    },
    welcome: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 13
   },
   pressableContainer: {
        marginHorizontal: 38,
   },
   signInPressable: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        height:41,
        backgroundColor: COLORS.CTAButtonBackground,
        borderRadius: 8,
   },
   signUpPressable: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 18,
        height: 41,
        borderWidth: 2,
        borderColor: "#FF464949",
        borderRadius: 8
   }
});