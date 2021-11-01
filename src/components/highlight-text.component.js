import { Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { normalize } from "../utils";
import { findAll } from "highlight-words-core";

export default function Highlighter({
  autoEscape,
  highlightStyle,
  searchWords,
  textToHighlight,
  sanitize,
  style,
  category,
  ...props
}) {
  const chunks = findAll({
    textToHighlight,
    searchWords,
    sanitize,
    autoEscape,
  });

  return (
    <Text style={style} category={category} {...props}>
      {chunks.map((chunk, index) => {
        const text = textToHighlight.substr(
          chunk.start,
          chunk.end - chunk.start
        );

        return !chunk.highlight ? (
          text
        ) : (
          <Text
            key={index}
            style={chunk.highlight && highlightStyle}
            category={category}
          >
            {text}
          </Text>
        );
      })}
    </Text>
  );
}

export function HighlightText({
  category,
  text,
  highlights,
  colorHighlight,
  color,
  numberOfLines,
}) {
  return (
    <Highlighter
      category={category}
      highlightStyle={{
        fontFamily: "Lato400Regular",
        backgroundColor: colorHighlight,
      }}
      searchWords={highlights}
      style={{ fontFamily: "Lato400Regular", color: color }}
      textToHighlight={text}
    />
  );
}
