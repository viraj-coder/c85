import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity,Animated,Dimensions } from 'react-native';
import {ListItem,Icon} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';
import db from '../config';
export default class SwipableFlatlist extends Component{
    constructor(props){
        super(props);
        this.state={
            allNotifications:this.props.allNotifications
        }
    }
    updateMarkAsread=(notifications)=>{
        db.collection("all_notifications").doc(notification.doc_id).updtate({
            "notification_status":"read"
        })
    }
    onSwipeValueChange=swipeData=>{
        var allNotifications=this.state.allNotifications
        const {key,value}=swipeData;
        if(value<-Dimensions.get('window').width){
        const newData=[...allNotifications];
        const prevIndex=allNotifications.findIndex(item=>item.key===key);
        this.updateMarkAsread(allNotifications[prevIndex]);
        newData.splice(prevIndex,1);
        this.setState({allNotification:newData})
    
        }
    }
    renderItem=data=>{
        <ListItem 
        leftElement={<Icon name="book" type="font-awesome" color='blue'/>}
        title={data.item.book_name}
        titleStyle={{color:'black',fontWidth:'bold'}}
        subtitle={data.item.message}
        bottomDivider
        />
    }
    renderHiddenItem=()=>{
        <View style={style.rowBack}>
            <View>
            <Text style={styles.backTextWhite}>
        
            </Text>

            </View>
        </View>
    }
render(){
    return(
        <View>
            <SwipeListView
            disableRightSwipe
            data={this.state.allNotifications}
            renderItem={this.renderItem}
            renderHiddenItem={this.renderHiddenItem}
            rightOpenValue={-Dimensions.get('window').width}
            previewRowKey={'0'}
            previewOpenVlaue={-40}
            previewOpenDelay={3000}
            onSwipeValueChange={this.onSwipeValueChange}
            />
            <Text>
                SwipableFlatlist
            </Text>
        </View>
    )
}

}
