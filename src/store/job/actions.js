import * as types from './actionTypes';

export function setChat(chat){

  return dispatch =>{
    dispatch({type:types.SET_CHAT, chat});
  }
}
export function setUpload(upload){

  return dispatch =>{
    dispatch({type:types.SET_UPLODE, upload});
  }
}

export function setOffer(offer){

  return dispatch =>{
    dispatch({type:types.SET_OFFER, offer});
  }
}

export function setSituation(situation){

  console.log('my situation~~~~~~~~~~~~~~~~~~~~~~', situation)

  return dispatch =>{
    dispatch({type:types.SET_SITUATION, situation});
  }
}