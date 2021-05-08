import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { IndexPath, Button, Divider, Layout, TopNavigation, Select, SelectGroup, SelectItem } from '@ui-kitten/components';
// import { dic } from './db.json'
import { gql, useQuery } from '@apollo/client'
import { Spinner } from '@ui-kitten/components';
import { Card, Text } from '@ui-kitten/components';


const WORD_QUERY = gql`
  query {
    word {
      fr,
      es,
      tags {
        name
      }
    }
  }
`

// /**
//  * Return all possible tags in the dic
//  */
// function getAllTags() {
//     const tagsMap = new Map()
//     dic.forEach((word) => {
//         for (const wTag of word.tags) {
//             const [section, ...subSection] = wTag.split('/')
//             const currentSubSection = tagsMap.has(section) ? tagsMap.get(section) : new Set()

//             currentSubSection.add(subSection.join('/'))
//             tagsMap.set(section, currentSubSection)
//         }
//     })

//     return Array.from(tagsMap.entries()).map(([section, subSection]) => {
//         return [section, Array.from(subSection)]
//     })

// }

// const allTags = getAllTags()

export const HomeScreen = ({ navigation }) => {

  const [selectedIndex, setSelectedIndex] = React.useState();
  const [multiSelectedIndex, setMultiSelectedIndex] = React.useState([]);
  const { data, loading } = useQuery(WORD_QUERY)

  const groupDisplayValues = multiSelectedIndex.map(index => {
    return `${allTags[index.section][0]}/${allTags[index.section][1][index.row]}`
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Dashboard' alignment='center' />
      <Divider />
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//     select: {
//         width: 250,
//         flex: 1,
//         marginTop: 10,
//     },
// });




// <Layout style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
// <Select
//     style={styles.select}
//     multiSelect={true}
//     placeholder='Liste de theme'
//     selectedIndex={multiSelectedIndex}
//     value={groupDisplayValues.join(', ')}
//     onSelect={index => setMultiSelectedIndex(index)}>
//     {
//         allTags.map(([section, subSections]) => {
//             return <SelectGroup key={section} title={section}>
//                 {
//                     subSections.map(subSection => {
//                         return <SelectItem key={subSection} title={subSection} />
//                     })
//                 }
//             </SelectGroup>

//         })
//     }
// </Select>
// <Card>
//     {
//         loading ? <Spinner /> : <Text>{data.word.fr}</Text>
//     }

// </Card>
// </Layout>
