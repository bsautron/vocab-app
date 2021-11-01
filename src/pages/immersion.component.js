import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../components/data-context.component";
import { LayoutPage } from "../components/layout.component";
import { Preview } from "../components/preview/preview.component";
import { Text } from "@ui-kitten/components";
import SubmitInput from "../@next/components/submit-input.component";
import { normalize } from "../utils";

/** Local header for the layout */
function LocalHeader() {
  return (
    <>
      <Text style={{ fontFamily: "Lato700Bold" }} category="h5">
        Vos premier instant en arrivant dans le pays
      </Text>
      <Text style={{ fontFamily: "Lato400Regular" }} category="s1">
        Voici ce don't vous aurez besoin pour commencer a parler au gens pour
        une immersion rapide et efficace
      </Text>
    </>
  );
}

export const ImmersionScreen = ({ navigation, route }) => {
  const { categoryPreviews } = useContext(DataContext);

  const [inputText, setInputText] = useState("");
  const [slugOpenCate, setSlugOpenCate] = useState(null);
  const [data, setData] = useState(categoryPreviews);
  const keyWords = inputText
    .trim()
    .split(" ")
    .filter((k) => !!k.length);

  useEffect(() => {
    setSlugOpenCate(null);
  }, [inputText]);

  useEffect(() => {
    if (inputText.length === 0) {
      setData(categoryPreviews);
    } else {
      setData(
        categoryPreviews.filter((raw) => {
          // const allTexts = [
          //   raw.categories.translations.map((t) => normalize(t.displayText)),
          // ];
          const findMatchedCate = raw.categories.translations.find(
            (translation) => {
              return keyWords.find((keyWord) => {
                return normalize(translation.displayText).match(
                  normalize(keyWord)
                );
              });
            }
          );
          const findSentence = raw.sentences.find((sentences) => {
            return sentences.translations.find((translation) => {
              return keyWords.find((keyWord) => {
                return normalize(translation.displayText).match(
                  normalize(keyWord)
                );
              });
            });
          });

          raw.sentences = raw.sentences.sort((s1) => {
            const matched = s1.translations.find((translation) => {
              return keyWords.find((keyWord) => {
                return normalize(translation.displayText).match(
                  normalize(keyWord)
                );
              });
            });
            if (matched) return -1;
            return 1;
          });
          if (findMatchedCate || findSentence) {
            return true;
          }
          return false;
        })
      );
    }
  }, [inputText]);

  const onPressCategory = (slug) => {
    setSlugOpenCate(slug !== slugOpenCate ? slug : null);
  };
  return (
    <LayoutPage title="Immersion" header={<LocalHeader />}>
      <SubmitInput
        style={{ marginVertical: 30 }}
        placeholder="Mots clés : bus plage ..."
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
    </LayoutPage>
  );
};
