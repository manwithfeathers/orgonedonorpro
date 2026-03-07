import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack'
import {useMixer} from './Mixer.jsx'



export default function Settings ({scaleHandler, bpmHandler, scale, asyncHandler, noteProbabilityHandler, noteProbability, bpm}) {

    const { setFx1Level } = useMixer()

    const fxHandler = (e) => {
        setFx1Level(Number(e.target.value))
        
    }

   

    return (
        <div className="border border-dark rounded p-4" data-bs-theme="dark">
            
           
         
            <Stack  >
                
                    <Form.Group className="w-75">
                        <Form.Label>Tempo

                        </Form.Label>
                        <Form.Range onChange ={bpmHandler} min="10" max="200" step="1" value={bpm} >

                        </Form.Range>
                
                    </Form.Group>
                

                    <Form.Group className="w-75">
                            <Form.Label>Feedback

                        </Form.Label>

                        <Form.Range onChange ={fxHandler} min="0" max="1" step="0.01" >

                        </Form.Range>
                        
                    </Form.Group>
                
                    <Form.Group className="w-75">
                        <Form.Label>Note Probability

                        </Form.Label>
                        <Form.Range onChange ={noteProbabilityHandler} min="0" max="1" step="0.01" value={noteProbability} >

                        </Form.Range>
                        
                    </Form.Group>
                    <Form.Select value={scale} size="sm" className="mb-2 w-75"onChange={scaleHandler} >
                
                        <option value="majorpentatonic">majorpentatonic</option>
                        <option value="minorpentatonic">minorpentatonic</option>
                        <option value="major">major</option>
                        <option value="minor">minor</option>
                        <option value="dorian">dorian</option>
                        <option value="mixolydian">mixolydian</option>
                        <option value="lydian">lydian</option>
                
                    </Form.Select> 

                    <Form.Check 
                    type="switch"
                    onChange={asyncHandler}
                    label="async"
                />
            </Stack>

             


        </div> 
    )
}