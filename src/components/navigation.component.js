import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../pages/home.component';
import { PracticeScreen } from '../pages/practice.component';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { ContextScreen } from '../pages/context.component';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title='PRATIQUER' />
        <BottomNavigationTab title='DETAILS' />
        <BottomNavigationTab title='DASHBOARD' />
    </BottomNavigation>
);

const HomeNavigator = () => (
    <Navigator headerMode='none' tabBar={props => <BottomTabBar {...props} />}>
        <Screen name='Pratiquer' component={PracticeScreen} />
        <Screen name='Details' component={ContextScreen} />
        <Screen name='Dashboard' component={HomeScreen} />
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <HomeNavigator />
    </NavigationContainer>
);
