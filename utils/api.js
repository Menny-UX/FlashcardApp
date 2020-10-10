import AsyncStorage from '@react-native-community/async-storage';
import { populateData, DECK_STORAGE_KEY} from './_data';

export function fetchDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(populateData);
}

export const addDeck = newDeck =>
  AsyncStorage.getItem(DECK_STORAGE_KEY).then(
    (result) => {
      var data = JSON.parse(result).dummyData;
      data = {...data, ...newDeck}
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({dummyData: {...data}}));
      return newDeck
    }
  );

export const addCard = ( deck, card ) =>{
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((result)=> {
    const data = JSON.parse(result).dummyData;
    data[deck].questions = [...data[deck].questions, card];
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({dummyData: {...data}}));
    return {deck, card}
  });
}

export function removeDeck (deck) {
return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
    const data = JSON.parse(results)
    data[deck] = undefined
    delete data[deck]
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}