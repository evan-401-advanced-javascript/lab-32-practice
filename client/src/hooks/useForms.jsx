import { useState } from 'react';

/**
 * function handle the submit event
 * @param callback
 * @returns {[{}, handleChange, handleSubmit]}
 */
export default function useForm(callback) {
  const [values, setValues] = useState({});

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();

    if (callback) {
      callback(values);
    }
  };

  return [values, handleChange, handleSubmit];
}
