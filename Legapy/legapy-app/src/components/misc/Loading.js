import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { Spinner } from 'native-base'
import Colors from '../../styles/Colors'

const Loading = () => (
    <View style={{
        position: 'absolute',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
    }}
    >

        <Spinner size="large" color={Colors.secondary} />
    </View>
)

export default Loading
