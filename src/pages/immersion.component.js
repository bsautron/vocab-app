import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Card, Divider, Icon, Input, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { CardStyles } from '../styles';
import SubmitInput from '../components/submit-input.component';
import { gql, useQuery } from '@apollo/client'
import ContextExampleList from '../components/context-example-list';
import { HightlightText } from '../components/highlight-text.component';
import { default as theme } from '../../theme.json';



const CATEGORY_PREVIEW__QUERY = gql`
    query CategoryPreviewes($search: String!) {
        categoryPreviews(search: $search) {
        slug
        es
        fr
        image
        sentencePreviews {
            id
            es
            fr
        }
    }
}
`

export const ImmersionScreen = ({ navigation, route }) => {
    const [inputText, setInputText] = useState('')
    const [indexesOpenCate, setIndexesOpenCate] = useState(new Set())
    const { data } = useQuery(CATEGORY_PREVIEW__QUERY, { variables: { search: inputText } })
    const minSize = 2

    useEffect(() => {
        setIndexesOpenCate(new Set())
    }, [inputText])

    const keyWords = inputText.split(' ').filter(s => !!s.length)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title='Immersion' alignment='center' />
            <Divider />
            <Layout style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <Layout style={{ paddingTop: 20, marginBottom: 20, marginHorizontal: 15 }}>
                        <Text category='h5'>Vos premier instant en arrivant dans le pays</Text>
                        <Text category='s1'>Voici ce don't vous aurez besoin pour commencer a parler au gens pour une immersion rapide et efficace</Text>
                        <SubmitInput
                            style={{ marginVertical: 30, }}
                            placeholder='Mots clés : bus plage ...'
                            value={inputText}
                            onChangeText={setInputText}
                            onPressSubmit={() => { }}
                            iconName='search-outline'
                        />
                    </Layout>
                    <Layout style={{ paddingHorizontal: 20, alignItems: 'stretch' }}>
                        {data?.categoryPreviews.map((c, i) => {
                            const title = c.fr.split(', ')[1]
                            return <Card key={c.slug} style={styles.card}>
                                <TouchableOpacity onPress={() => {
                                    const newSet = new Set(indexesOpenCate.values())
                                    if (newSet.has(i)) { newSet.delete(i) }
                                    else { newSet.add(i) }
                                    setIndexesOpenCate(newSet)
                                }}>
                                    <Text category='h5' style={styles.text}>{title[0].toUpperCase() + title.slice(1)}</Text>
                                    <Image source={`http://localhost:3000/${c.image}`} style={styles.image} />

                                    {
                                        c.sentencePreviews.slice(0, indexesOpenCate.has(i) ? undefined : 2).map(s => {
                                            return <View key={s.id} style={{ marginBottom: 10, flexDirection: 'column' }}>
                                                <HightlightText
                                                    category='p1'
                                                    text={`“${s.fr}”`}
                                                    hightlights={keyWords}
                                                    colorHighlight={theme['color-primary-200']} />
                                                <HightlightText
                                                    category='p2'
                                                    text={`${s.es}`}
                                                    hightlights={keyWords}
                                                    color={'#8F9BB3'}
                                                    colorHighlight={theme['color-primary-100']} />
                                            </View>

                                        })
                                    }
                                    {
                                        c.sentencePreviews.length > minSize &&
                                        <Layout style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                            {
                                                indexesOpenCate.has(i) ?
                                                    <>
                                                        <Text category="c1">Voir moin</Text>
                                                        <Icon style={{ marginTop: 4, marginLeft: 5, width: 10, height: 10 }} name='arrowhead-up-outline' />
                                                    </> :
                                                    <>
                                                        <Text category="c1">Voir {c.sentencePreviews.length - minSize} exemple{c.sentencePreviews.length - minSize > 1 ? 's' : ''} de plus</Text>
                                                        <Icon style={{ marginTop: 4, marginLeft: 5, width: 10, height: 10 }} name='arrowhead-down-outline' />
                                                    </>
                                            }
                                        </Layout>
                                    }
                                </TouchableOpacity>
                            </Card>

                        })}
                    </Layout>



                </ScrollView>
            </Layout>

        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    card: {
        ...CardStyles.cardDefault,
        marginBottom: 30,
    },
    image: {
        flex: 1,
        width: '100%',
        height: 150,
        resizeMode: 'contain',
    },
    text: {
        color: "black",
        padding: 5
    }
});
