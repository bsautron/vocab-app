import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../components/data-context.component";
import { LayoutPage } from "../components/layout.component";
import { Preview } from "../components/preview/preview.component";
import { Text, Button } from "@ui-kitten/components";
import SubmitInput from "../@next/components/submit-input.component";
import { normalize, logEvents } from "../utils";
import { default as theme } from "../../theme.json";
import { View, Linking } from "react-native";
import * as Amplitude from "expo-analytics-amplitude";

/** Local header for the layout */
function LocalHeader() {
  return (
    <>
      <Text style={{ fontFamily: "Lato700Bold" }} category="h5">
        Your first moments when you arrive in a country
      </Text>
      <Text style={{ fontFamily: "Lato400Regular" }} category="s1">
        Here's what you'll need to start talking to people for a quick and
        effective immersion
      </Text>
    </>
  );
}

function filterData(categoryPreviews, keyWords = []) {
  return categoryPreviews
    .map((raw) => {
      let score = 0;
      const findMatchedCate = keyWords.filter((keyWord) =>
        raw.categories.searchText.match(keyWord)
      );
      score += findMatchedCate.join("").length * 1.12;

      const sentences = raw.sentences
        .map((sentence) => {
          const sentenceScore = keyWords
            .filter((keyWord) => sentence.searchText.match(keyWord))
            .join("").length;
          score += sentenceScore;
          return {
            ...sentence,
            score: sentenceScore,
          };
        })
        .sort((a, b) => b.score - a.score);
      return {
        ...raw,
        sentences: sentences,
        score,
      };
    })
    .filter((preview) => preview.score)
    .sort((a, b) => {
      return b.score - a.score;
    });
}

export const ImmersionScreen = ({ navigation, route }) => {
  const { categoryPreviews } = useContext(DataContext);

  const [inputText, setInputText] = useState("");
  const [slugOpenCate, setSlugOpenCate] = useState(null);
  const [data, setData] = useState(categoryPreviews);
  const keyWords = inputText
    .trim()
    .split(" ")
    .map((k) => normalize(k))
    .filter((k) => !!k.length);

  useEffect(() => {
    setSlugOpenCate(null);
    logEvents("Immersion", "Search", { text: inputText });
  }, [inputText]);

  useEffect(() => {
    if (inputText.length === 0) {
      setData(categoryPreviews);
    } else {
      setData(filterData(categoryPreviews, keyWords));
    }
  }, [inputText]);

  const onPressCategory = (slug) => {
    const isToOpen = slug !== slugOpenCate;
    if (isToOpen) {
      logEvents("Immersion", "Click category", { open: true, slug });
      setSlugOpenCate(slug);
    } else {
      logEvents("Immersion", "Click category", { open: false, slug });
      setSlugOpenCate(null);
    }
  };
  return (
    <LayoutPage title="Immersion" header={<LocalHeader />}>
      <SubmitInput
        style={{ marginVertical: 30 }}
        placeholder="Key words : bus beach ..."
        value={inputText}
        onChangeText={setInputText}
        onPressSubmit={() => {}}
        iconName="search-outline"
      />
      {data.map((preview, i) => (
        <Preview
          key={preview.categories.slug}
          opened={slugOpenCate === preview.categories.slug}
          preview={preview}
          highlights={keyWords}
          onPress={() => onPressCategory(preview.categories.slug)}
        />
      ))}

      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: data.length ? 60 : 0,
          marginBottom: 160,
        }}
      >
        <Text category="h6">Do you like this app ?</Text>
        <View style={{ marginTop: 20, marginBottom: 30 }}>
          <Text>• If you want more content</Text>
          <Text>• If you have recommendations</Text>
          <Text>• If you have troubles</Text>
        </View>
        <Button
          appearance="outline"
          status="primary"
          onPress={() => {
            logEvents("Immersion", "Click email");
            Linking.openURL("mailto:immersion@sautron.io");
          }}
        >
          Please : immersion@sautron.io
        </Button>
      </View>
    </LayoutPage>
  );
};
