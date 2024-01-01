import { View, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { addLike, removeLike } from "../../api/CommunityApi";
import COLORS from "../../common/colors";

interface props {
  postId: number;
  isLiked: boolean;
  likeCount: number;
}

export default function LikeButton({ isLiked, postId, likeCount }: props) {
  const [liked, setLiked] = useState(isLiked);
  const [LikeCounts, setLikeCount] = useState(likeCount);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  function handleLike() {
    if (liked) {
      removeLike(postId);
      setLiked(false);
      setLikeCount(LikeCounts - 1);
    } else {
      addLike(postId);
      setLiked(true);
      setLikeCount(LikeCounts + 1);
    }
  }

  return (
    <View style={{display:"flex",flexDirection:"row",gap:5,alignItems:"center"}}>
      <TouchableOpacity onPress={handleLike}>
        {liked ? (
          <MaterialIcons name={"thumb-up-alt"} size={26} color="#FFFFFFBF" />
        ) : (
          <MaterialIcons
            name={"thumb-up-off-alt"}
            size={26}
            color="#FFFFFFBF"
          />
        )}
      </TouchableOpacity>
      <Text style={{color: "white",opacity:0.7,fontSize:16,fontWeight:"600" }}>
        {LikeCounts}
      </Text>
    </View>
  );
}
