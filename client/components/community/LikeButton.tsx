import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { addLike, removeLike } from "../../api/CommunityApi";

interface props {
  postId:number
  isLiked: boolean;
}

export default function LikeButton({ isLiked,postId }: props) {
  const [liked, setLiked] = useState(isLiked);

  function handleLike(){
    if(liked){
      removeLike(postId);
      setLiked(false);
    }
    else{
      addLike(postId);
      setLiked(true);
    } 
  }

  return (
    <TouchableOpacity onPress={handleLike}>
      {liked ? (
        <MaterialIcons name={"thumb-up-alt"} size={26} color="#FFFFFFBF"/>
      ) : (
        <MaterialIcons name={"thumb-up-off-alt"} size={26} color="#FFFFFFBF" />
      )}
    </TouchableOpacity>
  );
}
