import { Icon, Input } from '@ui-kitten/components'
import React from 'react'
import { Pressable } from 'react-native'

export default function SubmitInput({
    value,
    onChangeText,
    onPressSubmit,
    disabled,
    iconName,
    label,
    ...props
}) {
    const renderSubmitIcon = (iconProps) => {
        const trimValue = value.trim()
        return <Pressable onPress={() => trimValue && onPressSubmit(trimValue)}>
            <Icon {...iconProps} name={iconName} />
        </Pressable>

    }
    const c = { ...props, style: { marginBottom: 15, ...props.style } }
    return <Input
        {...c}
        value={value}
        label={label}
        disabled={disabled}
        onChangeText={onChangeText}
        accessoryRight={renderSubmitIcon}
        secureTextEntry={false}
    />

}