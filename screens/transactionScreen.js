import * as React from 'react';
import {View,Text,StyleSheet} from 'react-native';

export default class TransactionScreen extends React.Component{
    render(){
        return(
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 200
            }}>
                <Text>Transaction Screen</Text>
            </View>
        )
    }
}