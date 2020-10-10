import React from 'react';
import { 
    View , 
    Text , 
    StyleSheet,
    TouchableOpacity
 } from 'react-native';
 import CardFlip from 'react-native-card-flip';
 import { connect } from 'react-redux';
 import * as c from '../utils/colors';

 import { Ionicons } from '@expo/vector-icons'; 
 import { MaterialCommunityIcons } from '@expo/vector-icons';

class QuizScreen extends React.Component {
    state = {
        count: 0,
        answered : 0,
        correct: 0,
        finish: false
    }
    
    nextQuestion = () => {
        const deck = this.props.route.params;
        const {questions} = this.props.decks[deck];

        this.setState((prevState)=>{
            if(questions.length - 1 === prevState.count){
                return {
                    ...prevState,
                    finish: true
                }
                //set notification off
            } else {
                return {
                    ...prevState,
                    count: prevState.count + 1
                }
            }
        })
    }

    correctAnswer = () => {
        this.setState((prevState)=>{
            return {
                ...prevState,
                correct: prevState.correct + 1,
                answered: prevState.answered + 1
            }
        })
        this.card.flip()
        this.nextQuestion();
    }
    incorrectAnswer = () => {
        this.setState((prevState)=>{
            return {
                ...prevState,
                answered: prevState.answered + 1
            }
        })
        this.card.flip()
        this.nextQuestion();
    }
   
    render(){
        debugger;
        const deck = this.props.route.params;
        const {title, questions} = this.props.decks[deck];
        const {count , correct, finish, answered} = this.state;
        const total = questions.length;
        const item = questions[count];
        const score = correct*100 / total;
        return ( 
            <View style={styles.container}>
            <Text style={styles.title}>
                {title}
            </Text>
            {
                !finish ?
                <CardFlip style={styles.cardContainer} ref={(card) => this.card = card} >
                <View style={styles.card} >
                <View style={styles.flipText}>
                    <Text style={styles.subTitle}>
                        {item.question}
                    </Text>
                    <TouchableOpacity onPress={() => this.card.flip()}>
                        <Text>View Answer</Text>
                    </TouchableOpacity>
                </View>
                </View>
                <View style={[styles.card , styles.cardBack]}>
                <View style={styles.flipText}>
                    <Text style={styles.subTitle}>
                        {item.answer}
                    </Text>
                    <View>
                    <View style={styles.answerBtnContainer}>
                        <TouchableOpacity style={styles.answerBtn} onPress={()=>this.correctAnswer()}>Correct</TouchableOpacity>
                        <TouchableOpacity style={styles.answerBtn} onPress={()=>this.incorrectAnswer()}>InCorrect</TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => this.card.flip()}>
                        <Text>Go back to Question</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                </View>
            </CardFlip>
            :
                <View style={styles.cardContainer}>
             
                    <View style={styles.card}>
                    {
                        (score>=50)?
                        <View style={styles.flipText} >
                        <View style={styles.feedback}>
                            <MaterialCommunityIcons name="emoticon-happy-outline" size={24} color="black" />
                            <Text>Good Job</Text>
                        </View>
                        <Text>{`Total Score : ${score}% `}</Text>
                        </View>
                        :
                        <View style={styles.flipText} >
                        <View style={styles.feedback}>
                        <MaterialCommunityIcons name="emoticon-sad-outline" size={24} color="black" />
                            <Text>Better Luck Next Time</Text>
                        </View>
                        <Text>{`Total Score : ${score}% `}</Text>
                        </View>
                    }
                    </View>
                </View>
            }
            {
                !finish ? 
                <>
                <View style={styles.quizInfo}>
                    <Text>{`Answered ${answered} of ${total}`}</Text>
                    <Text>{`Score: ${score}%`}</Text>
               </View>
                <TouchableOpacity style={styles.nextQuestion} onPress={()=>{this.nextQuestion()}}>
                    <Text>Next Question</Text>
                    <Ionicons name="ios-arrow-round-forward" size={24} color="black" />
                </TouchableOpacity>
                </>
                : 
                <>
                    <View style={styles.quizInfo}></View>
                    <TouchableOpacity style={styles.nextQuestion}></TouchableOpacity>
                </>
            }
           
            </View>
         );
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 20,
        width: '100%',
        height: '100vh',
    },
    cardContainer: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
        marginTop: '15%',
        width: '70%',
    },
    card:{
        width:'100%',
        height: 300,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: c.turquoise,
    },
    flipText:{
        height: "100%",
        width: "100%",
        justifyContent:"space-between",
        alignItems: "center",
        padding: 25,
        textAlign: "center",
    },
    title: {
        fontSize: 32,
        textAlign: "center",
    },
    subTitle: {
      fontSize: 22,
      textAlign: "center",
    },
    answerBtnContainer:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    answerBtn:{
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: c.white,
        borderRadius: 10,
        borderColor: c.greenSea,
        borderWidth: 2,
        marginHorizontal: 2,
        marginBottom: 3
    },
    quizInfo:{
        flex: 1,
        flexDirection: "row",
        fontSize: 18,
        width: '70%',
        padding: 20,
        justifyContent: "space-between",
    },
    nextQuestion:{
        flexDirection: "row",
        flex: 1,
        height: '10%',
    },
    feedback:{
        flex: 2,
        justifyContent: 'center'
    }
  });

  const mapStateToProps = state => ({
    decks: state
  });


export default connect(mapStateToProps)(QuizScreen);