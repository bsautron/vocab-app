import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Card, Divider, Icon, Layout, Text, TopNavigation, Tooltip, Autocomplete, AutocompleteItem, Modal, Button } from '@ui-kitten/components';
import { gql, useQuery, useLazyQuery } from '@apollo/client'
import { CardStyles } from '../styles'
import Translation from '../components/translation.component';
import TagSelection from '../components/tag-selection.component';

const RANDOM_WORDS_QUERY = gql`
    query RandWords($tags: [String!]) {
        words(filters: { tags: $tags} ) {
            es
            fr
        }
    }

`

export const PracticeScreen = ({ navigation }) => {
    const [selectedWord, setSelectedWord] = useState(null)
    const [getRandomWords, { data: randsWordsData }] = useLazyQuery(RANDOM_WORDS_QUERY);
    const [tag, setTag] = useState(null)

    const newWords = () => {
        getRandomWords({
            variables: {
                tags: [tag]
            }
        })
    }

    const selectWord = () => {
        const listWords = randsWordsData?.words || []
        const length = listWords.length
        const randIndex = Math.floor(Math.random() * length)
        setSelectedWord(listWords[Math.floor(randIndex)])
    }

    useEffect(newWords, [tag])
    useEffect(selectWord, [randsWordsData])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title='Pratiquer' alignment='center' />
            <Divider />

            <Layout style={{ flex: 1, alignItems: 'center', padding: 20, alignContent: 'center', justifyContent: 'flex-start' }}>
                <TagSelection onSelectTag={setTag} />
                <Translation navigation={navigation} word={selectedWord} onChangeWord={selectWord} />
            </Layout>

        </SafeAreaView >
    );
};

