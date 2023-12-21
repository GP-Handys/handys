import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { CommonBackgroundWithNoSafeArea } from "../../common/background";
import COLORS from "../../common/colors";
import { StackProps } from "../../components/navigation/NavigationStack";

export default function ItemScreen({ navigation }: StackProps, props: any) {
  return (
    <CommonBackgroundWithNoSafeArea>
      <View>
          <Image source={require('../../assets/wood.png')} style={styles.image}/>
      </View>
    </CommonBackgroundWithNoSafeArea>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  image:{
    width:'100%',
    height:250,
  }
});
