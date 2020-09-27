import React from 'react';
import ViewShot, { captureRef, captureScreen } from "react-native-view-shot";
import Share from 'react-native-share';
import {View, Text, TextInput, Button, ImageBackground, Dimensions, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import Dialog, { DialogTitle, DialogContent, DialogButton, ScaleAnimation } from 'react-native-popup-dialog';

const Height = Dimensions.get('screen').height;
const Width = Dimensions.get('screen').width;

export default class whiteWizard extends React.Component{
constructor(props){
  super(props);
  this.state={
    showTextContainer : true, //modal for custom user input
    userText : '' //custom user text
  }
}

shareMyImage=async()=>{
  // Function to capture the screen and enable user to share the image
  try{
    const uri = await captureRef(this.refs.screenImage, {
      format: 'png',
      quality: 0.8,
    });
    try{
      await Share.open({url: uri});
    }
    catch(e){
      //if user doesn't share image
    }
  }
  catch(e){
    Alert.alert("Error", "Error occured. Try after some time.");
  }
}

render()
{
  return(
    <View>
      <ViewShot ref="screenImage">
        <ImageBackground source={require('./images/background.png')}
        style={styles.img}>
          <Text style={styles.userText}>{this.state.userText}</Text>
        </ImageBackground>
      </ViewShot>

      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.buttonShare}
        onPress={this.shareMyImage}>
          <Text style={styles.buttonText}>Share Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonChange}
        onPress={()=>{
          this.setState({
            userText:'',
            showTextContainer : true
          });
        }}>
          <Text style={styles.buttonText}>Try new text</Text>
        </TouchableOpacity>
      </View>
      
      <Dialog 
        onTouchOutside={()=>{this.setState({showTextContainer : true});}}
        width={0.9}
        visible={this.state.showTextContainer}
        dialogAnimation={new ScaleAnimation()}
        onHardwareBackPress={() => {
              this.setState({ showTextContainer : true });
              return true;
            }}
            dialogTitle={
              <DialogTitle
                title="Enter custom Text"
                hasTitleBar={true}
              />
              }
            actions={
                    [
                      <DialogButton
                        text="DISMISS"
                          onPress={() => {
                            this.setState({showTextContainer : false});
                          }}
                          key="button-1"
                      />,
                      ]
                }>
          <DialogContent>
            <View>
            <TextInput
                placeholder="Enter Custom text                "
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ userText: text })}
                defaultValue={this.state.userText}
                multiline={true}
                numberOfLines={4}
                style={{
                         color: 'navy',
                         fontFamily: 'monospace'
                      }}
            />
            </View>
            <Button
              title="Submit Text" 
              onPress={()=>{
                this.setState({showTextContainer : false});
              }}
            />
          </DialogContent>
      </Dialog>
    </View>
  );
}
}
const styles = StyleSheet.create({
  img : {
    width: Width,
    height : Height*0.7,
    borderWidth : 2,
    borderRadius : 5
  },
  userText : {
    color : 'black',
    fontSize:30,
    marginTop : Height*0.3,
    fontWeight : 'bold',
    alignContent : 'center',
    alignItems : 'center',
    alignSelf : 'center'
  },
  buttonView:{
    flexDirection:'row',
    margin:Width*0.06,
  },
  buttonShare :{
    width : Width*0.4,
    marginRight : 10,
    borderWidth : 2,
    borderRadius : 5,
    height:Height*0.05,
    backgroundColor:'#2e8b57',
  },
  buttonChange : {
    width : Width*0.4,
    marginLeft : 10,
    borderWidth : 2,
    borderRadius : 5,
    backgroundColor:'#2e8b57'   
  },
  buttonText:{
    color:'white',
    fontWeight:'bold',
    fontSize:20,
    alignSelf : 'center',
    padding:5
  }
})