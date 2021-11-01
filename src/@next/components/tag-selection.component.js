import {
  Autocomplete,
  AutocompleteItem,
  Button,
  ButtonGroup,
  Card,
  Icon,
  Layout,
  Modal,
  Text,
} from "@ui-kitten/components";
import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { CardStyles } from "../styles";
import Breadcrumb from "./breadcrumb.component";
import { StyleSheet, TouchableOpacity } from "react-native";

const SEARCH_TAG_QUERY = gql`
  query SearchTags($query: String!) {
    searchTags(query: $query) {
      fr
      es
      slug
    }
  }
`;
export default function TagSelection({ onSelectTag }) {
  const [inputTag, setInputTag] = useState("");
  const [tag, setTag] = useState("");
  const [displayModal, setDisplayModal] = useState(false);
  const { data } = useQuery(SEARCH_TAG_QUERY, {
    variables: { query: inputTag },
  });

  useEffect(() => {
    if (tag) {
      setInputTag("");
      setDisplayModal(false);
      onSelectTag(tag);
    }
  }, [tag]);

  const renderOption = ({ slug, fr }) => {
    return <AutocompleteItem key={slug} title={fr} />;
  };

  return (
    <Layout style={{ height: 80 }}>
      <Layout style={styles.layout}>
        {tag ? (
          <Breadcrumb
            textEdit="Thème"
            onPress={() => setDisplayModal(true)}
            items={tag.split("/")}
          />
        ) : (
          <Button
            size="large"
            appearance="ghost"
            status="primary"
            onPress={() => setDisplayModal(true)}
          >
            Selectionner un thème
          </Button>
        )}
      </Layout>
      <Modal
        visible={displayModal}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setDisplayModal(false)}
      >
        <Card style={styles.modelCard}>
          <Text style={styles.label} category="h6">
            Choisis un thème
          </Text>
          <Autocomplete
            placeholder="ex: Vetements"
            value={inputTag}
            onSelect={(index) => setTag(data.searchTags[index].slug)}
            onChangeText={(text) => setInputTag(text)}
          >
            {data?.searchTags.map(renderOption)}
          </Autocomplete>
        </Card>
      </Modal>
    </Layout>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  modelCard: {
    ...CardStyles.cardDefault,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  label: {
    marginBottom: 40,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
