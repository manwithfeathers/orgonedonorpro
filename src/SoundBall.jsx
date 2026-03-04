import * as Tone from "tone";
import Euclid from "./Euclid.js"
import quantise from "./quantise.js"
import { useRef, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import {motion, useMotionValue, useTransform, useAnimate} from "framer-motion"
// import { useAnimate } from "motion/react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'




export default function SoundBall({ id, removeHandler , scale}) {

    


    const ball = {
        width: 120,
        height: 120,
        position: "absolute",
        
        borderRadius: "50%",
        background: "#5dacbd",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
    }
        const [scope, animate] = useAnimate()

        const [eucLength, setEucLength] = useState(16)
        const [eucBeats, setEucBeats] = useState(3)
        

        const synthRef = useRef(null)
        const euclidRef = useRef(null)
        const loopRef = useRef(null)
       
        const fxRef = useRef(null)
        const fx2Ref = useRef(null)
    
        const scaleRef = useRef(null)
        const pitchRef = useRef(null)
        const panRef = useRef(null)

        // x y of ball
        const x = useMotionValue((Math.random() * 200) - 100)
        const y = useMotionValue((Math.random() * 200) - 100)

        const density = useTransform(x, [-300, 300], [0, 16]);
        const rawPitch = useTransform(y, [-300, 300], [70, 24]);
        const rawPan = useTransform(x, [-300, 300], [-0.8, 0.8])
        
        useEffect(() => {
            // this runs once after mount (first render)
       
            // sample y co-ord for pitch
            pitchRef.current = Math.floor(rawPitch.get())

            panRef.current = new Tone.Panner(0)
            
            
            panRef.current.pan.value = rawPan.get()
            fx2Ref.current = new Tone.FeedbackDelay("8n", 0.1)
        
            fxRef.current = new Tone.Reverb({
                roomSize : 0.1 ,
                dampening : 10000,
                wet: 0.7
                }).toDestination()

            synthRef.current = new Tone.FMSynth()
    
            euclidRef.current = new Euclid(0, 3, 16)
            //schedule loop (starts when transport starts)
            loopRef.current = new Tone.Loop(playNote, "8n").start(0);
            
            synthRef.current.connect(panRef.current)
            
            panRef.current.connect(fx2Ref.current)
            
            fx2Ref.current.connect(fxRef.current)
           

              return () => {
                //clean up
                if (loopRef.current) loopRef.current.dispose()
                if (synthRef.current) synthRef.current.dispose()
                if (fx2Ref.current) fx2Ref.current.dispose()
                if (fxRef.current) fxRef.current.dispose()
                if (panRef.current) panRef.current.dispose()
  }

        }, [])

        

        useEffect(() => {
            euclidRef.current.hits = eucBeats
            euclidRef.current.length = eucLength
            
        }, [eucBeats, eucLength])

      

        useEffect(() => {
            scaleRef.current = scale
        }, [scale])
        
       const beatHandler = (e) => {

         setEucBeats( Number(e.target.value))
       }

       const lengthHandler = (e) => {
        let length =  Number(e.target.value)
        if (length >= eucBeats)
        {
            setEucLength(length)
        }
        
       }

    

       const offsetHandler = (e) => {
        
        euclidRef.current.offset = Number(e.target.value)
       }

     
        const playNote = () => {
           
            // advance euclidean sequencer
            euclidRef.current.bang()

            // get note data from y-axis of ball
            let quantisedNote = quantise(pitchRef.current, scaleRef.current)
           
            let note = Tone.Frequency(quantisedNote, "midi").toFrequency()

            // is there a beat on this measure?
            
            
            if (euclidRef.current.beat) {
                
                synthRef.current.triggerAttackRelease(note, "8n");
                animate(scope.current, { opacity: 0.9 })
                    
            } else {
                 animate(scope.current, { opacity: 1 })
                    
            }
            
        }

        
    

    useEffect(() => {

        rawPitch.onChange((val) => {

            
            pitchRef.current = Math.floor(rawPitch.get())
        })

        density.onChange((val) => {
          
            
            setEucBeats(Math.floor(density.get()))

        })

        rawPan.onChange((val) => {

            panRef.current.pan.value = rawPan.get()
        })
        

    }, [rawPitch, density, rawPan])

   
        

    return (
        
            <motion.div className={{id}} drag 
                dragConstraints={{
                    top: -300,
                    left: -300,
                    right: 300,
                    bottom: 300,
                }} style={{ ...ball, x, y }} ref={scope}>
                <div >
                    <Stack gap={1} >
                        <Button variant="outline-dark"  type="Button" onClick = {() => removeHandler(id)}><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon></Button>

                    
                    
    
                
                        {/* <div>
                            < Stack direction="horizontal" gap={1}>

                            <Form.Label className="p-2">density</Form.Label> 
                            <Form.Label className="p-2 ms-auto" >{eucBeats}</Form.Label>

                        </Stack>
                

                        <Form.Range className="mb-1" id="beats" type="range" min="0" max="8" step="1"  onChange={beatHandler}></Form.Range>
                        
                        </div> */}
                        {/* <div>
            
                    < Stack direction="horizontal" gap={1}>
                        
                    
                            <Form.Label className="p-2">length</Form.Label>
                            <Form.Label className="p-2 ms-auto">{eucLength}</Form.Label>
                        </Stack>
                
                            <Form.Range className="mb-1" min="1" max="16" step="1" onChange={lengthHandler}></Form.Range>
                    
                
                        </div> */}
                        {/* <div>

                    < Stack direction="horizontal" gap={1}>

                    
                        <Form.Label className="p-2">octave</Form.Label> 
                        <Form.Label className="p-2 ms-auto">{octave}</Form.Label>

                    </Stack>
                        <Form.Range className="mb-1" min="-2" max="2" step="1" onChange={octaveHandler}></Form.Range> 
                    
                        </div> */}

                        </Stack>
                

                </div>
            </motion.div>
    
    )

    

}