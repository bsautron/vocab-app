import { Icon, Layout, Button, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import { IconsStyles, SkeletonStyles } from "../styles";
/**
 * Display an attempt, green if it's valid, red otherwise
 * @param opt.valid if the attempt is valid or not
 * @param opt.hidden hide the attempt and keep the reserved space in the page
 * @param opt.text the text of the attempt
 */
export default function Attempt({
  valid,
  hidden,
  skeleton,
  index,
  isLast,
  text,
}) {
  if (skeleton) {
    const allWidth = [65, 75, 85, 95].reverse();
    const skWidth = allWidth[Math.floor(index % allWidth.length)];
    if (isLast) {
      return (
        <Layout style={styles.layout}>
          <Icon style={styles.icon} name="checkmark-outline" />
          <Layout
            style={{
              ...SkeletonStyles.textSkeleton,
              height: 3,
              width: skWidth,
            }}
          />
        </Layout>
      );
    } else {
      return (
        <Layout style={styles.layout}>
          <Icon style={styles.icon} name="close-outline" />
          <Layout
            style={{
              ...SkeletonStyles.textSkeleton,
              height: 2,
              width: skWidth,
            }}
          />
        </Layout>
      );
    }
  }
  if (hidden === true) {
    return <Layout style={styles.layout}></Layout>;
  }
  if (valid) {
    return (
      <Layout style={styles.layout}>
        <Icon style={styles.icon} name="checkmark-outline" />
        <Text status="success" style={styles.valid} category="c2">
          {text}
        </Text>
      </Layout>
    );
  } else {
    return (
      <Layout style={styles.layout}>
        <Icon style={styles.icon} name="close-outline" />
        <Text status="danger" style={styles.unvalid} category="c1">
          {text}
        </Text>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 40,
  },
  icon: {
    ...IconsStyles.size,
  },
  valid: {},
  button: {
    margin: 2,
  },
  unvalid: {
    textDecorationLine: "line-through",
  },
});
