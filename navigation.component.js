import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './home.component';
import { DetailsScreen } from './details.component';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title='HOME' />
        <BottomNavigationTab title='DETAIL' />
    </BottomNavigation>
);

const HomeNavigator = () => (
    <Navigator headerMode='none' tabBar={props => <BottomTabBar {...props} />}>
        <Screen name='Home' component={HomeScreen} />
        <Screen name='Details' component={DetailsScreen} />
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <HomeNavigator />
    </NavigationContainer>
);
