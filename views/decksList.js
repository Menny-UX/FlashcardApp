import React from 'react';
import { View , Text , 
    TouchableOpacity, FlatList, 
    SafeAreaView, StyleSheet,} 
from 'react-native';
import { connect } from 'react-redux';
import {fetchDecks} from '../actions'
import { gray } from '../utils/colors';


class DecksListScreen extends React.Component{
    componentDidMount() {
        this.props.fetchDecks();
    }
    render(){
        //single deck
        const renderDeck = ({ item }) => (
            <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Deck', {
                deck : `${item.title}`
            })} 
            style={styles.item}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.CardsNumber}>{`${
                        item.questions.length
                    } cards`}</Text>
            </TouchableOpacity>
          );

        return ( 
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.props.decks && Object.values(this.props.decks)}
                    renderItem={renderDeck}
                    keyExtractor={(item) => `${item.title}`}
                />
            </SafeAreaView>
         );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 20,
        width: '100%',
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
    }
  });

const mapStateToProps = state => ({
    decks: state
  });
 
export default connect(mapStateToProps, { fetchDecks })(DecksListScreen);