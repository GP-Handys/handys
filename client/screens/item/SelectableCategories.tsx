import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import  COLORS  from '../../common/colors';
import { useState, useEffect } from "react";
import { Category } from '../../models/Category';


interface Props {
   category: Category
   isChecked: boolean
} 

export default function SelectableCategory({ category , isChecked }: Props) {
  

    return (
      <TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          marginTop: 10,
          marginBottom: 10,
          gap:5,
          backgroundColor: item.checked ? COLORS.DividerColor : "transparent", // Change background color based on checked state
          borderRadius:5,
          paddingVertical:5,
        }}
      >
        <Image
          source={{uri: category.category_pfp}}
          style={{
            width: 50,
            height: 50,
            overflow: "hidden",
            borderColor: "black",
            borderRadius: 50,
            marginLeft: 10,
            marginRight: 10,
          }}
        />
        <View style={{ width: "50%" }}>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              paddingTop: 15,
              paddingRight: 10,
              fontWeight: "600",
              alignContent: "flex-start",
            }}
          >
            {category.category_name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )}
    
