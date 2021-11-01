import {
  Divider,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Spinner,
  Card,
} from "@ui-kitten/components";
import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ContextExampleList from "../components/context-example-list";
import Breadcrumb from "../components/breadcrumb.component";
import { gql, useQuery } from "@apollo/client";
import { CardStyles } from "../../styles";

const GET_SENTENCES_QUERY = gql`
  query ($categoryId: String!) {
    sentences(filters: { category: { id: $categoryId } }) {
      es
      fr
    }
  }
`;
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const TopNavigationActionSimpleUsageShowcase = () => (
  <TopNavigationAction icon={BackIcon} />
);
export default function ImmersionCateScreen({ navigation, route }) {
  const { category } = route?.params || { category: null };

  const { loading, data } = useQuery(GET_SENTENCES_QUERY, {
    variables: { categoryId: category?.id || "" },
  });
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Immersion par catégorie"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={{ flex: 1, padding: 20 }}>
        {category && (
          <Image
            source={`http://localhost:3000/${category.image}`}
            style={styles.image}
          />
        )}
        <Layout style={{ height: 80 }}>
          <Layout style={styles.layout}>
            <Breadcrumb
              textEdit="Changer de catégorie"
              items={category ? category.fr.split(", ") : []}
              onPress={navigateBack}
            />
          </Layout>
        </Layout>
        {loading ? (
          <Spinner />
        ) : (
          <ContextExampleList list={data?.sentences || []} />
        )}
        <TouchableOpacity>
          <Card style={styles.plusCard}>
            <Icon style={{ with: 30, height: 30 }} name="plus-outline" />
          </Card>
        </TouchableOpacity>
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
  },
  plusCard: {
    marginTop: 30,
    ...CardStyles.cardDefault,
  },
});
