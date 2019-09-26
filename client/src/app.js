import React, { useState, useEffect } from 'react';

import io from 'socket.io-client';
import Q from '@nmq/q/client';
// eslint-disable-next-line
import useForms from './hooks/useForms';

// Connect outside of the render cycle ...
const socket = io.connect('http://localhost:3003');
const queue = new Q('deeds');

/**
 * This function emits to the server when the submit button is pressed.
 * It also renders all the components fo the front end.
 * @returns {*}
 * @constructor
 */
const App = () => {
  const [queueMessage, setQueueMessage] = useState({});
  const [socketMessage, setSocketMessage] = useState({});

  function publish(values) {
    Q.publish('deeds', 'work', values);
    socket.emit('words', values);
  }

  const [values, handleChange, handleSubmit] = useForms(publish);

  useEffect(() => {
    queue.subscribe('work', (message) => {
      setQueueMessage(message);
    });

    socket.on('incoming', (message) => {
      setSocketMessage(message);
    });
  }, []);


  return (
    <>
      <pre>Form Values: {JSON.stringify(values)}</pre>
      <pre>Queue Values: {JSON.stringify(queueMessage)}</pre>
      <pre>Socket Values: {JSON.stringify(socketMessage)}</pre>
      <form onSubmit={handleSubmit}>
        <input name='firstName' placeholder="First Name" onChange={handleChange} />
        <input name='lastName' placeholder="Last Name" onChange={handleChange} />
        <button>Save</button>
      </form>
    </>
  );
};

export default App;
