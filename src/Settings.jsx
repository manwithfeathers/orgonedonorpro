import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack'
import {useMixer} from './Mixer.jsx'



export default function Settings ({scaleHandler, bpmHandler, scale, asyncHandler}) {

    const { setFx1Level } = useMixer()

    const fxHandler = (e) => {
        setFx1Level(Number(e.target.value))
        
    }

   

    return (
        <div>
            
            <Form.Select value={scale} size="sm" className="mb-2"onChange={scaleHandler}>
                
                <option value="majorpentatonic">majorpentatonic</option>
                <option value="minorpentatonic">minorpentatonic</option>
                <option value="major">major</option>
                <option value="minor">minor</option>
                <option value="dorian">dorian</option>
                <option value="mixolydian">mixolydian</option>
                <option value="lydian">lydian</option>
                
            </Form.Select> 
            <div>
                <Stack>
                    <div >
                    <Form.Range onChange ={bpmHandler} min="10" max="200" step="1">

                    </Form.Range>
                    <Form.Label>Tempo

                    </Form.Label>
                    </div>
                    <div>

                    <Form.Range onChange ={fxHandler} min="0" max="1" step="0.01">

                    </Form.Range>
                    <Form.Label>Feedback

                    </Form.Label>
                    </div>

                     <Form.Check 
                        type="switch"
                        onChange={asyncHandler}
                        label="async"
                        
          />
                </Stack>

             </div>


        </div> 
    )
}