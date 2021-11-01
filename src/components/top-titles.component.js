import React from "react";

export class TopTitle extends React.PureComponent {
  render() {
    return (
      <Layout
        style={{ paddingTop: 20, marginBottom: 20, marginHorizontal: 15 }}
      >
        <Text style={{ fontFamily: "Lato700Bold" }} category="h5">
          {this.props.primary}
        </Text>
        <Text style={{ fontFamily: "Lato400Regular" }} category="s1">
          {this.props.secondary}
        </Text>
      </Layout>
    );
  }
}
