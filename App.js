import React, { useEffect, useState } from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator } from "./src/components/navigation.component";
import { default as theme } from "./theme.json";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Lato_700Bold,
  Lato_300Light,
  Lato_400Regular,
} from "@expo-google-fonts/lato";
import { DataContext } from "./src/components/data-context.component";
import { normalize } from "./src/utils";

function getTranslations(translations, langs) {
  const ret = [
    translations.find((t) => [langs[0]].includes(t.lang)),
    translations.find((t) => [langs[1]].includes(t.lang)),
  ].filter((data) => !!data);

  if (ret.length !== 2) {
    return null;
  }
  return ret;
}

function mergeTexts(translations) {
  return translations.map((t) => normalize(t.displayText)).join(" ");
}

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function prepareData(database, langs) {
  return {
    categoryPreviews: database.categoryPreviews
      .map((preview) => {
        const categoryTranslations = getTranslations(
          preview.categories.translations,
          langs
        );

        if (!categoryTranslations) return null;

        return {
          categories: {
            ...preview.categories,
            translations: categoryTranslations,
            searchText: mergeTexts(categoryTranslations),
          },
          sentences: preview.sentences
            .map((s) => {
              const sentencesTranslations = getTranslations(
                s.translations,
                langs
              );
              if (!sentencesTranslations) return null;
              return {
                ...s,
                translations: sentencesTranslations,
                searchText: mergeTexts(sentencesTranslations),
              };
            })
            .filter((sentence) => !!sentence),
        };
      })
      .filter((preview) => !!preview),
  };
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [langs, setLangs] = useState(["EN", "ES"]);
  const [fontLoaded] = Font.useFonts({
    Lato700Bold: Lato_700Bold,
    Lato400Regular: Lato_400Regular,
    Lato300Light: Lato_300Light,
  });
  const [database, setDatabase] = useState(null);
  const [filteredDatabase, setFilteredDatabase] = useState(null);

  /** Fetch data base on launch */
  useEffect(() => {
    fetchDatabase();
  }, []);

  /** Set loading false only if database filtered */
  useEffect(() => {
    if (fontLoaded && filteredDatabase) {
      setLoading(false);
    }
  }, [fontLoaded, filteredDatabase]);

  useEffect(() => {
    if (database && langs.length) {
      setFilteredDatabase(prepareData(database, langs));
    }
  }, [database, langs]);

  /** Fn to fetch database*/
  const fetchDatabase = async () => {
    try {
      const response = await fetch(
        "http://163.172.63.65:5000/immersion/database.json"
      );
      const json = await response.json();
      setDatabase(json);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <AppLoading />;
  }
  return (
    <ApolloProvider client={client}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <DataContext.Provider value={filteredDatabase}>
          <AppNavigator />
        </DataContext.Provider>
      </ApplicationProvider>
    </ApolloProvider>
  );
}
