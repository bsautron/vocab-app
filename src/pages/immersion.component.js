import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Card, Divider, Input, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { CardStyles } from '../styles';
import SubmitInput from '../components/submit-input.component';


const cats = [
    {
        slug: 'travel/airport',
        locales: {
            fr: 'Voyage, A l\'aéroport',
            es: 'Viaje, En el aeropuerto',
        },
        image: require('../../assets/undraw_journey_lwlj.png'), title: 'Enfin arrivé'
    },
    {
        slug: 'travel/transports',
        image: require('../../assets/undraw_Order_ride_re_372k.png'),
        locales: {
            fr: 'Voyage, Les transports',
            es: 'Viaje, Los transportes',
        },
        title: 'Pour y aller'
    },
    {
        slug: 'travel/eat',
        image: require('../../assets/undraw_special_event_4aj8.png'),
        locales: {
            fr: 'Voyage, Manger',
            es: 'Viaje, Comer',
        },
        title: 'J\'ai faim'
    },
]

export const ImmersionScreen = ({ navigation, route }) => {

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
                        {cats.filter(c => c.title.toLowerCase().includes(inputText.toLowerCase())).map(c => {
                            return <Card style={styles.card}>
                                <TouchableOpacity onPress={() => navigation.push('ImmersionCate', {
                                    category: c
                                })}>
                                    <Text category='h5' style={styles.text}>{c.title}</Text>
                                    <Image source={c.image} style={styles.image} />
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
