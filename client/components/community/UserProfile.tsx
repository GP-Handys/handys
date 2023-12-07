import { View, Text, Image, StyleSheet } from 'react-native';

export default function UserProfile () {
  return (
    <View style={styles.userData}>
      <View style={styles.imgContainer}>
        <Image style={styles.pfpImg} source={require("../../assets/pic1.jpg")} />
      </View>
      <Text style={styles.userName}> laith </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  userData: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignContent: 'space-around',
  },
  imgContainer: {
    aspectRatio: 1 * 1,
    left: 12,
    height: 45,
    width: 45,
    borderRadius: 50,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    top: 7,
  },
  pfpImg: {
    height: 45,
    width: 45,
    borderRadius: 50,
  },
  userName: {
    left: 15,
    top: 15,
    color: '#FFFFFFE0',
    fontSize: 14,
    fontStyle: 'italic',
  },
});

