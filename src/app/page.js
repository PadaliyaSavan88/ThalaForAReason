"use client"

import Image from 'next/image'
import styles from './page.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';

export default function Home() {
  const [value, setValue] = useState('');
  const [backgroundColor, setbackgroundColor] = useState('white')
  const playmusic = (isThala) => {
    console.log(isThala)
    const audio = isThala ? new Audio('/thala.mp3') : new Audio('/moye-moye.mp4');
    audio.volume = 0.5; // Adjust the volume as needed
    audio.loop = false;
    audio.play().catch(error => console.error('Error playing audio:', error));
  }
  const checkAnswer = () => {
    if (!isNaN(value)) {
      let numStr = value.toString();
      let sum = 0;
      let combinationResult = 0;

      // Iterate through each digit of the number
      for (let i = 0; i < numStr.length; i++) {
        // Convert the digit back to a number
        let digit = parseInt(numStr[i]);

        // Update the sum
        sum += digit;

        // Update the combination result (alternating addition and subtraction)
        if (i % 2 === 0) {
          combinationResult += digit;
        } else {
          combinationResult -= digit;
        }
      }

      // Check if the sum or combination result is 7
      playmusic(sum === 7 || combinationResult === 7)
      let color = (sum === 7 || combinationResult === 7) ? '#C1F2B0' : '#C70039'
      setbackgroundColor(color)
      setTimeout(() => {
        setbackgroundColor('white')
      }, 7000)
      // playmusic(false)
      return false; // No digit has a relation with 7
    } else if (typeof value === 'string') {
      // Check if the string length is 7 or if it is equal to "seven"
      if (value.length === 7 || value.toLowerCase() === "seven" || value.toLowerCase() === "dhoni" || value.toLowerCase() === "thala") {
        playmusic(true)
        setbackgroundColor('#C1F2B0')
        setTimeout(() => {
          setbackgroundColor('white')
        }, 7000)
        return true;
      }
      setbackgroundColor('#C70039')
      playmusic(false)
    }
  }

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor,
  };

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the input value, for example, log it
    console.log('Input Value:', value);
    checkAnswer()
  };

  return (
    <>
      <div style={cardStyle} className='card'>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', backgroundColor: 'white' }}>
          <p>Is Input Related To Thala...</p>
          <form onSubmit={handleSubmit}>
            {/* Your form elements go here */}
            <label className='p-2'>
              <input type="text" className='form-control' placeholder='Input' required value={value} onChange={handleInputChange} />
            </label>
            <div className='p-2'>
              <button type="submit" className='btn btn-primary'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
