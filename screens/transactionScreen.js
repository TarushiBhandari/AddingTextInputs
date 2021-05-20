import * as React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,TextInput,Image} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal',
            scannedBookId: '',
            scannedStudentId: ''
        }
    }

    getCameraPermission=async (id)=>{
        const {status}= await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermissions: status==='granted',
    scanned: false, scannedData: '', buttonState: id});
    }

    handleBarCodeScan=async ({type,data})=>{
        const {buttonState}= this.state;

        if(buttonState==="bookId"){
            this.setState({
                scanned: true,
                scannedBookId: data,
                buttonState: 'normal'
            })
        }else if(buttonState==='studentId'){
            this.setState({
                scanned: true,
                scannedStudentId: data,
                buttonState: 'normal'
            })
        }
    }

    render(){
        const hasCameraPermissions= this.state.hasCameraPermissions;
        const scanned= this.state.scanned;
        const buttonState= this.state.buttonState;

        if(buttonState!=='normal' && hasCameraPermissions){
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
                <View>
                    <Image
                        source={require("../assets/booklogo.jpg")}
                        style={{width:200, height:200, alignSelf:'center'}}
                    />
                    <Text style={{textAlign:'center', fontSize:30}}>WIRELESS LIBRARY</Text>
                </View>
                    <View style={styles.inputView}>
                        <TextInput placeholder="Book ID" style={styles.inputBox}
                            value={this.state.scannedBookId}
                        />
                        <TouchableOpacity style={styles.scanButton} onPress={()=>{this.getCameraPermission("bookId")}}>
                            <Text style={styles.buttonText}>Scan</Text>
                        </TouchableOpacity>
                        
                    </View>

                    <View style={styles.inputView}>
                        <TextInput placeholder="Student ID" style={styles.inputBox}
                            value={this.state.scannedStudentId}
                        />
                        <TouchableOpacity style={styles.scanButton} onPress={()=>{this.getCameraPermission("studentId")}}>
                            <Text style={styles.buttonText}>Scan</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
            )
        }

        
    }
}

const styles= StyleSheet.create({
    scanButton: {
        backgroundColor: 'green',
        borderWidth: 1.5
    },

    buttonText: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10
    },

    inputView: {
        flexDirection: 'row',
        margin: 20,
    },

    inputBox: {
        width: 200,
        height: 40,
        borderWidth: 1.5,
        borderRightWidth: 0,
        fontSize: 20
    }
})