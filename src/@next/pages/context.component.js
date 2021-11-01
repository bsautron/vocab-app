import React, { useEffect, useState } from "react";
import {
  Divider,
  Layout,
  Input,
  Spinner,
  Icon,
  Text,
  TopNavigation,
} from "@ui-kitten/components";
import { gql, useLazyQuery } from "@apollo/client";
import { Pressable, SafeAreaView, ScrollView } from "react-native";
import ContextExample from "../components/context-example.component";
import SubmitInput from "../components/submit-input.component";

const GET_CONTEXT_QUERY = gql`
  query GetContext($word: String!) {
    getContextTranslation(from: $word) {
      translation
      partOfSpeech
      examples {
        es
        fr
      }
    }
  }
`;

export const ContextScreen = ({ route, navigation }) => {
  const params = route?.params;
  const preWord = params?.preWord;
  const [inputText, setInputText] = useState("");
  const [getContext, { loading, error, data }] =
    useLazyQuery(GET_CONTEXT_QUERY);

  const goGetCtx = (word) =>
    word && word.trim() && getContext({ variables: { word: word.trim() } });

  useEffect(() => {
    if (preWord) {
      setInputText(preWord);
      goGetCtx(preWord);
    }
  }, [preWord]);

  const listTrad =
    data?.getContextTranslation.filter((item) => item.examples.length) || [];

  const renderListTrad = listTrad?.length ? (
    listTrad.map((item) => {
      return (
        <Layout
          style={{
            marginBottom: 20,
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Layout
            style={{ flexDirection: "row", justifyContent: "flex-start" }}
          >
            <Text category="h5">{item.translation}</Text>
            <Text status="primary" category="c2">
              {item.partOfSpeech}
            </Text>
          </Layout>
          {item.examples.map((ex) => (
            <ContextExample fr={ex.fr} es={ex.es} />
          ))}
        </Layout>
      );
    })
  ) : (
    <Text category="s1">
      {data && !listTrad.length
        ? "Nos n'avons pas trouver de traduction pour ce mot"
        : ""}
    </Text>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="Détails" alignment="center" />
      <Divider />

      <Layout style={{ padding: 20, flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <Layout
            style={{
              marginBottom: 20,
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <Text style={{ marginRight: 6 }} category="h3">
              Francais
            </Text>
            <Icon
              style={{ marginRight: 6, height: 30, width: 30 }}
              name="arrow-forward-outline"
            />
            <Text category="h3">Español</Text>
          </Layout>
          <SubmitInput
            value={inputText}
            onChangeText={setInputText}
            onPressSubmit={() => goGetCtx(inputText)}
            iconName="corner-down-left-outline"
          />
          {loading ? (
            <Layout
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner />
            </Layout>
          ) : (
            renderListTrad
          )}
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};
