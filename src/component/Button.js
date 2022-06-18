import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';


const Button = (props) => {

    return (
        <TouchableOpacity style={{ ...props.style, ...style.btn }} onPress={props.onPress}>
            <Text style={{ ...style.text, ...props.text }}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#D3D3D3'
    },
    text: {
        fontSize: 12,
        color: '#778899'
    }
})

export default Button;