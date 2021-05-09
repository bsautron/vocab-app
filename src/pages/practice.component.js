import React, { useEffect, useState, } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Card, Divider, Icon, Layout, Text, TopNavigation, Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import { gql, useQuery, useLazyQuery } from '@apollo/client'
import { CardStyles } from '../styles'
import Translation from '../components/translation.component.';

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
const RANDOM_WORD_QUERY = gql`
    query RandWord($tags: [String!]) {
        word(filters: { tags: $tags} ) {
            es
            fr
        }
    }

`


export const PracticeScreen = ({ navigation }) => {
    const [inputTag, setInputTag] = useState('')
    const [selectedTag, setSelectedTag] = useState('')
    const { loading: searchTagLoading, error: searchTagError, data: searchTagData } = useQuery(SEARCH_TAG_QUERY, {
        variables: { query: inputTag },
    });
    const [getRandom, { loading: randWordLoading, error: randWordError, data: randWordData }] = useLazyQuery(RANDOM_WORD_QUERY);

    const displayTag = tag => tag.split('/').map(n => `${n[0].toUpperCase()}${n.slice(1).toLowerCase()}`).join(' - ')

    const renderOption = ({ name }) => {
        return <AutocompleteItem
            key={name}
            title={displayTag(name)}
        />
    }

    useEffect(() => {
        if (selectedTag) {
            getRandom()
        }
    }, [selectedTag])
    console.log('randWordData:', randWordData) /* dump variable */
    console.log('randWordError:', randWordError) /* dump variable */
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title='Pratiquer' alignment='center' />
            <Divider />
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Card style={styles.card}>
                    <Text category="h6">{selectedTag?.name ? displayTag(selectedTag.name) : 'Choisisez un thème'}</Text>
                    <Autocomplete
                        placeholder='Ropa'
                        value={inputTag}
                        onSelect={index => setSelectedTag(searchTagData.searchTags[index])}
                        onChangeText={setInputTag}>
                        {searchTagData?.searchTags.map(renderOption)}
                    </Autocomplete>
                </Card>
                {randWordData?.word ? <Translation word={randWordData.word} /> : ''}
            </Layout>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    card: {
        ...CardStyles.cardDefault,
    },

})