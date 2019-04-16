import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import { SimpleLineIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import * as actions from "../store/common/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import Expo, { Facebook } from "expo"

class Test extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      email:'',
      password:'',
      signedIn: false,
      name: "",
      photoUrl: ""
    }
  }

  static navigationOptions = {
    title: 'FacebookLogin',
  };


  login = ()=>{
    this.props.actions.login(this.state.email, this.state.password)
    this.setState({email:'', password:''})
  }

  render() {

    return (
      <View style={styles.container} >

        <View>
          <Image
            style={styles.image}
            source={require('../../assets/images/logo.jpg')}
          />
        </View>

        <Text style={styles.login}>Login</Text>
        
        <View style={{width:'90%'}}>
          <Text>Email</Text>
          <SimpleLineIcons style={styles.inputicon} name="user" size={20} color='#ddd' />
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.input}
            placeholder='Type your email'
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
        </View>

        <View style={{width:'90%', marginTop:10}}>
          <Text>Password</Text>
          <MaterialIcons style={styles.inputicon} name="lock-outline" size={22} color='#ddd' />
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.input}
            secureTextEntry={true}
            placeholder='Type your password'
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
        </View>

        <TouchableOpacity onPress={()=>this.login()}>
          <View style={styles.button}>
            <Text style={styles.text}>Login</Text>
          </View>
        </TouchableOpacity>


      </View>
    )
  }
}

export default connect(
  state => ({
    me:state.common.me,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Test);


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff'
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
    color:'#fff',
    fontWeight:'600',
    paddingHorizontal:120,
    paddingVertical:12
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
    width:40,
    height:40,
    marginHorizontal:20,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#3d5b98'
  },
  inputicon:{
    position:'absolute',
    top:32,
    left:8
  },
  input: {
    fontSize: 14,
    color: '#111',
    paddingLeft:40,
    height: 44,
    alignSelf: "stretch",
    marginBottom: 3,
    borderBottomWidth:1,
    borderBottomColor:'#888'
  }
});
