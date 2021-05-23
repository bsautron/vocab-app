import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Card, Divider, Input, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { CardStyles } from '../styles';
import SubmitInput from '../components/submit-input.component';
import { gql, useQuery } from '@apollo/client'


const SEARCH_CATEGORY_QUERY = gql`
    query {
        categories {
            slug
            es
            fr
            image
        }
    }
`

export const ImmersionScreen = ({ navigation, route }) => {
    const { data } = useQuery(SEARCH_CATEGORY_QUERY)
    const [inputText, setInputText] = useState('')
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title='Immersion' alignment='center' />
            <Divider />
            <Layout style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <Layout style={{ padding: 20, alignItems: 'center' }}>
                        <Layout style={{ marginBottom: 20 }}>
                            <Text category='h5'>Vos premier instant en arrivant dans le pays</Text>
                            <Text category='s1'>Voici ce don't vous aurez besoin pour commencer a parler au gens pour une immersion rapide et efficace</Text>
                        </Layout>
                        <SubmitInput
                            style={{ marginBottom: 30 }}
                            value={inputText}
                            onChangeText={setInputText}
                            onPressSubmit={() => { }}
                            iconName='search-outline'

                        />
                        {data?.categories.map(c => {
                            return <Card key={c.slug} style={styles.card}>
                                <TouchableOpacity onPress={() => navigation.push('ImmersionCate', {
                                    category: c
                                })}>
                                    <Text category='h5' style={styles.text}>{c.fr.split(',')[1]}</Text>
                                    <Image source={`http://localhost:3000/${c.image}`} style={styles.image} />
                                </TouchableOpacity>
                            </Card>

                        })}
                    </Layout>


                    {/* 
                    <TouchableOpacity>
                        <ImageBackground source={require('../../assets/undraw_Order_ride_re_372k.png')} style={styles.image}>
                            <Layout>
                                <Text category='h5' style={styles.text}>Pour se déplacer</Text>
                            </Layout>
                        </ImageBackground>
                    </TouchableOpacity> */}

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
        marginTop: 15,
        marginBottom: 15,
        width: 350,
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
