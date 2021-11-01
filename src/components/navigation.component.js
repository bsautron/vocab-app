import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import ImmersionStack from "../pages/immersion.stack.component";
import { ContactUs } from "../pages/contact-us.component";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Immersion" />
    <BottomNavigationTab title="Contact us" />
  </BottomNavigation>
);

const ImmersionNavigator = () => (
  <Navigator
    initialRouteName="ImmersionStack"
    headerMode="none"
    tabBar={(props) => <BottomTabBar {...props} />}
  >
    <Screen name="ImmersionStack" component={ImmersionStack} />
    <Screen name="ContactUs" component={ContactUs} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <ImmersionNavigator />
  </NavigationContainer>
);
