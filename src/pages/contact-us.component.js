import { Text } from "@ui-kitten/components";
import React from "react";
import { LayoutPage } from "../components/layout.component";
function LocalHeader({}) {
  return (
    <>
      <Text style={{ fontFamily: "Lato700Bold" }} category="h5">
        Help us to develop this application
      </Text>
    </>
  );
}

export class ContactUs extends React.PureComponent {
  render() {
    return (
      <LayoutPage title="Contact us" header={<LocalHeader />}>
        <Text>We need you to be able to propose strong recommendation</Text>
      </LayoutPage>
    );
  }
}
