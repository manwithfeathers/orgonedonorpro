import { useState, useRef, useEffect } from 'react'
import './App.css'
// import SampleVoice from "./SampleVoice.jsx"
import SoundBall from "./SoundBall.jsx"
import SoundBall2 from "./SoundBall2.jsx"
import SoundBall3 from "./SoundBall3.jsx"
import SoundBall4 from "./SoundBall4.jsx"


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



function App() {


  const [started, setStarted] = useState(false)
 
  const [playing, setPlaying] = useState(false)
  const [voices1, setVoices1 ] = useState([0])
  const [voices2, setVoices2 ] = useState([])
  const [voices3, setVoices3 ] = useState([])
  const [voices4, setVoices4 ] = useState([])



  const [scale, setScale ] = useState("major")
  const [bpm, setBpm ] = useState(100)

  const handleStart = () => {
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
          <h3>
            
          
         
            iPhone users: make sure your phone is not on silent<br /><br/>
       
          
         Click to start 
      
          </h3>
        </div>

      </>
    )
  } 

  return (
    <>
    
     
        
          <Stack className="bg-info-subtle p-3 rounded shadow-sm mb-4 w-auto" direction="horizontal" gap={3}>
            <Button className="d-flex align-items-center justify-content-center" type="Button" variant="outline-dark"  onClick= { handlePlay } > <FontAwesomeIcon icon={ playing ? faPause : faPlay}></FontAwesomeIcon> </Button>
            <Button className="d-flex align-items-center justify-content-center" type="Button" variant="outline-dark" onClick= { handleVoiceMaker1 } ><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
            <Button className="d-flex align-items-center justify-content-center" type="Button" variant="outline-dark" onClick= { handleVoiceMaker2 } ><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
            <Button className="d-flex align-items-center justify-content-center" type="Button" variant="outline-dark" onClick= { handleVoiceMaker3 } ><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
            <Button className="d-flex align-items-center justify-content-center" type="Button" variant="outline-dark" onClick= { handleVoiceMaker4 } ><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>



           
         </Stack>

            
    
              {voices1.map( id => (
                <SoundBall 
                  key={id}
                  removeHandler = {removeHandler1}
                  id = {id}
                  scale = {scale}
                  />
              ))}

             

               {voices2.map( id => (
                <SoundBall2 
                  key={id}
                  removeHandler = {removeHandler2}
                  id = {id}
                  scale = {scale}
                  />
              ))}

               {voices3.map( id => (
                <SoundBall3
                  key={id}
                  removeHandler = {removeHandler3}
                  id = {id}
                  scale = {scale}
                  />
              ))}


               {voices4.map( id => (
                <SoundBall4
                  key={id}
                  removeHandler = {removeHandler4}
                  id = {id}
                  scale = {scale}
                  />
              ))}
              

    </>
  )
}


export default App
