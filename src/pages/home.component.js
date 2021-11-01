import React from "react";
import { SafeAreaView } from "react-native";
import { Divider, TopNavigation } from "@ui-kitten/components";

export const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="Dashboard" alignment="center" />
      <Divider />
    </SafeAreaView>
  );
};
