import React, {useState, useEffect} from 'react';

import io from 'socket.io-client';
import Q from '@nmq/q/client';
import useForms from './hooks/useForms';
import useSockets from './hooks/useSockets';

// Connect outside of the render cycle ...
const socket = io.connect('http://localhost:3003');
const queue = new Q('deeds');

const App = (props) => {

  const [values, handleChange, handleSubmit] = useForms(publish);
  const [queueMessage, setQueueMessage] = useState({});
  const [socketMessage, setSocketMessage] = useState({});
  const [data, connect] = useSockets('http://localhost:3303');


  function publish(values) {

    Q.publish('deeds', 'work', values);
    socket.emit('words', values);

  };

  useEffect( () => {
    queue.subscribe('work', message => {
      console.log('message', message);
      setQueueMessage(message);
    });

    socket.on('incoming', message => {
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
}

export default App;

