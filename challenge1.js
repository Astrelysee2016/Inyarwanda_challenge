import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  TextInput,
  View,
  Platform,
  Alert,
  Button,
  Image,ScrollView,
  ListView,
  ActivityIndicator,
  Text,
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class Screen1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      UserName: '',
      UserEmail: '',
      UserPassword: '',
    };
  }

  UserRegistrationFunction = () => {
    const { UserName } = this.state;
    const { LastName } = this.state;
    const { UserEmail } = this.state;
    const { UserPassword } = this.state;

    fetch('https://astrofinal.000webhostapp.com/register.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fname: UserName,
        lname: LastName,
        email: UserEmail,

        password: UserPassword,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // Showing response message coming from server after inserting records.
        Alert.alert(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text
          style={{
            fontSize: 20,
            color: '#000',
            textAlign: 'center',
            marginBottom: 15,
          }}>
          User Registration Form
        </Text>

        <TextInput
          // Adding hint in Text Input using Place holder.
          placeholder="Enter  First Name"
          onChangeText={UserName => this.setState({ UserName })}
          // Making the Under line Transparent.
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
        />

        <TextInput
          // Adding hint in Text Input using Place holder.
          placeholder="Enter Last Name"
          onChangeText={LastName => this.setState({ LastName })}
          // Making the Under line Transparent.
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
        />

        <TextInput
          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Email"
          onChangeText={UserEmail => this.setState({ UserEmail })}
          // Making the Under line Transparent.
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
        />

        <TextInput
          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Password"
          onChangeText={UserPassword => this.setState({ UserPassword })}
          // Making the Under line Transparent.
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          secureTextEntry={true}
        />

        <Button
          title="Click Here To Register"
          onPress={this.UserRegistrationFunction}
          color="green"
        />
        <Text> </Text>
        <Button
          title="go to Login"
          onPress={() => this.props.navigation.navigate('First')}
        />
      </View>
    );
  }
}
class Screen2 extends React.Component {
  static navigationOptions = {
    title: 'LoginActivity',
  };

  constructor(props) {
    super(props);

    this.state = {
      UserEmail: '',
      UserPassword: '',
    };
  }

  UserLoginFunction = () => {
    const { UserEmail } = this.state;
    const { UserPassword } = this.state;

    fetch('https://astrofinal.000webhostapp.com/login.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: UserEmail,

        password: UserPassword,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson === 'Data Matched') {
          //Then open Profile activity and send user email to profile activity.
          this.props.navigation.navigate('Second', { Email: UserEmail });
        } else {
          Alert.alert(responseJson);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.TextComponentStyle}>User Login Form</Text>

        <TextInput
          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Email"
          onChangeText={UserEmail => this.setState({ UserEmail })}
          // Making the Under line Transparent.
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
        />

        <TextInput
          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Password"
          onChangeText={UserPassword => this.setState({ UserPassword })}
          // Making the Under line Transparent.
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
          secureTextEntry={true}
        />

        <Button
          title="Click Here To Login"
          onPress={this.UserLoginFunction}
          color="#2196F3"
        />
      </View>
    );
  }
}

// Creating Profile activity.
class ProfileActivity extends Component {
 constructor(props) {
   super(props);
   this.state = {
     isLoading: true
   }
 }
 

GetItem (id) {
  
 //Alert.alert(text);
this.props.navigation.navigate('Third', { Email: id });
 }


 componentDidMount() {

   return fetch('https://astrofinal.000webhostapp.com/display.php')
     .then((response) => response.json())
     .then((responseJson) => {
       let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
       this.setState({
         isLoading: false,
         dataSource: ds.cloneWithRows(responseJson),
       }, function() {
         // In this block you can do something with new state.
       });
     })
     .catch((error) => {
       console.error(error);
     });
 }

 ListViewItemSeparator = () => {
   return (
     <View
       style={{
         height: .5,
         width: "100%",
         backgroundColor: "#000",
       }}
     />
   );
 }


 render() {
   if (this.state.isLoading) {
     return (
       <View style={{flex: 1, paddingTop: 20}}>
         <ActivityIndicator />
       </View>
     );
   }

   return (

     <View style={styles.MainContainer}>

       <ListView

         dataSource={this.state.dataSource}

         renderSeparator= {this.ListViewItemSeparator}

         renderRow={(rowData) =>

        <View style={{flex:1, flexDirection: 'row'}}>

          <Image onPress={() => this.props.navigation.navigate('First')} source = {{uri: rowData.image}} style={styles.imageViewContainer} />
        
          <Text onPress={this.GetItem.bind(this, rowData.id)} style={styles.textViewContainer} >{rowData.title}</Text>

        </View>
         }
       />

     </View>
   );
 }
}
class Fullstory extends Component{
 // Setting up profile activity title.
   static navigationOptions = {
    title: 'Inyarwanda.com',
  };
    constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      story: this.props.navigation.state.params.Email // get passed data
    }
  } 
  componentDidMount() {
    story = this.state.story;
    
    return fetch('https://astrofinal.000webhostapp.com/singlestory.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
     
        name: story,
     
       
     
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {
          // In this block you can do something with new state.
        });
      })
    .catch((error) => {
      console.error(error);
    })


}

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
   
    return (
      
      
       <View style={styles.MainContainer}>
  
  <ListView

    dataSource={this.state.dataSource}

    renderSeparator= {this.ListViewItemSeparator}

    renderRow={(rowData) =>

   <View>

     <Image source = {{ uri: rowData.image }} style={{width:null, height:400}} />
   
     <Text style={styles.Umutwe} >{rowData.title}  </Text>
      <Text style={styles.Itariki} > {rowData.date}     </Text>
     <Text style={styles.Inkuruyose}>{rowData.text} </Text>
     
     <Text>comment</Text>
   </View>
    }
  />

</View>
     
    );
  }
 

}
// Creating Profile activity.

const MainNavigator = createStackNavigator({

  Second: { screen: ProfileActivity },

  Singnin:{ screen:Screen1},

  First: { screen: Screen2 },

  Third : {screen:Fullstory},
});
const App = createAppContainer(MainNavigator);
export default App;
const styles = StyleSheet.create({
  TextInputStyleClass: {
    textAlign: 'center',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    // Set border Hex Color Code Here.
    borderColor: '#2196F3',

    // Set border Radius.
    borderRadius: 5,
  },

Inkuruyose:{
  marginLeft: 'auto',
  marginRight:'auto',
  marginBottom:100,
},
 Umutwe:{ 
   marginTop:10,
 fontWeight: 'bold',
 fontSize: 20,
      color: 'black'
 },
Itariki:{
  color: '#37859b',
      fontStyle: 'italic',
      textAlign: 'right',
       textShadowColor: 'red',
       marginBottom:5
},
  TextComponentStyle: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
  },
  MainContainer: {
    // Setting up View inside content in Vertically center.
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  imageViewContainer: {
    width: '50%',
    height: 150,
    margin: 10,
    borderRadius: 10,
  },

  textViewContainer: {
    textAlignVertical: 'center',
    width: '50%',
    padding: 20,
  },
});
