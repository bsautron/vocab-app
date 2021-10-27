import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './src/components/navigation.component';
import { default as theme } from './theme.json';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Lato_700Bold, Lato_300Light, Lato_400Regular } from '@expo-google-fonts/lato';
import { DataContext } from './src/components/data-context.component';
import database from './database.json'


// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});


export default function App() {
  const [loaded] = Font.useFonts({
    CHANGETHENAME_PRIMARY: Lato_700Bold,
    CHANGETHENAME_REGULAR: Lato_400Regular,
    CHANGETHENAME_SECONDARY: Lato_300Light,
  });

  if (!loaded) {
    return <AppLoading />
  }
  return (
    <ApolloProvider client={client}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <DataContext.Provider value={database}>
          <AppNavigator />
        </DataContext.Provider>
      </ApplicationProvider>
    </ApolloProvider>
  )
}