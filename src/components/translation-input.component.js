import React from 'react'
import { Input, Layout, Button, Icon, ButtonGroup } from '@ui-kitten/components'
import { Pressable } from 'react-native'

/**
 * The input for the translation
 * @param opt.value the value of the input
 * @param opt.onChange the fn to apply for any change of the input
 * @param opt.onSubmit the fn to applay when submit
 */
export default function TranslationInput({
  value,
  readyToNext,
  onChangeText,
  onPressDontKnow,
  onPressSubmit,
  onPressNext,
}) {
  const renderSubmitIcon = (props) => {
    const trimValue = value.trim()
    return <Pressable onPress={() => trimValue && onPressSubmit(trimValue)}>
      <Icon {...props} name='corner-down-left-outline' />
    </Pressable>

  }
  return (
    <Layout>

      <Input
        value={value}
        label='Traduit le mot'
        disabled={readyToNext}
        onChangeText={onChangeText}
        accessoryRight={renderSubmitIcon}
        secureTextEntry={false}
      />
      <ButtonGroup style={{ alignSelf: 'center' }}>
        <Button disabled={readyToNext} onPress={onPressDontKnow} accessoryLeft={(props) => (<Icon {...props} name='person-delete-outline' />)} />
        <Button disabled={!readyToNext} onPress={onPressNext} accessoryLeft={(props) => (<Icon {...props} name='arrow-forward-outline' />)} />
      </ButtonGroup>
    </Layout >

  )
}
