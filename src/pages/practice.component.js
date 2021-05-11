import React, { useEffect, useState, } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Card, Divider, Icon, Layout, Text, TopNavigation, Autocomplete, AutocompleteItem, Modal, Button } from '@ui-kitten/components';
import { gql, useQuery, useLazyQuery } from '@apollo/client'
import { CardStyles } from '../styles'
import Translation from '../components/translation.component';

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
);
const SEARCH_TAG_QUERY = gql`
    query SearchTags($query: String!){
        searchTags(query: $query) {
            name
        }
    }
`
const RANDOM_WORDS_QUERY = gql`
    query RandWords($tags: [String!]) {
        words(filters: { tags: $tags} ) {
            es
            fr
        }
    }

`

export const PracticeScreen = ({ navigation }) => {
    const [inputTag, setInputTag] = useState('')
    const [selectedTag, setSelectedTag] = useState(null)
    const [displayModal, setDisplayModal] = useState(false)
    const [selectedWord, setSelectedWord] = useState(null)
    const { loading: searchTagLoading, error: searchTagError, data: searchTagData } = useQuery(SEARCH_TAG_QUERY, {
        variables: { query: inputTag },
    });
    const [getRandomWords, { data: randsWordsData }] = useLazyQuery(RANDOM_WORDS_QUERY);

    const displayTag = tag => tag.split('/').map(n => `${n[0].toUpperCase()}${n.slice(1).toLowerCase()}`).join(' - ')

    const renderOption = ({ name }) => {
        return <AutocompleteItem
            key={name}
            title={displayTag(name)}
        />
    }

    const newWords = () => {
        getRandomWords({
            variables: {
                tags: [selectedTag.name]
            }
        })
    }

    const selectWord = () => {
        const listWords = randsWordsData?.words || []
        setSelectedWord(listWords[Math.floor(Math.random() * listWords.length - 1)])
    }

    useEffect(() => {
        if (selectedTag) {
            setInputTag('')
            setDisplayModal(false)
            newWords()
        }
    }, [selectedTag])

    useEffect(selectWord, [randsWordsData])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title='Pratiquer' alignment='center' />
            <Divider />
            <Layout style={{ flex: 1, alignItems: 'center', alignContent: 'center', justifyContent: 'space-between' }}>
                <Layout>
                    {
                        selectedTag?.name ?
                            (
                                <Layout>
                                    <Text category="h2" style={{ alignSelf: 'center' }}>{displayTag(selectedTag.name)}</Text>
                                    <Button size='tiny' appearance='ghost' status='primary' onPress={() => setDisplayModal(true)}>
                                        Changer de thème
                                    </Button>
                                </Layout>
                            ) :
                            (
                                <Layout>
                                    <Button size='large' appearance='ghost' status='primary' onPress={() => setDisplayModal(true)}>
                                        Selectionner un thème
                                    </Button>
                                </Layout>
                            )

                    }
                </Layout>
                <Layout style={{ marginBottom: 50 }}>
                    {selectedWord && <Translation word={selectedWord} onChangeWord={selectWord} />}
                </Layout>
            </Layout>


            <Modal
                visible={displayModal}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setDisplayModal(false)}>
                <Card style={styles.card}>
                    <Text category="h6">Choisisez un thème</Text>
                    <Autocomplete
                        placeholder='ex: Ropa'
                        value={inputTag}
                        onSelect={index => setSelectedTag(searchTagData.searchTags[index])}
                        onChangeText={text => setInputTag(text)}>
                        {searchTagData?.searchTags.map(renderOption)}
                    </Autocomplete>
                </Card>
            </Modal>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    card: {
        ...CardStyles.cardDefault,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

})