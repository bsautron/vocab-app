import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Card, Divider, Icon, Input, Layout, Text, TopNavigation } from '@ui-kitten/components';
import SubmitInput from '../components/submit-input.component';
import { CardStyles } from '../styles';
import { gql, useQuery } from '@apollo/client'
import ContextExampleList from '../components/context-example-list';
import { HightlightText } from '../components/highlight-text.component';
import { default as theme } from '../../theme.json';


function normalize(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}

// const CATEGORY_PREVIEW__QUERY = gql`
//     query CategoryPreviewes($search: String!) {
//         categoryPreviews(search: $search) {
//         slug
//         es
//         fr
//         image
//         sentencePreviews {
//             id
//             es
//             fr
//         }
//     }
// }
// `

const database = [
    {
        categories: {
            image: 'http://163.172.63.65:5000/immersion/categories/basics-airport.png',
            slug: 'basics/airport',
            translations: [
                { lang: 'FR', displayText: 'Á l\'aéroport' },
                { lang: 'ES', displayText: 'En el aeropuerto' },
            ]
        },
        sentences: [
            {
                slug: 'airport/howtogettothecenter',
                translations: [
                    { lang: 'FR', displayText: 'Comment aller au centre ville ?', },
                    { lang: 'ES', displayText: '¿ Cómo ir al centro ?' }
                ]
            },
            {
                slug: 'airport/whereistheexit',
                translations: [
                    { lang: 'FR', displayText: 'Où est la sortie ?', },
                    { lang: 'ES', displayText: '¿ Dónde está la salida ?' }
                ]
            },
            {
                slug: 'airport/whereisthebathroom',
                translations: [
                    { lang: 'FR', displayText: 'Où sont les toilettes ?' },
                    { lang: 'ES', displayText: '¿ Dónde están los baños ?' }
                ]
            },
            {
                slug: 'airport/iwanttochangemymoney',
                translations: [
                    { lang: 'FR', displayText: 'Je veux changer mon argent', },
                    { lang: 'ES', displayText: 'Quiero cambiar mi dinero' }
                ]
            },
        ]
    },
    {
        categories: {
            image: 'http://163.172.63.65:5000/immersion/categories/basics-transports.png',
            slug: 'basics/transports',
            translations: [
                { lang: 'FR', displayText: 'Dans les transports' },
                { lang: 'ES', displayText: 'En los transportes' },
            ]
        },
        sentences: [
            {
                slug: 'transport/tellmewhentogodown',
                translations: [
                    { lang: 'FR', displayText: 'Dites moi quand je dois descendre' },
                    { lang: 'ES', displayText: 'Dime cuando tengo que bajar' },
                ]
            }
        ]
    },
    {
        categories: {
            image: 'http://163.172.63.65:5000/immersion/categories/basics-restaurant.png',
            slug: 'basics/eat',
            translations: [
                { lang: 'FR', displayText: 'J\'ai faim' },
                { lang: 'FR', displayText: 'Tengo hambre' }
            ]
        },
        sentences: [
            {
                slug: 'eat/iwantthevegetariandish',
                translations: [
                    { lang: 'FR', displayText: 'Je veux le plat végétarien' },
                    { lang: 'ES', displayText: 'Quiero el plato vegetariano' },
                ]
            },
            {
                slug: 'eat/meatless',
                translations: [
                    { lang: 'FR', displayText: 'Sans viande' },
                    { lang: 'ES', displayText: 'Sin carne' },
                ]
            },
            {
                slug: 'eat/onebeer',
                translations: [
                    { lang: 'FR', displayText: 'Une bière' },
                    { lang: 'ES', displayText: 'Una cerveza' },
                ]
            }
        ]
    }
]

