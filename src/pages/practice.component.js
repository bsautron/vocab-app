import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, Animated } from 'react-native';
import { Card, Divider, Icon, Layout, Text, TopNavigation, Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import { gql, useQuery } from '@apollo/client'

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


export const PracticeScreen = ({ navigation }) => {
    const [inputTag, setInputTag] = useState('')
    const [selectedTag, setSelectedTag] = useState('')
    const { loading, error, data } = useQuery(SEARCH_TAG_QUERY, {
        variables: { query: inputTag },
    });
    const transCardAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
    const displayInputAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0


    useEffect(() => {
        if (selectedTag) {
            Animated.parallel([
                Animated.timing(transCardAnim, { toValue: -200, duration: 500, }),
            ]).start();
        }
    }, [selectedTag])


    const displayTag = (tag) => tag.split('/').map(n => `${n[0].toUpperCase()}${n.slice(1).toLowerCase()}`).join(' - ')

    const renderOption = ({ name }) => {
        return <AutocompleteItem
            key={name}
            title={displayTag(name)}
        />
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title='Pratiquer' alignment='center' />
            <Divider />
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Animated.View                 // Special animatable View
                    style={{
                        position: 'relative',
                        top: transCardAnim,
                    }}
                >
                    <Card style={{ border: '0', boxShadow: '0 8px 20px 0 rgb(218 224 235 / 60%)' }}>
                        <Text category="h6">{selectedTag?.name ? displayTag(selectedTag.name) : 'Choisisez un thème'}</Text>
                        <Autocomplete
                            placeholder='Ropa'
                            value={inputTag}
                            onSelect={index => setSelectedTag(data.searchTags[index])}
                            onChangeText={setInputTag}>
                            {data?.searchTags.map(renderOption)}
                        </Autocomplete>
                    </Card>
                </Animated.View>

            </Layout>
        </SafeAreaView>
    );
};