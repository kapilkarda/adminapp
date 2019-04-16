import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as actions from "../../../store/common/actions";
import { Actions } from 'react-native-router-flux';

class Main extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      username:'',
      password:''
    }
  }

  componentDidMount(){
    this.props.actions.getAll()
  }

  stamp(item){
    this.props.actions.increaseCount(item.count + 1, item._id)
    this.props.actions.getAll()
  }

  chat(item){
    Actions.chat({_id:item._id})
    
  }


  _renderItem = ({ item }) => (
      <View style={styles.list2}>
           <Image
              style={{width:30,height:30, borderRadius:15, marginLeft:40}}
              source={{uri:item.image ? item.image : 'https://twu.edu/media/images/cas/NoImage300sq.jpg'}}
           />
          <Text style={styles.lightbold}>{item.name}</Text>
          <Text style={styles.light}>{item.count}</Text>

          <MaterialCommunityIcons name="circle-slice-8" size={14} color="green" style={[styles.lefticon, {marginTop:5}]} />
          <TouchableOpacity style={[styles.button, {position:'absolute', right:80}]} onPress={()=>this.stamp(item)}>
             <Text style={{color:'#fff', fontSize:12, fontWeight:'600', paddingHorizontal:8, paddingVertical:4}}>STAMP ME</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {position:'absolute', right:10}]} onPress={()=>this.chat(item)}>
             <Text style={{color:'#fff', fontSize:12, fontWeight:'600', paddingHorizontal:8, paddingVertical:4}}>CHAT ME</Text>
          </TouchableOpacity>
      </View>
    );

  _renderImg = ({item}) => (
    <View>
      <Image source={{uri:item.image}} style={{width:300, height:200, margin:10, borderRadius:8}}/>
      <Text style={styles.text1}>{item.text}</Text>
      <Text style={styles.text2}>{item.notice}</Text>
    </View>
  )

  render() {
    const { me, count } = this.props

    // console.log('hi, my count', count)
    // console.log('hi, my info', me)

    return (
      <View style={styles.container} >

          <View style={{width:'100%', padding:6, alignItems:'center', flex:1, marginTop:40}}>
                <View style={{ width:'100%', flex:1}}>
                  <FlatList
                    data={this.props.all} 
                    keyExtractor={(item, i) => String(i)}
                    renderItem={this._renderItem}
                  />
                </View>
          </View>
      </View>
    )
  }
}

export default connect(
  state => ({
      me:state.common.me,
      count: state.common.count,
      all:state.common.all
  }),
  dispatch => ({
      actions: bindActionCreators(actions, dispatch)
  })
)(Main);

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
    width:250,
    height:120
  },
  text:{
    fontSize:36,
    color:'#fff',
    fontWeight:'300',
    paddingHorizontal:30,
    paddingVertical:14
  },
  button:{  
    backgroundColor:'#d12026',
    borderRadius:3,
    marginTop:-3
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
  },
  stamp:{
    width:50,
    height:50,
    backgroundColor:'#ddd',
    borderRadius:25,
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:3
  },
  stampB:{
    width:70,
    height:70,
    backgroundColor:'#ddd',
    borderRadius:35,
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:3
  },
  circle:{
    marginTop:30,
    width:130,
    height:130,
    borderRadius:65
  },
  lightbold:{
    fontSize:17, 
    color:'#777', 
    fontWeight:'300',
    marginLeft:20,
    width:60
  },
  light:{
      fontSize:17,
      color:'#999',
      fontSize:14, 
      marginBottom:20, 
      marginLeft:20
  },
  list2:{
    flex: 1, 
    flexDirection: 'row', 
    marginHorizontal: 10, 
    marginVertical:5,
    width:'100%',
    borderBottomWidth:1,
    borderBottomColor:'#ddd'
  },
  lefticon:{
    position:'absolute',
    left:2
  },

});
