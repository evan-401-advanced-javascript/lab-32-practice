import {useState} from 'react';
import Q from "@nmq/q/client";
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3003');

export default function useForm(callback) {

  const [values, setValues] = useState({});

  const handleChange = e => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();

    if(callback) {
      callback(values);
    }
  };

    return [values, handleChange, handleSubmit]
}