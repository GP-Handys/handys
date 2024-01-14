import { View, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { addLike, removeLike } from "../../api/CommunityApi";
import COLORS from "../../common/colors";

interface props {
  postId: number;
  isLiked: boolean;
  likeCount: number;
  handleIsLiked?:any;
  handleLikeCount?:any
}

export default function LikeButton({ isLiked, postId, likeCount,handleIsLiked,handleLikeCount }: props) {
  const [liked, setLiked] = useState(isLiked);
  const [LikeCounts, setLikeCount] = useState(likeCount);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  function handleLike() {
    if (liked) {
      removeLike(postId);
      setLiked(false);
      let newLikeCount=LikeCounts - 1
      setLikeCount(newLikeCount);
      handleLikeCount(newLikeCount)
      handleIsLiked(false);
    } else {
      addLike(postId);
      setLiked(true);
      let newLikeCount=LikeCounts + 1
      setLikeCount(newLikeCount);
      handleLikeCount(newLikeCount)
      handleIsLiked(true);
    }
  }

  return (
    <View style={{display:"flex",flexDirection:"row",gap:5,alignItems:"center"}}>
      <TouchableOpacity onPress={handleLike}>
        {liked ? (
          <MaterialIcons name={"thumb-up-alt"} size={26} color="#BD9A87" />
        ) : (
          <MaterialIcons
            name={"thumb-up-off-alt"}
            size={26}
            color="#BD9A87"
          />
        )}
      </TouchableOpacity>
      <Text style={{color: "#BD9A87",opacity:0.7,fontSize:16,fontWeight:"600" }}>
        {LikeCounts}
      </Text>
    </View>
  );
}
