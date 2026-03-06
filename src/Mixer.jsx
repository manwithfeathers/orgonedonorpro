import { useContext, useRef, useEffect, useState, createContext} from 'react';
import * as Tone from "tone";

// create audio context 
const AudioContext = createContext(null)

export const useMixer = () => useContext(AudioContext)

export default function Mixer({ children }) {

    const masterRef = useRef(null)
    const bus1Ref = useRef(null)
    const bus2Ref = useRef(null)
    const revRef = useRef(null)
    
    if (!masterRef.current) {
         masterRef.current = Tone.getDestination()
    }

    if (!revRef.current) {
        revRef.current = new Tone.Reverb()

    }

    if (!bus1Ref.current) {
         bus1Ref.current = new Tone.FeedbackDelay()
         bus1Ref.current.connect(revRef.current)
         revRef.current.connect(masterRef.current)

    }

    if (!bus2Ref.current) {
        bus2Ref.current = new Tone.Compressor() 
        bus2Ref.current.connect(masterRef.current)
    }

   

    return (
        <>
           
            <AudioContext.Provider value={{master: masterRef.current, bus1: bus1Ref.current, bus2: bus2Ref.current }}>
                {children}
            </AudioContext.Provider>
        
        </>
    )



}