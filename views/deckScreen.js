import React from 'react';
import { 
    View,
    Text ,
    StyleSheet , 
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { gray } from '../utils/colors';

class DeckScreen extends React.Component {

    componentDidMount(){
        this.props.navigation.setOptions({
            title: `${this.props.route.params.deck}`,
          });
    }

    render(){
        const { deck } = this.props.route.params;
        const curDeck  = this.props.decks[deck];
        return ( 
            <View style={styles.container}>
                <View style={styles.info}>
                <Text style={styles.title}>{deck}</Text>
                <Text style={styles.CardsNumber}>{`${
                        curDeck.questions.length
                    } cards`}</Text>
                </View>
                <View style={ styles.actionContainer }>
                    <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Add Card', deck)}
                    style={ styles.btn }
                    >
                    <Text>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Quiz', deck)}
                        style={[ styles.btn , styles.btnPrimary ]}
                    >
                    <Text>Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
         );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
        width: '100%',
        height: '100vh'
    },
    info: {
        height: '50%',
        width: '50%',
    },
    item: {
      paddingBottom: 20,
      paddingHorizontal: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      width: '100%',
    },
    title: {
      fontSize: 32,
      textAlign: "center",
    },
    CardsNumber:{
        color: gray,
        textAlign: "center",
        marginBottom: 15
    },
    actionContainer: {
        flex: 1,
        height: '30%',
        width: '50%',
    },
    btn: {
        padding: 10,
        borderRadius: 4,
        marginBottom: 8,
        backgroundColor: "white",
        borderWidth: 2,
        textAlign: "center",
    },
    btnPrimary: {
        backgroundColor: "turquoise",
        borderWidth: 0
    },
    btnText: {
        textAlign: "center"
    }
  });
 
const mapStateToProps = state => ({
    decks: state
  });


export default connect(mapStateToProps)(DeckScreen);