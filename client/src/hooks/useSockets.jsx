import { useState } from 'react';

const socket = io.connect('http://localhost:3003');

/**
 * function in progress to handle subscribe event
 * @param event
 * @param callback
 * @returns {[{}]}
 */
export default function subscribe(event, callback) {
  const [socketMessage, setSocketMessage] = useState({});

  socket.on(event, message => {
    setSocketMessage(message);
    socket.emit('success');
    if (!!socketMessage) callback(socketMessage);
  });

  return [socketMessage];
}
