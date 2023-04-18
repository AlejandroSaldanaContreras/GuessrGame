import { TextInput, View, StyleSheet, Alert, Text, useWindowDimensions, KeyboardAvoidingView, ScrollView } from 'react-native'
import { useState } from 'react';
import PrimaryButton from '../components/ui/PrimaryButton';
import Colors from '../constants/colors';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';


function StartGameScreen({ onPickNumber}) {

    const [enteredNumber, setEnteredNumber] = useState('');

     const {width, height} = useWindowDimensions();

    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText);
    }

    function resetInputHandler(){
        setEnteredNumber('');    
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Value not valid', 
                            'Number has to be between 1 to 99',
                             [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}] 
                        );
            return;
        }

        onPickNumber(chosenNumber);
    }

    const marginTopDistance = height < 400 ? 30 : 100;
    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior='position'>
                <View style={[styles.rootContainer, {marginTop: marginTopDistance}]}>
                <Title>Guess my number</Title>
                    <Card>
                        <Text style={styles.instructionText}>Enter a number</Text>
                        <TextInput 
                            style={styles.numberInput} 
                            maxLength={2} 
                            keyboardType='number-pad'
                            value = {enteredNumber}
                            onChangeText = {numberInputHandler}
                        />
                        <View  style={styles.buttonsContainer}>
                                <View  style={styles.buttonContainer}>
                                    <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                                </View>
                                <View  style={styles.buttonContainer}>
                                    <PrimaryButton onPress={confirmInputHandler} >Confirm</PrimaryButton>
                                </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
        
       
    );
    
}

export default StartGameScreen;

//const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    screen:{
        flex:1,
    },
    rootContainer:{
        flex: 1,
        //marginTop: deviceHeight < 400 ? 30 : 100,
        alignItems: 'center',
    },
    instructionText: {
        fontFamily: 'open-sans',
        color: Colors.accent500,
        fontSize: 24,
    },
    numberInput: {
        height: 50, 
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        width: 50,
        textAlign: 'center',
    }, 
    buttonsContainer: {
        flexDirection: 'row',  
    },
    buttonContainer:{
        flex: 1,
    }
});