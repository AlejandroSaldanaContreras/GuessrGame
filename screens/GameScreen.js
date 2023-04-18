import { View, Text, StyleSheet, Alert, FlatList, useWindowDimensions} from "react-native";
import { useState, useEffect } from "react";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import Colors from "../constants/colors";
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
  
    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
  }

  let minBoundary = 1;
  let maxBoundary = 100;

function GameScreen( {userNumber, onGameOver}){  
    const initialGuaess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuaess);
    const [guessRounds, setGuessRounds] = useState([initialGuaess]);
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        if(currentGuess === userNumber){
                onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, [])

    function nextGuessHandler(direction){
        if((direction === 'lower' && currentGuess < userNumber) || (direction === 'greater' && currentGuess > userNumber)){
            Alert.alert("Do not lie", "this is wrong...",
             [{text:'Sorry', style:'cancel'}]);
            return;
        }

        if(direction == 'lower'){
            maxBoundary = currentGuess;
        }else{
            minBoundary = currentGuess +1;   
        }

        const newRnd = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRnd);
        setGuessRounds(prevGuessRounds => [newRnd, ...prevGuessRounds]);

    }

    const guessRoundListLenght = guessRounds.length;

    let content = (<>
        <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <Text style={styles.instructionText}>Higher or lower?</Text>   
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="md-remove" size={24} color={'white'}/>
                        </PrimaryButton> 
                    </View>
                    <View style={styles.button}> 
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name="md-add" size={24} color={'white'}/>
                        </PrimaryButton>
                    </View>  
                </View> 
            </Card>  
    </>);

    if (width>500){
        content = (
            <>
                    <View style={styles.buttonsWide}>
                    <View style={styles.button}>
                            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                                <Ionicons name="md-remove" size={24} color={'white'}/>
                            </PrimaryButton> 
                        </View>
                        <NumberContainer>{currentGuess}</NumberContainer>
                        <View style={styles.button}> 
                            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                                <Ionicons name="md-add" size={24} color={'white'}/>
                            </PrimaryButton>
                        </View>  
                    </View>  
            </>
        );
    }

    return(
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
             {content}
            <View style={styles.listContainer}>
                {/*{guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)}*/}
                <FlatList 
                    data={guessRounds} 
                    renderItem={(itemData)=> 
                        <GuessLogItem 
                            roundNumber={guessRoundListLenght - itemData.index} 
                            guess={itemData.item}
                        />}
                    keyExtractor = {(item) => item}
                />
            </View>
        </View>
    );
}


export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24, 
        alignItems: 'center',

    }, 
    instructionText: {
        fontFamily: 'open-sans',
        color: Colors.accent500,
        fontSize: 24,
        marginBottom: 12,
    },
    buttons:{
        flexDirection: "row",
    },
    buttonsWide:{
        flexDirection: 'row',
        alignItems: "center",
    },
    button:{
        flex: 1,
    },
    listContainer:{
        flex: 1,
        padding: 16
    }
});