import { Divider, Icon, Layout, TopNavigation, TopNavigationAction, Spinner } from '@ui-kitten/components';
import React from 'react'
import { Image, SafeAreaView, StyleSheet } from 'react-native';
import ContextExampleList from '../components/context-example-list';
import Breadcrumb from '../components/breadcrumb.component'
import { gql, useQuery } from '@apollo/client'

const GET_SENTENCES_QUERY = gql`
    query($category: String!) {
        getSentencesByCategory(category: $category) {
            locales {
                es
                fr
            }
        }
    }

`
const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
);

export const TopNavigationActionSimpleUsageShowcase = () => (
    <TopNavigationAction icon={BackIcon} />
);
export default function ImmersionCateScreen({ navigation, route }) {

    const { category } = route?.params || { category: null }

    const { data } = useQuery(GET_SENTENCES_QUERY, { variables: { category: category?.slug || '' } });

    const navigateBack = () => {
        navigation.goBack();
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
    );
    return <SafeAreaView style={{ flex: 1 }}>
        <TopNavigation title='Immersion par catégorie' alignment='center' accessoryLeft={BackAction} />
        <Divider />
        <Layout style={{ flex: 1, padding: 20 }}>
            <Layout style={{ height: 80 }}>
                <Layout style={styles.layout}>
                    <Breadcrumb textEdit="Changer de catégorie" items={category ? category.locales.fr.split(', ') : []} onPress={navigateBack} />
                </Layout>
            </Layout>
            {category && <Image source={category.image} style={styles.image} />}
            {!data?.getSentencesByCategory ? <Spinner /> : <ContextExampleList list={data.getSentencesByCategory} />}

        </Layout>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
})