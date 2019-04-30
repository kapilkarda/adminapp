'use strict';

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TextInput, KeyboardAvoidingView, TouchableOpacity, RefreshControl } from 'react-native';
import { Entypo, SimpleLineIcons, AntDesign, Feather, FontAwesome } from '@expo/vector-icons';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from 'axios';
import { ImagePicker,Permissions,ImageManipulator } from 'expo'

import * as actions from "../../store/common/actions";
import { Actions } from 'react-native-router-flux';

var gHandler = null

class Uploadimagename extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
     message:'',
     name:'',
     image:null,
     chatdata : [],
     isRefreshing:false
    };
    gHandler = this
    this.onRefresh=this.onRefresh.bind(this)

  }

 
  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
    });
      if (!result.cancelled) {
      this.setState({
        image: result.uri,
      });
      console.log(' edit profile image',  this.state.image)

    }
  };

  

  async takePicture(){
    let res = await Permissions.askAsync(Permissions.CAMERA)
    if ( res.status ==='granted'){
        let {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if ( status === 'granted' ){
            let image = await ImagePicker.launchCameraAsync({
                quality:0.6
            })
            if ( !image.cancelled ){
                this.setState({isWaiting:true})
                const manipResult = await ImageManipulator.manipulate(
                    image.uri,
                    [{resize:{width:768}}],
                    { format: 'jpeg', compress:0.6 }
                );
                this.setState({image: manipResult.uri})
                this.props.actions.uploadEdit(manipResult, manipResult.uri)
            }
        }
    }
}
  uploadimg(){
    console.log(' edit profile image  and name',  this.state.image,this.state.name)
  //  let { firstname, lastname, email, password, name, phone, _id } = this.state
    this.props.actions.upload( this.state.name,  this.state.image )
    this.setState({image:''})
    this.setState({name:''})

  }

  onRefresh(){

    axios.get(`http://3.92.60.33:8083/api/members/` + this.props._id)
    .then(res => {
      const results = res.data.data.remarks;
      this.setState({ chatdata : results });
    })
  }

  onEndReached(){
    // this.pageSize+=10
    // this.searchItems(this.state.search)
  }

  message(){
      this.props.actions.sendChat(this.state.message, this.props._id)
      this.setState({message:''})
      this.onRefresh()
  }

  render() {
    // console.log('id', this.props._id)
    // console.log('chatdata', this.state.chatdata)
    let { image } = this.state;

    return (
        <View style={styles.container} >

      

         
<View style={{justifyContent:'center', alignItems:'center', width:'100%', height:150,  marginTop:100
}}>
            
            {
            this.state.image
              ? <TouchableOpacity onPress={()=>this.pickImage()}>
                  <Image source = {{uri:this.state.image}} style={{width: 100, height:100, borderRadius:50}} />
                </TouchableOpacity>
              : <TouchableOpacity style={styles.icon} onPress={()=>this.pickImage()}>
                  <SimpleLineIcons name="user-follow" size={40} color='#fff' />
                </TouchableOpacity>
            }
            
          </View>
<View style={{paddingHorizontal:50, flex:1, flexDirection:'column'}}>
            <View>
              <TextInput
                underlineColorAndroid="transparent"
                style={[styles.input, {paddingLeft:1}]}
                placeholder='Enter Name'
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}
              />
            </View>         
              
               <View style={{justifyContent:'center', alignItems:'center',marginTop:30}}>
              <TouchableOpacity onPress={()=>this.uploadimg()}>
                <Text style={styles.text}>Upload</Text>
              </TouchableOpacity>
          </View>
          <View style={{justifyContent:'center', alignItems:'center',marginTop:30}}>
              <TouchableOpacity onPress={()=>Actions.uploadimgfile()}>
                <Text style={styles.text}>Get All Image</Text>
              </TouchableOpacity>
          </View>
          </View>
          
       </View>
    );
  }
}

export default connect(
  state => ({
      me:state.common.me,
  }),
  dispatch => ({
      actions: bindActionCreators(actions, dispatch)
  })
)(Uploadimagename);

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      flexDirection: 'column', 
      backgroundColor:'#fff',
    },
    header:{
      flexDirection:'row', 
      backgroundColor:'#8868ef', 
      elevation:5, 
      width:'100%', 
      height:70, 
      justifyContent:'center', 
      alignItems:'center', 
      paddingTop:20
    },
    login:{
      fontSize:30,
      fontWeight:'600',
      marginVertical:20
    },
    image:{
      width:200,
      height:100
    },
    text:{
      fontSize:18,
      color:'#ff5b64',
      fontWeight:'600',
      paddingVertical:12,
    },
    button:{  
      backgroundColor:'#16c6e1',
      borderRadius:40,
      marginVertical:22
    },
    button1:{
      backgroundColor:'blue',
      borderRadius:40,
      marginVertical:16
    },
    icon:{
      width:100,
      height:100,
      marginHorizontal:90,
      borderRadius:50,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#ff5b64'
    },
    input: {
      fontSize: 14,
      color: '#111',
      height: 34,
      alignSelf: "stretch",
      marginBottom: 3,
      paddingLeft: 24,
      borderBottomWidth:1,
      borderBottomColor:'#888'
    },
    inputicon:{
      position:'absolute',
      top:10,
      left:2
    },
  });
  