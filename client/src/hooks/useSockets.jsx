import {useState, useEffect} from 'react';
import client from 'socket.io-client';
import io from 'socket.io-client';

import Q from "@nmq/q/client";
const queue = new Q('deeds');
const socket = io.connect('http://localhost:3003');

export default function subscribe (event, callback) {

  const [socketMessage, setSocketMessage] = useState({});

    socket.on(event, message => {
      setSocketMessage(message);
      socket.emit('success', /*payload*/);
      if(!!socketMessage) callback(socketMessage);
    });

    return [socketMessage]
}
