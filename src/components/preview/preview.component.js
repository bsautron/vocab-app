import React from "react";
import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { CardStyles } from "../../styles";
import { PreviewTitle } from "./preview-title.component";
import { PreviewSentences } from "./preview-sentences.component";
import { Card } from "@ui-kitten/components";

export function Preview({ preview, highlights, opened, onPress }) {
  return (
    <View>
      <Card style={styles.card}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.row}>
            <View style={{ width: "50%", height: 100 }}>
              <Image
                source={{ uri: preview.categories.image }}
                style={styles.image}
              />
            </View>

            <View style={{ width: "50%" }}>
              <PreviewTitle preview={preview} highlights={highlights} />
            </View>
          </View>
          <PreviewSentences
            preview={preview}
            highlights={highlights}
            opened={opened}
          />
        </TouchableOpacity>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...CardStyles.cardDefault,
    marginBottom: 30,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 15,
  },
});
