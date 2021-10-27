import React from 'react'
import { Layout, Text } from "@ui-kitten/components";
import { View } from 'react-native';
import { HightlightText } from '../../components/highlight-text.component';


// const mapImportantBoldText = primary => important => text => primary
//     ? <Text category={important ? 's1' : 'p1'}>{text} </Text>
//     : <Text category={important ? 's2' : 'p2'} style={{ color: '#8F9BB3' }}>{text} </Text>

// const mapImportantHightlightText = primary => important => text =>
//     <View style={{ padding: 0, margin: 0, flexDirection: 'row' }}>
//         {
//             primary
//                 ? <View style={{ padding: 0, margin: 0, borderRadius: 5, backgroundColor: important ? theme['color-primary-200'] : 'transparent' }}>
//                     <Text category='p1'>{text}</Text>
//                 </View>
//                 : <View style={{ padding: 0, margin: 0, borderRadius: 5, backgroundColor: important ? theme['color-primary-100'] : 'transparent' }}>

//                     <Text category='p2' style={{ color: '#8F9BB3' }}>{text}</Text>
//                 </View>
//         }
//         {/* <Text> </Text> */}
//     </View>


// const renderText = ({ text, pattern, mapTextFn, removePatterns = [] }) => {
//     const splitWord = (str, important) => str.split(' ')
//         .filter(s => s.length)
//         .map(mapTextFn(important))

//     const recusiveRender = (str) => {
//         const matchImportant = str.match(pattern)
//         if (!matchImportant) return <>{splitWord(str)}</>

//         const indexOfMatch = str.indexOf(matchImportant[0])
//         return <>
//             {splitWord(str.slice(0, indexOfMatch))}
//             {splitWord(removePatterns.reduce((acc, pat) => acc.replace(pat, ''), matchImportant[0]), true)}
//             {recusiveRender(str.slice(indexOfMatch + matchImportant[0].length))}
//         </>
//     }

//     return <Layout style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline' }}>
//         {recusiveRender(text)}
//     </Layout>
// }


export default function ContextExample({ fr, es }) {

    return <Layout style={{ flexDirection: 'column', margin: 6 }}>

    </Layout>
}
// {renderText(`${es}`, false, mapImportantBoldText)}

