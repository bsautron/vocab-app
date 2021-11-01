import React from "react";
import { View, Text } from "react-native";
import { HighlightText } from "../highlight-text.component";
import { default as theme } from "../../../theme.json";

export function PreviewTitle({ preview, highlights }) {
  return (
    <View>
      <HighlightText
        numberOfLines={1}
        category="h5"
        color={"black"}
        text={
          preview.categories.translations[0].displayText[0].toUpperCase() +
          preview.categories.translations[0].displayText.slice(1)
        }
        highlights={highlights}
        colorHighlight={theme["color-primary-300"]}
      />
      <HighlightText
        numberOfLines={1}
        text={
          preview.categories.translations[1].displayText[0].toUpperCase() +
          preview.categories.translations[1].displayText.slice(1)
        }
        highlights={highlights}
        color={"#8F9BB3"}
        colorHighlight={theme["color-primary-200"]}
      />
    </View>
  );
}
