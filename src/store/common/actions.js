import * as types from './actionTypes';
import {Toast} from 'antd-mobile-rn';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import _ from 'underscore'

let BaseUrl = 'http://3.92.60.33:8083/api/'

export function setUser(data){
  return dispatch =>{
    dispatch({type:types.SET_USER, data: data});
  }
}

export const register = (name, email, password, image) => {
  var headers = {"Content-Type": "application/json" };
  return dispatch => {
    axios .post(BaseUrl + "members/register", {name, email, password, image, firstname:'', lastname:'', phone:'', count: 0, remarks:[] },  { headers: headers })
      .then(function(response) {
        Toast.success("Congratulations!");
        Actions.pop()
        var data = response.data.results;
        dispatch({ type: types.REGISTER, data: data });
      })
      .catch(function(error) {
        // Toast.fail("Please confirm correct information!");
        dispatch({ type: types.FAILED });
      });
  };
};

export const login = ( email, password ) => {
  var headers = {"Content-Type": "application/json" };
  return dispatch => {
    axios .post(BaseUrl + "members/login", { email, password },  { headers: headers })
      .then(function(response) {
        Toast.success("Login Successed!");
        Actions.home()

        var data = response.data.member;
        console.log('data', data)
        dispatch({ type: types.LOGIN, data: data });
      })
      .catch(function(error) {
        console.log(error)
        Toast.fail("Login Fail!");
        dispatch({ type: types.FAILED });
      });
  };
};

export const editprofile = ( name, firstname, lastname, email, password, img, phone, _id ) => {
  var headers = { "Content-Type": "application/json" };
  return dispatch => {
    axios .put(BaseUrl + "members/update/member/" + _id, { name, firstname, lastname, email, password, img, phone },  { headers: headers })
      .then(function(response) {
        Toast.success("Update Successed!");

        var data = response.data;
        console.log('data', data)
        dispatch({ type: types.UPLODE_PROFILE, data: data });
      })
      .catch(function(error) {
        console.log(error)
        Toast.fail("Update Fail!");
        dispatch({ type: types.FAILED });
      });
  };
};
export const uploadimg = ( name, img ) => {
  var headers = { "Content-Type": "application/json" };
  return dispatch => {
    axios .put(BaseUrl + "members/update/member/" + _id, { name, img },  { headers: headers })
      .then(function(response) {
        Toast.success("Update Successed!");

        var data = response.data;
        console.log('data', data)
        dispatch({ type: types.EDIT_PROFILE, data: data });
      })
      .catch(function(error) {
        console.log(error)
        Toast.fail("Update Fail!");
        dispatch({ type: types.FAILED });
      });
  };
};

export const increaseCount = ( count, _id ) => {
  var headers = { "Content-Type": "application/json" };
  return dispatch => {
    axios .put(BaseUrl + "members/update/count/" + _id, { count },  { headers: headers })
      .then(function(response) {
        Toast.success("Stamp Successed!");

        var data = response.data.count;
        console.log('count',data)

        dispatch({ type: types.STAMP, data: data });
      })
      .catch(function(error) {
        console.log(error)
        Toast.fail("Stamp Fail!");
        dispatch({ type: types.FAILED });
      });
  };
};

export const deleteimage = (  _id ) => {
  var headers = { "Content-Type": "application/json" };
  return dispatch => {
    axios .delete(BaseUrl + "members/delete-images/" + _id,  { headers: headers })
      .then(function(response) {
        Toast.success("Delete Successed!");

        var data = response.data;

        dispatch({ type: types.STAMP, data: data });
      })
      .catch(function(error) {
        console.log("error in image delete",error)
        Toast.fail("Delete Fail!");
        dispatch({ type: types.FAILED });
      });
  };
};

export const UploadAll = ( count, _id ) => {
  var headers = { "Content-Type": "application/json" };
  return dispatch => {
    axios .get(BaseUrl + "members/fetch-images/", { headers: headers })
      .then(function(response) {
        var data = response.data;
        console.log("fetch image data",data)
       
        // var mapping = _.filter(data, (u)=>{
        //   return u.admin == 2 
        // })

        dispatch({ type: types.GET_ALL_IMAGE, data: data });
      })
      .catch(function(error) {
        console.log(error)
        dispatch({ type: types.FAILED });
      });
  };
};
export const getAll = ( count, _id ) => {
  var headers = { "Content-Type": "application/json" };
  return dispatch => {
    axios .get(BaseUrl + "members", { headers: headers })
      .then(function(response) {
        var data = response.data;
        
        var mapping = _.filter(data, (u)=>{
          return u.admin == 2 
        })

        dispatch({ type: types.GET_ALL, data: mapping });
      })
      .catch(function(error) {
        console.log(error)
        dispatch({ type: types.FAILED });
      });
  };
};

export const sendChat = (content, _id) => {
  var headers = { "Content-Type": "application/json" };
  return dispatch => {
    axios .post(BaseUrl + "members/chat/" + _id, { name: 'Admin',  content }, { headers: headers })
      .then(function(response) {
        var data = response.data.data;
        Toast.success("Your message sent!");
        dispatch({ type: types.SEND_CHAT, data: data });
      })
      .catch(function(error) {
        console.log(error)
        dispatch({ type: types.FAILED });
      });
  };
};

export const upload = (name,uri) => {

  let formData = new FormData();
  formData.append('fileName', {
    uri,
    name: `photo.jpg`,
    type: `image/jpg`,
  });

  var headers = {Accept: 'application/json',"Content-Type": "multipart/form-data" };
  return dispatch => {
    axios .post(BaseUrl + "members/image-upload?name=" + name  , formData, { headers: headers })
      .then(function(response) {
        var data = response.data.image;
        console.log('image ok', data)
        Toast.success("Upload Successed!");
      //  Actions.pop('')
        Actions.uploadimgfile()
        dispatch({ type: types.UPLOAD_IMAGE, data: data });
       
      })
      .catch(function(error) {
        console.log(error)
        Toast.success("Upload Fail!");

        dispatch({ type: types.FAILED });
      });
  };
};

export const logOut = () => {
  return dispatch => {
        dispatch({ type: types.LOGOUT });
      }
};

