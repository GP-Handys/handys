import { FlatList, Text, View } from "react-native";
import COLORS from "../../common/colors";
import { GeneratedImage } from "../../models/GeneratedImage";
import { useEffect, useState } from "react";
import { getHistoryForUser } from "../../api/Ai";
import History from "../../components/ai/history";
import ThematicBreak from "../../components/ThematicBreak";
import { ActivityIndicator } from "react-native-paper";

export default function GenerationHistoryScreen() {
  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  const fetchHistory = async () => {
    await getHistoryForUser().then((result) => {
      if (result.status == 200) {
        setHistory(result.data);
        setIsFetching(false);
      }
    });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (isFetching) {
    return <ActivityIndicator size={"large"} color="white" />;
  } else {
    return (
      <View
        style={{
          backgroundColor: COLORS.commonBackground,
          flex: 1,
          paddingHorizontal: 15,
        }}
      >
        <FlatList
          data={history}
          renderItem={({ item }) => <History generatedImage={item} />}
          ItemSeparatorComponent={() => <ThematicBreak />}
        />
      </View>
    );
  }
}
