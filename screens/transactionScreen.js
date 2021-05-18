import * as React from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        }
    }

    getCameraPermission=async ()=>{
        const {status}= await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermissions: status==='granted',
    scanned: false, scannedData: '', buttonState: 'clicked'});
    }

    handleBarCodeScan=async ({type,data})=>{
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal'
        })
    }

    render(){
        const hasCameraPermissions= this.state.hasCameraPermissions;
        const scanned= this.state.scanned;
        const buttonState= this.state.buttonState;

        if(buttonState==='clicked' && hasCameraPermissions){
            return (
                <BarCodeScanner
                    onBarCodeScanned= {scanned? undefined:this.handleBarCodeScan}
                    style={StyleSheet.absoluteFillObject}
                />
            )
        }else if(buttonState==='normal')
        {
            return(
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 200
                }}>
                    <Text style={{
                        fontSize: 30
                    }}>
                        {hasCameraPermissions ?this.state.scannedData:'Request Camera Permission'}
                    </Text>
    
                    <TouchableOpacity style={{
                        backgroundColor: 'yellow',
                        padding: 10,
                        margin: 10
                    }} 
                    onPress={this.getCameraPermission}>
    
                        <Text style={{
                            fontSize: 15
                        }}>Scan QR Code</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        
    }
}