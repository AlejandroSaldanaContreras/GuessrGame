import { useState } from 'react'; 
import { StyleSheet, ImageBackground, Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from './constants/colors';
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const[userNumber, setUserNumber] = useState(); 
  const [gameIsOver, setGameIsOver] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

const [fontsLoaded] = useFonts({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':  require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if(!fontsLoaded){
    return <AppLoading/>;
  }

  function pickedNumberHandler(pickedNumber){
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds){
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler(){
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>

  if(userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>
  }

  if(gameIsOver && userNumber) {
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler}/>
  }

  
  return (
    <>
      <StatusBar style='light ' />
      <LinearGradient style={styles.container} colors={[Colors.primary700, Colors.accent500]}>
        <ImageBackground source={require('./assets/images/background.png')} 
                          resizeMode='cover'  
                          style={styles.container} 
                          imageStyle={styles.backgroundImage} 
        >  
          <SafeAreaView style={styles.container}>
            {screen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  backgroundImage:{
    opacity: 0.25,
  }
});
