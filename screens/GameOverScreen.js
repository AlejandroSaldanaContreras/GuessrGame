import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';
import PrimaryButton from '../components/ui/PrimaryButton';

function GameOverScreen({roundsNumber, userNumber, onStartNewGame }){
    const {height, width} = useWindowDimensions();
    let imageSize = 300; 

    if(width < 380 ){
        imageSize = 150;
    }

    if(height < 400){
        imageSize = 120;
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2, 
    }

    return(
       <ScrollView>
            <View style={styles.rootContainer}>
                <Title>Game Over.</Title>
                <View style={[styles.imgContainer, imageStyle]}>
                <Image style={styles.succesImg} source={require('../assets/images/success.png')}/>
                </View>
                
                <Text style={styles.sumaryText}>Your phone needed  
                    <Text style={styles.highlight}> {roundsNumber} </Text> 
                    rounds to guess the number  
                    <Text style={styles.highlight}> {userNumber} </Text>
                .</Text>
                <PrimaryButton onPress={onStartNewGame}>Start new game</PrimaryButton>
            </View>
       </ScrollView>
    );
}
export default GameOverScreen;

//deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgContainer: {
        overflow: 'hidden',
        //borderRadius: deviceWidth < 380 ? 75 : 150,
        //width: deviceWidth < 380 ? 150 : 300,
        //height: deviceWidth < 380 ? 150 : 300,
        borderWidth: 4,
        borderColor: Colors.primary800,
        margin: 36,
    },
    succesImg:{
        width: '100%',
        height: '100%',
    },
    sumaryText:{
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24,
    },
    highlight:{
        fontFamily: 'open-sans-bold',
        color: Colors.primary500,
        fontSize: 24,
    }
});