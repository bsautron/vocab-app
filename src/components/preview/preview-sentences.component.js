import { Icon, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { HighlightText } from "../highlight-text.component";
import { default as theme } from "../../../theme.json";

const minSize = 2;

export function PreviewSentences({ preview, highlights, opened }) {
  return (
    <View>
      {preview.sentences
        .slice(0, opened ? undefined : minSize)
        .map((sentence) => {
          return (
            <View
              key={sentence.slug}
              style={{ marginBottom: 10, flexDirection: "column" }}
            >
              <HighlightText
                category="p1"
                text={`“${sentence.translations[0].displayText}”`}
                color={"black"}
                highlights={highlights}
                colorHighlight={theme["color-primary-300"]}
              />
              <HighlightText
                category="p2"
                text={`${sentence.translations[1].displayText}`}
                highlights={highlights}
                color={"#8F9BB3"}
                colorHighlight={theme["color-primary-200"]}
              />
            </View>
          );
        })}
      {preview.sentences.length > minSize && (
        <Layout
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          {opened ? (
            <>
              <Text style={{ fontFamily: "Lato400Regular" }} category="c1">
                See less
              </Text>
              <Icon
                fill="black"
                style={{
                  marginTop: 4,
                  marginLeft: 5,
                  width: 10,
                  height: 10,
                }}
                name="arrowhead-up-outline"
              />
            </>
          ) : (
            <>
              <Text style={{ fontFamily: "Lato400Regular" }} category="c1">
                See {preview.sentences.length - minSize} more example
                {preview.sentences.length - minSize > 1 ? "s" : ""}
              </Text>
              <Icon
                fill="black"
                style={{ marginTop: 4, marginLeft: 5, width: 10, height: 10 }}
                name="arrowhead-down-outline"
              />
            </>
          )}
        </Layout>
      )}
    </View>
  );
}
