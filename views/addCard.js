import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { turquoise, red } from '../utils/colors';

class AddCardScreen extends React.Component{
    state = {
        values: {
            question: "",
            answer: "",
        },
        errors:{
            question: false,
            answer: false,
        }
    };

    onInputChange = (e , target) => {
        this.setState((prevState)=>{
            var targetError = false;
            if(e === ""){
                targetError = true;
            }
            return  {
                ...prevState,
                values: {
                    ...prevState.values,
                    [target]:  e
                },
                errors: {
                    ...prevState.errors,
                    [target]: targetError
                }
            }
        })
    }

    handleSubmit = () => {
        if(this.state.errors.question === true || this.state.errors.question === true ) return;
        if(!this.state.values.question || !this.state.values.answer){
            if(!this.state.values.question){
                this.setState((prevState)=>{
                    return {
                        ...prevState,
                        errors: {
                            ...prevState.errors,
                            question: true
                        }
                    }
                })
            }
            if(!this.state.values.answer){
                this.setState((prevState)=>{
                    return {
                        ...prevState,
                        errors: {
                            ...prevState.errors,
                            answer: true
                        }
                    }
                })
            }
            return;
        }
       
        const deck = this.props.route.params;
            this.props.addCard(deck, {...this.state.values});

            this.setState({
                values: {
                    question: "",
                    answer: "",
                },
                errors:{
                    question: false,
                    answer: false,
                }
            });

        this.props.navigation.navigate("Deck", {
            deck
        });
    }

    render(){
        const { errors  } = this.state;
        return ( 
            <View style={styles.container}>
                <View style={styles.formContainer}>
                <TextInput
                onChangeText={(e)=>this.onInputChange(e, 'question')}
                style={styles.input}
                placeholder="Add Question"
                underlineColorAndroid={
                    errors.question === true
                    ?red 
                    :turquoise
                }
                />
                {
                    errors.question === true &&
                    <View style={styles.error}>
                        <Text style={styles.errorMessage}>Question is required Field</Text>
                    </View>
                }
                <TextInput
                onChangeText={(e)=>this.onInputChange(e, 'answer')}
                style={styles.input}
                placeholder="Add Answer"
                underlineColorAndroid={
                    errors.answer === true
                    ?red 
                    :turquoise
                }
                />
                    {
                        errors.answer === true &&
                        <View style={styles.error}>
                            <Text style={styles.errorMessage}>Answer is required Field</Text>
                        </View>
                    }
                </View>
                <TouchableOpacity
                onPress={() => this.handleSubmit()}
                style={[styles.btn , styles.btnPrimary ]}
                >
                <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
            </View>
         );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      padding: 10,
      justifyContent: "space-evenly",
      width: "100%"
    },
    btn: {
      padding: 10,
      borderRadius: 1,
      borderWidth: 2,
      borderColor: "turquoise",
      width: '50%'
    },  
    btnPrimary: {
        backgroundColor: "turquoise",
        borderWidth: 0
    },
    btnText: {
      textAlign: "center"
    },
    input: {
        width: '75%',
      fontSize: 15,
      padding: 10,
      margin: 25
    },
    error: {
      paddingHorizontal: 10,
      marginHorizontal: 25,
      marginTop: -20,
    },
    errorMessage: {
      color: red,
    }
  });
 
export default  connect(null, { addCard })(AddCardScreen);

