import * as api from "../utils/api";
export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";

export function getAllDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}
export function addNewDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  };
}
export function addNewCard(deck, card) {
  return {
    type: ADD_CARD,
    deck,
    card
  };
}

export const fetchDecks = () => dispatch =>
  api.fetchDecks().then(decks => dispatch(getAllDecks(decks)));

export const addDeck = deck => dispatch =>{
  return api.addDeck(deck).then(deck => dispatch(addNewDeck(deck)));
}

export const addCard = (deck, card) => dispatch =>
  api.addCard(deck, card).then(({deck , card}) => 
  dispatch(addNewCard(deck, card))
);

