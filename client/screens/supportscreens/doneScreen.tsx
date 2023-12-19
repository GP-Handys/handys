import {
    View,
    Pressable,
    Text,
    StyleSheet,
    Image
  } from "react-native";
  import { CommonBackgroundWithNoSafeArea } from "../../common/background";
  import COLORS from "../../common/colors";
  import { StackProps } from "../../components/navigation/NavigationStack";

  export default function DoneScreen({ navigation }: StackProps) {
    return (
      <CommonBackgroundWithNoSafeArea>
  
        <View style={styles.supportContainer}>
          <Text style={{fontSize:40,color:'white', fontWeight:'600', marginBottom:20}}>Done!</Text>
          <Image
            style={styles.image}
        source={require('../../assets/Done-pana.png')}
      />
          <Text style={styles.textIcon}>We’ll reply to you in your mail.</Text>
        </View>


        <View style={{ marginBottom: 10, marginHorizontal: 10 }}>
            <Pressable
              onPress={() => {navigation.navigate("Profile")}}
              style={({ pressed }) => [
                styles.signUpPressable,
                {
                  opacity: pressed ? 0.6 : 1,
                },
              ]}
            >
              <Text style={{ color: "black", fontWeight: "600", fontSize: 16 }}>
                Okay! 
              </Text>
            </Pressable>
          </View>
      </CommonBackgroundWithNoSafeArea>
    );
  }
  
  const styles = StyleSheet.create({
    textIcon: {
      marginTop: 20,
      color: "white",
      fontWeight: "500",
      fontSize: 20
    },
    supportContainer: {
        flex:1,
      marginTop: 80,
      alignItems: "center"
    },
    signUpPressable: {
      backgroundColor: COLORS.CTAButtonBackground,
      alignItems: "center",
      justifyContent: "center",
      height: 50,
      borderRadius: 8,
      marginTop:15,
    },
    image:{
        width:300,
        height:300,
    }
  });
  