import React, {useCallback, useEffect, useState} from "react";
import {
  Dimensions,
  TouchableOpacity,
  View,
  TextInput, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator
} from "react-native";
import Text from '../../helpers/Text';
import FastImage from "react-native-fast-image";
import {Pusher, PusherChannel, PusherEvent} from "@pusher/pusher-websocket-react-native";
import Container from "../../helpers/Container";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function ChatAdminPage (props) {
  const pusher = Pusher.getInstance();
  const [chatData, setChatData] = useState([]);
  const [connected, setConnected] = useState(false);
  const [inputText, setInputText] = useState("");
  const [adb, setAdb] = useState("1234");
  const [members, onChangeMembers] = React.useState([]);
  useEffect(() => {
    connectPusher();
    return () => {
      pusher.unsubscribe("presence-my-channel" +adb);
      pusher.disconnect();
    };

  }, []);

  const connectPusher = async () => {
    try {
      await pusher.init({
        apiKey: "c2f6a2755da128c18c88",
        cluster: "eu",

        onAuthorizer,
        onConnectionStateChange,
        onError,
        onEvent,
        onSubscriptionSucceeded,
        onSubscriptionError,
        onSubscriptionCount,
        onDecryptionFailure,
        onMemberAdded,
        onMemberRemoved,
      });

      await pusher.connect();

      await pusher.subscribe({ channelName: "presence-my-channel-1234"});
    } catch (e) {
      console.warn('ERROR: ' + e);
    }
  };
  const onConnectionStateChange = (currentState, previousState) => {
    if (currentState === "CONNECTED") {
      setConnected(true);
    }
    else {
      setConnected(false);
    }
    console.warn(`onConnectionStateChange. previousState=${previousState} newState=${currentState}`);
  };

  const onError = (message, code, error) => {
    console.warn(`onError: ${message} code: ${code} exception: ${error}`);
  };

  const onEvent = (event) => {
    console.warn(`onEvent: ${event?.data}`);
    let obj = {
      "type" : "guest",
      "text": event?.data,
    }
    setChatData(prevChatData => [obj, ...prevChatData]);
  };

  const onSubscriptionSucceeded = (channelName, data) => {
    console.warn(
      `onSubscriptionSucceeded: ${channelName} data: ${JSON.stringify(data)}`
    );
    const channel = pusher.getChannel(channelName);

    if (!channel) {
      return;
    }

    const me = channel.me;
    onChangeMembers([...channel.members.values()]);
    console.warn(`Me: ${me}`);
  };

  const onSubscriptionCount = (
    channelName,
    subscriptionCount
  ) => {
    console.warn(
      `onSubscriptionCount: ${subscriptionCount}, channelName: ${channelName}`
    );
  };

  const onSubscriptionError = (
    channelName,
    message,
    e
  ) => {
    console.warn(`onSubscriptionError: ${message}, channelName: ${channelName} e: ${e}`);
  };

  const onDecryptionFailure = (eventName, reason) => {
    console.warn(`onDecryptionFailure: ${eventName} reason: ${reason}`);
  };

  const onMemberAdded = (channelName, member) => {
    console.warn(`onMemberAdded: ${channelName} user: ${member}`);
    const channel = pusher.getChannel(channelName);

    if (!channel) {
      return;
    }

    onChangeMembers([...channel.members.values()]);
  };

  const onMemberRemoved = (channelName, member) => {
    console.warn(`onMemberRemoved: ${channelName} user: ${member}`);
    const channel = pusher.getChannel(channelName);

    if (!channel) {
      return;
    }

    onChangeMembers([...channel.members.values()]);
  };

  // See https://pusher.com/docs/channels/library_auth_reference/auth-signatures/ for the format of this object.
  const onAuthorizer = async (channelName, socketId) => {
    console.warn(
      `calling onAuthorizer. channelName=${channelName}, socketId=${socketId}`
    );

    const response = await fetch('http://192.168.1.220:3001/pusher/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        socket_id: socketId,
        channel_name: channelName,
      }),
    });

    const body = await response.json();

    console.warn(`response: ${JSON.stringify(body)}`);
    return body;
  };

  const trigger = async (text) => {
    await pusher.trigger(
      new PusherEvent({ channelName: "presence-my-channel-1234",  eventName: "client-my-event", data: text, userId: "1234" })
    );

    await fetch('http://192.168.1.220:3001/pusher/chating', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{
          userId: "melsan",
          channel_name: "presence-my-channel-1234",
          message: text
        }]
      ),
    });
  };

  const keyExtractor = useCallback((item, index) => index, []);
  const renderItem = ({item}) => {
    return (
      <View style={{alignItems: item?.type === "me" ? 'flex-end' : 'flex-start', marginBottom: 10}}>
        <View style={{flexDirection: 'row'}}>
          {/*{item?.type === "guest" &&*/}
          {/*  <FastImage*/}
          {/*    source={require('../../assets/icons/otherTail.png')}*/}
          {/*    style={{width: 20, aspectRatio: 1, alignSelf: 'flex-end', marginRight: -16}}*/}
          {/*    resizeMode={'contain'}/>}*/}

          <View style={{borderRadius: 16, padding: 10, backgroundColor: item?.type === "me" ? '#5B8E55' : '#E9E9EB', maxWidth: '80%'}}>
            <Text color={item?.type === "me" ? 'white' : 'black'} style={{marginHorizontal: 10}}>{item?.text}</Text>
          </View>

          {/*{item?.type === "me" &&*/}
          {/*  <FastImage*/}
          {/*    source={require('../../assets/icons/meTail.png')}*/}
          {/*    style={{width: 20, aspectRatio: 1, alignSelf: 'flex-end', marginLeft: -16}}*/}
          {/*    resizeMode={'contain'}/>}*/}

        </View>

      </View>
    );
  }

  function sendQuickMessage(message){
    trigger(message);
    let obj = {
      "type" : "me",
      "text": message,
    }
    setChatData(prevChatData => [...prevChatData, obj]); // push yapar
  }

  function sendMessageButton(){
    if(inputText.trim() !== ""){
      trigger(inputText);
      let obj = {
        "type" : "me",
        "text": inputText,
      }
      setChatData(prevChatData => [obj, ...prevChatData]); // unshift yapar
      setInputText("");
    }
  }
  const quickMessage = (message) => {
    return (
      <TouchableOpacity onPress={() => {
        sendQuickMessage(message)
      }}>
        <View style={{borderWidth: 0.8, borderColor: 'red', alignItems: 'center', borderRadius: 20, paddingVertical: 10, marginBottom: 10}}>
          <Text type={'bold'}>{message}</Text>
        </View>
      </TouchableOpacity>

    );
  }

  if (!connected) {
    return (
      <Container style={{flex: 1}}>
        <ActivityIndicator/>
      </Container>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ height: '100%' }}
    >
      <Container>
        <TouchableOpacity onPress={() => props?.navigation?.goBack()}>
          <Text>geri dönn</Text>
        </TouchableOpacity>

        <View style={{flex: 1, marginHorizontal: 20}}>
          <FlatList
            inverted={true}
            data={chatData}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
          />
          <View style={{ backgroundColor: '#F2F2F2', flexDirection: 'row', height: 40, alignItems: 'center', marginBottom: 30}}>
            <TextInput
              style={{width: screenWidth - 40 - 30, flex: 1, justifyContent: 'center', paddingHorizontal: 10}}
              placeholder={"Mesaj"}
              // textAlignVertical={'center'}
              multiline={true}
              onChangeText={(value) => {
                setInputText(value);
              }}
              value={inputText}
            />
            <View style={{height: 40, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => {
                sendMessageButton();
              }}>
                <FastImage source={require('../../assets/icons/send.png')}
                           style={{width: 30, aspectRatio: 1, marginRight: 10}}
                           resizeMode={'contain'}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Container>
    </KeyboardAvoidingView>
  )
}
export default ChatAdminPage;

