import {
   FlatList,
   StyleSheet,
   View,
   Text,
   Image,
   TextInput,
 } from "react-native";
import CustomTextInput from "../../components/CustomTextInput";
import { useState } from "react";
import COLORS from "../../common/colors";
import PostOwnerHeader from "../../components/community/PostOwnerHeader";
import Post from "../../components/community/Post";

 export default function Comments({route}:any){
   const { post } = route.params;
   const [comment, setComment] = useState('');
   

   return(
     
      <View style={{backgroundColor:COLORS.commonBackground, flex:1}}>    
         {/* <PostOwnerHeader userId={post.userId}/> */}
         <Post post={post}/>
      <View style={{marginBottom:0, position:"absolute", bottom:0, width:"105%"}}> 
        <CustomTextInput
          onChangeText={text => setComment(text)}
          value={comment}
          placeholder="Add a comment" 
          multiline={true}
          right={true}
          /> 
          </View>
      </View>
   )
 }