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




function App() {


  const [started, setStarted] = useState(false)
 
  const [playing, setPlaying] = useState(false)
  const [voices1, setVoices1 ] = useState([0])
  const [voices2, setVoices2 ] = useState([])
  const [voices3, setVoices3 ] = useState([])
  const [voices4, setVoices4 ] = useState([])
  const [async, setAsync] = useState(false)

  const [showSettings, setShowSettings] = useState(false)



  const [scale, setScale ] = useState("majorpentatonic")
  const [bpm, setBpm ] = useState(100)

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

  const handleVoiceMaker1 = () => {
    setVoices1(prev => [...prev, Math.random()])
  }

  const handleVoiceMaker2 = () => {
    setVoices2(prev => [...prev, Math.random()])
  }

  const handleVoiceMaker3 = () => {
    setVoices3(prev => [...prev, Math.random()])
  }

  const handleVoiceMaker4 = () => {
    setVoices4(prev => [...prev, Math.random()])
  }


  const removeHandler1  = (idToRemove) => {
    setVoices1(prev => prev.filter( id => id !== idToRemove))
  }

   const removeHandler2  = (idToRemove) => {
    setVoices2(prev => prev.filter( id => id !== idToRemove))
  }

  const removeHandler3  = (idToRemove) => {
    setVoices3(prev => prev.filter( id => id !== idToRemove))
  }

  const removeHandler4  = (idToRemove) => {
    setVoices4(prev => prev.filter( id => id !== idToRemove))
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
        <div className="splash" onClick = {handleStart}>
          
         <h2> Welcome to Orgone Donor Euclidean Synthesiser</h2><br /><br/> 
          <h3>
          Add new voices and move them around<br />
          Up and down: pitch<br />
          Right and left: rhythm density<br /><br/>
            iPhone users: make sure your phone is not on silent<br /><br/>
       
          
         Click to start 
      
          </h3>
        </div>

      </>
    )
  } 

  return (
    <>
    <Mixer>
     
        
          <Stack className="bg-info-subtle p-3 rounded shadow-sm mb-4 w-auto" direction="horizontal" gap={3}>
            <Button className="d-flex align-items-center justify-content-center" type="Button" variant="outline-dark"  onClick= { handlePlay } > <FontAwesomeIcon icon={ playing ? faPause : faPlay}></FontAwesomeIcon> </Button>
            <Button className="d-flex align-items-center justify-content-center" type="Button" variant="outline-dark" onClick= { handleVoiceMaker1 } ><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
            <Button className="d-flex align-items-center justify-content-center" type="Button" variant="outline-dark" onClick= { handleVoiceMaker2 } ><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
            <Button className="d-flex align-items-center justify-content-center" type="Button" variant="outline-dark" onClick= { handleVoiceMaker3 } ><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
            <Button className="d-flex align-items-center justify-content-center" type="Button" variant="outline-dark" onClick= { handleVoiceMaker4 } ><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
            <Button className="d-flex align-items-center justify-content-center" type="Button" variant="outline-dark" onClick= { handleSettings } ><FontAwesomeIcon icon={faGear}></FontAwesomeIcon></Button>
            {showSettings && <Settings scaleHandler={scaleHandler} bpmHandler={bpmHandler} scale={scale} asyncHandler={asyncHandler}/>}

         </Stack>

    
              {voices1.map( id => (
                <SoundBall 
                  key={id}
                  removeHandler = {removeHandler1}
                  id = {id}
                  scale = {scale}
                  type = "fm"
                  shape = {ball}
                  bus = "bus1"
                  async = {async}
                  />
              ))}

             

               {voices2.map( id => (
                <SoundBall 
                  key={id}
                  removeHandler = {removeHandler2}
                  id = {id}
                  scale = {scale}
                  type = "square"
                  shape = {square}
                  bus = "bus1"
                   async = {async}
               
                  />
              ))}

               {voices3.map( id => (
                <SoundBall
                  key={id}
                  removeHandler = {removeHandler3}
                  id = {id}
                  scale = {scale}
                  type = "kick"
                   shape = {rhombus}
                  bus = "bus2"
                   async = {async}

                    
                   
                  />
              ))}


               {voices4.map( id => (
                <SoundBall
                  key={id}
                  removeHandler = {removeHandler4}
                  id = {id}
                  scale = {scale}
                  type = "snare"
                   shape = {polygon}
                  bus = "bus2"
              async = {async}
                 
                   
                  />
              ))}
              
    </Mixer>
    </>
  )
}


export default App
