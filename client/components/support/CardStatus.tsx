import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

type statusProps = {
    status: string;
  };
export default function CardStatus(props: statusProps) {

  return (
    <View>
      {props.status == "Replied" ? (
        <View style={styles.replied}>
          <Text style={styles.statusText}>Replied</Text>
        </View>
      ) : props.status == "Rejected" ? (
        <View style={styles.rejected}>
          <Text style={styles.statusText}>Rejected</Text>
        </View>
      ) : (
        <View style={styles.pending}>
          <Text style={styles.statusText}>Pending</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pending: {
    width: 80,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#CF8C2A",
    justifyContent: "center",
    alignItems: "center"
  },
  replied: {
    width: 80,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2CAB31"
  },
  rejected: {
    width: 80,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#89352C"
  },
  statusText: {
    fontWeight: "400",
    color: "white"
  }
});
