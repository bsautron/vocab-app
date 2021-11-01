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
import databaseLocal from "./database.json";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

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
      const filtered = {
        categoryPreviews: database.categoryPreviews
          .map((preview) => {
            return {
              categories: {
                ...preview.categories,
                translations: [
                  preview.categories.translations.find((t) =>
                    [langs[0]].includes(t.lang)
                  ),
                  preview.categories.translations.find((t) =>
                    [langs[1]].includes(t.lang)
                  ),
                ],
              },
              sentences: preview.sentences.map((s) => {
                return {
                  ...s,
                  translations: [
                    s.translations.find((t) => [langs[0]].includes(t.lang)),
                    s.translations.find((t) => [langs[1]].includes(t.lang)),
                  ],
                };
              }),
            };
          })
          .filter((preview) => {
            return (
              preview.categories.translations[0] &&
              preview.categories.translations[1] &&
              !preview.sentences.find(
                (s) => !s.translations[0] || !s.translations[1]
              )
            );
          }),
      };
      setFilteredDatabase(filtered);
    }
  }, [database, langs]);

  /** Fn to fetch database*/
  const fetchDatabase = async () => {
    try {
      // const response = await fetch(
      //   "http://163.172.63.65:5000/immersion/database.json"
      // );
      // const json = await response.json();
      setDatabase(databaseLocal);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <AppLoading />;
  }
  console.log("filteredDatabase:", filteredDatabase); /* dump variable */

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