export const ImmersionScreen = ({ navigation, route }) => {
    
    const [inputText, setInputText] = useState('')
    const [indexesOpenCate, setIndexesOpenCate] = useState(new Set())
    // const { loading, data } = useQuery(CATEGORY_PREVIEW__QUERY, { variables: { search: inputText } })
    const minSize = 2
    const [data, setData] = useState(database)
    const keyWords = inputText.split(' ').filter(s => !!s.length)

    useEffect(() => {
        setIndexesOpenCate(new Set())
    }, [inputText])

    useEffect(() => {
        if (inputText.length === 0) {
            setData(database)
        } else {
            setData(database.filter(raw => {
                const findMatchedCate = raw.categories.translations.find(translation => {
                    return keyWords.find(keyWord => {
                        return normalize(translation.displayText).match(normalize(keyWord))
                    })
                })
                const findSentence = raw.sentences.find(sentences => {
                    return sentences.translations.find(translation => {
                        return keyWords.find(keyWord => {
                            return normalize(translation.displayText).match(normalize(keyWord))
                        })
                    })
                })

                raw.sentences = raw.sentences.sort((s1) => {
                    const matched = s1.translations.find(translation => {
                        return keyWords.find(keyWord => {
                            return normalize(translation.displayText).match(normalize(keyWord))
                        })
                    })
                    if (matched) return -1
                    return 1
                })
                if (findMatchedCate || findSentence) {
                    return true
                }
                return false
            }))
        }
    }, [inputText])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title='Immersion' alignment='center' />
            <Divider />
            <Layout style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <Layout style={{ paddingTop: 20, marginBottom: 20, marginHorizontal: 15 }}>
                        <Text style={{ fontFamily: 'CHANGETHENAME_PRIMARY' }} category='h5'>Vos premier instant en arrivant dans le pays</Text>
                        <Text style={{ fontFamily: 'CHANGETHENAME_REGULAR' }} category='s1'>Voici ce don't vous aurez besoin pour commencer a parler au gens pour une immersion rapide et efficace</Text>
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
                        {data.map(({ categories, sentences }, i) => {
                            return <Card key={categories.slug} style={styles.card}>
                                <TouchableOpacity onPress={() => {
                                    const newSet = new Set(indexesOpenCate.values())
                                    if (newSet.has(i)) { newSet.delete(i) }
                                    else { newSet.add(i) }
                                    setIndexesOpenCate(newSet)
                                }}>
                                    <HightlightText
                                        category='h5'
                                        color={'black'}
                                        text={categories.translations[0].displayText[0].toUpperCase() + categories.translations[0].displayText.slice(1)}
                                        hightlights={keyWords}
                                        colorHighlight={theme['color-primary-300']} />
                                    <HightlightText
                                        text={categories.translations[1].displayText[0].toUpperCase() + categories.translations[1].displayText.slice(1)}
                                        hightlights={keyWords}
                                        color={'#8F9BB3'}
                                        colorHighlight={theme['color-primary-200']} />
                                    {/* <Text style={{ fontFamily: 'CHANGETHENAME_PRIMARY' }} category='h5' style={styles.text}>{title[0].toUpperCase() + title.slice(1)}</Text> */}
                                    <Image source={{ uri: categories.image }} style={styles.image} />

                                    {
                                        sentences.slice(0, indexesOpenCate.has(i) ? undefined : minSize).map(sentence => {
                                            return <View key={sentence.slug} style={{ marginBottom: 10, flexDirection: 'column' }}>
                                                <HightlightText
                                                    category='p1'
                                                    text={`“${sentence.translations[0].displayText}”`}
                                                    color={'black'}
                                                    hightlights={keyWords}
                                                    colorHighlight={theme['color-primary-300']} />
                                                <HightlightText
                                                    category='p2'
                                                    text={`${sentence.translations[1].displayText}`}
                                                    hightlights={keyWords}
                                                    color={'#8F9BB3'}
                                                    colorHighlight={theme['color-primary-200']} />
                                            </View>

                                        })
                                    }
                                    {
                                        sentences.length > minSize &&
                                        <Layout style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                            {
                                                indexesOpenCate.has(i) ?
                                                    <>
                                                        <Text style={{ fontFamily: 'CHANGETHENAME_REGULAR' }} category="c1">Voir moin</Text>
                                                        <Icon style={{ marginTop: 4, marginLeft: 5, width: 10, height: 10 }} name='arrowhead-up-outline' />
                                                    </> :
                                                    <>
                                                        <Text style={{ fontFamily: 'CHANGETHENAME_REGULAR' }} category="c1">Voir {sentences.length - minSize} exemple{sentences.length - minSize > 1 ? 's' : ''} de plus</Text>
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
