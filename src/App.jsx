import { useState, useRef, useEffect , useContext } from 'react'
import './App.css'
// import SampleVoice from "./SampleVoice.jsx"
import SoundBall from "./SoundBall.jsx"

import Settings from './Settings.jsx'
import Mixer from './Mixer.jsx'
import { ball, square, rhombus, polygon } from './shapes.js'

import * as Tone from "tone"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';

import {motion} from "framer-motion"




function App() {



  const [started, setStarted] = useState(false)
 
  const [playing, setPlaying] = useState(false)
  const [voices, setVoices ] = useState([{id: Math.random(), type: "fm", shape: ball}])
 
  const [async, setAsync] = useState(false)
  

  const [showSettings, setShowSettings] = useState(false)



  const [scale, setScale ] = useState("majorpentatonic")
  const [bpm, setBpm ] = useState(100)
  const [noteProbability, setNoteProbability] = useState(1)

  const handleStart = () => {
    Tone.start()
    setStarted(!started)
  }

  const handlePlay = async () => {

  
    if (!playing) {

      await Tone.start()
      await Tone.getContext().resume()
    
      Tone.Transport.start()
    } else {
      Tone.Transport.stop()
    }
    setPlaying(!playing)
  }

  const handleVoiceMaker = (type, shape) => {
    setVoices(prev => [...prev, {id: Math.random(), type, shape}])
  }



  const removeHandler  = (idToRemove) => {
    setVoices(prev => prev.filter( voice => voice.id !== idToRemove))
  }



  const scaleHandler = (e) => {
    setScale(e.target.value)
  }

   const asyncHandler = (e) => {
    setAsync(!async)
  }

  const handleSettings = (e) => {
    setShowSettings(!showSettings)
  }

  const noteProbabilityHandler = (e) => {
    setNoteProbability(Number(e.target.value))
  }

  const bpmHandler = (e) => {
    let bpm = Number(e.target.value)
   
    setBpm(bpm)
    

  }

  useEffect(()=> {
   
    Tone.getTransport().bpm.value  = bpm


  }, [bpm])

  if (!started) {
    return( 
      <>
        <motion.div  
        initial={{opacity: 0}}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              duration: 3
            }
          }}
          className="splash" 
          onClick = {handleStart}>
          
         <h2> Welcome to Orgone Donor Euclidean Synthesiser</h2><br /><br/> 
          <h3>Up & Down: Pitch<br />
          Right & Left: Rhythm Density<br /><br/>
            
          iPhone users: make sure your phone is not on silent<br /><br/>
          Click to start 
      
          </h3>
        </motion.div>

      </>
    )
  } 

  return (
    <>
    <Mixer>
      <div>
        {showSettings && <Settings scaleHandler={scaleHandler} bpmHandler={bpmHandler} scale={scale} asyncHandler={asyncHandler} noteProbabilityHandler={noteProbabilityHandler} bpm={bpm} noteProbability={noteProbability}/>}
      </div>
          <Stack className="bg-info-subtle p-2 rounded shadow-sm w-auto" direction="horizontal" gap={3}>
            <Button className="d-flex align-items-center justify-content-center" type="Button" variant="outline-dark"  onClick= { handlePlay } > <FontAwesomeIcon icon={ playing ? faPause : faPlay}></FontAwesomeIcon> </Button>
            <Button className="d-flex align-items-center justify-content-center" type="Button" variant="outline-dark" onClick= { () =>handleVoiceMaker("fm", ball) } ><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
            <Button className="d-flex align-items-center justify-content-center" type="Button" variant="outline-dark" onClick= { () =>handleVoiceMaker("square", square) } ><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
            <Button className="d-flex align-items-center justify-content-center" type="Button" variant="outline-dark" onClick= { () =>handleVoiceMaker("kick", polygon ) } ><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
            <Button className="d-flex align-items-center justify-content-center" type="Button" variant="outline-dark" onClick= { () =>handleVoiceMaker("snare", rhombus) } ><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
            <Button className="d-flex align-items-center justify-content-center" type="Button" variant="outline-dark" onClick= { handleSettings } ><FontAwesomeIcon icon={faGear}></FontAwesomeIcon></Button>
         </Stack>

             
             

              {voices.map( ({id,type, shape}) => (
                <SoundBall 
                  key={id}
                  removeHandler = {removeHandler}
                  id = {id}
                  scale = {scale}
                  type = {type}
                  shape = {shape}
                  bus = "bus1"
                  async = {async}
                  noteProbability={noteProbability}
               
                  />
              ))}

            


              
              
    </Mixer>
    </>
  )
}


export default App
