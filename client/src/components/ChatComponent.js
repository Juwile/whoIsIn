import React, {Component} from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Card, Avatar, Input } from 'antd';

const { Search } = Input;
const { Meta } = Card;

const webSocketAddress = process.env.REACT_APP_WEB_SOCKET || 'ws://127.0.0.1:4000' ;

const client = new W3CWebSocket(webSocketAddress);

class ChatComponent extends Component {

    state = {
        userName: '',
        isLoggedIn: false,
        messages: []

    }

    onButtonClicked = (value) => {
        client.send(JSON.stringify({
            type: "message",
            msg: value,
            user: this.state.userName
        }));
        this.setState({searchVal: ''}) // clearing word in Chattext Input Field
    }

    componentDidMount() {
        client.onopen = () => {
         console.log('Websocket Client connected')
        };
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log('got Reply! ', dataFromServer);
            if (dataFromServer.type === "message") {
                this.setState((state) =>
                ({
                    messages: [ ...state.messages,
                        {
                            msg: dataFromServer.msg,
                            user: dataFromServer.user
                        }]
                })
            );
        }
    };
}

    render() {
        return (
            <div className="chat box-styling">
                {this.state.isLoggedIn ?
                    <div>
                        <div className="title">
                            <h2>Have fun with chatting</h2>
                        </div>
                        <div style={{ display:'flex', flexDirection:'column', paddingBottom: 50}}>
                            {this.state.messages.map(message =>
                            <Card key={message.msg} style={{ witdh: 300, maring: '16px 4px 0 4px', alignSelf: this.state.userName === message.user ? 'flex-end' : 'flex-start' }}>
                                <Meta
                                avatar={
                                    <Avatar style={{ color: 'blue'}}>{message.user[0].toUpperCase()}</Avatar>}
                                title={message.user}
                                description={message.msg}
                                />
                            </Card>
                            )}
                        </div>
                        <div className="bottom">
                            <Search
                                placeholder="input message and send"
                                enterButton="Send"
                                value={this.state.searchVal}
                                size="large"
                                onChange={(e) => this.setState({searchVal: e.target.value})}
                                onSearch={value => this.onButtonClicked(value)}
                            />
                        </div>
                    </div>
                    :
                    <div>
                        <h2>Chat with teammates</h2>
                        <Search
                            placeholder="Enter Username"
                            enterButton="Login"
                            size="large"
                            onSearch={value => this.setState({isLoggedIn: true, userName: value})}
                        />
                    </div>
                }
            </div>
        );
    }
}

export default ChatComponent;