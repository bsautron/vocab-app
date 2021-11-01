import {
  Card,
  Icon,
  Layout,
  Modal,
  Spinner,
  Text,
} from "@ui-kitten/components";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import ContextExampleList from "./context-example-list";

export default function ContextTrad({ navigation, word }) {
  const goToCtx = () => {
    navigation.navigate("Details", {
      preWord: word.fr,
    });
  };

  return (
    <Layout style={{ position: "absolute", right: 0, top: 0, zIndex: 1 }}>
      <TouchableOpacity style={{ padding: 10 }} onPress={goToCtx}>
        <Icon
          style={{ height: 20, width: 20 }}
          name="question-mark-circle-outline"
        />
      </TouchableOpacity>
    </Layout>
  );
}
