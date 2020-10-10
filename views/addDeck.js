import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { gray, turquoise, red } from '../utils/colors';

class AddDeckScreen extends Component {
    state = {
        values: {
            title: "",
        },
        errors:{
            title: false,
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
        if(this.state.errors.title === true ) return;
        if(!this.state.values.title){
                this.setState((prevState)=>{
                    return {
                        ...prevState,
                        errors: {
                            ...prevState.errors,
                            title: true
                        }
                    }
                })
            return;
        }
            const newDeck = this.state.values.title
            this.props.addDeck({ [newDeck]: {title: newDeck, questions: []} });
            this.setState((prevState)=>{ 
                return {
                    values: {
                        title: "",
                    },
                    errors:{
                        title: false,
                    }
                }
            });

        this.props.navigation.navigate("Decks");
    }

    render(){
        const { errors  } = this.state;
        return ( 
            <View style={styles.container}>
            <View style={styles.formContainer}>
            <TextInput
            onChangeText={(e)=>this.onInputChange(e, 'title')}
            style={styles.input}
            placeholder="Add Title"
            underlineColorAndroid={
                errors.title === true
                ?red 
                :turquoise
            }
            />
            {
                errors.title === true &&
                <View style={styles.error}>
                    <Text style={styles.errorMessage}>Question is required Field</Text>
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
    btnText: {
      textAlign: "center"
    },  
    btnPrimary: {
        backgroundColor: "turquoise",
        borderWidth: 0
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

export default connect(null, { addDeck })(AddDeckScreen);