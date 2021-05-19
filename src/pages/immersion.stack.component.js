import React from 'react';
import { SafeAreaView } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

import { createStackNavigator } from '@react-navigation/stack';
import { ImmersionScreen } from './immersion.component';
import ImmersionCateScreen from './immersion-cate.component';


const Stack = createStackNavigator();

// const BackIcon = (props) => (
//     <Icon {...props} name='arrow-back' />
// );

// export const TopNavigationActionSimpleUsageShowcase = () => (
//     <TopNavigationAction icon={BackIcon} />
// );

export default function ImmersionStack({ navigation, route }) {
    // const { tag } = route?.params

    // const navigateBack = () => {
    //     navigation.goBack();
    // };

    // const BackAction = () => (
    //     <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
    // );


    return (
        <Stack.Navigator headerMode='none' initialRouteName="Immersion">
            <Stack.Screen name="Immersion" component={ImmersionScreen} />
            <Stack.Screen name="ImmersionCate" component={ImmersionCateScreen} />
        </Stack.Navigator>
    );
};

