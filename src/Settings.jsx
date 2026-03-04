import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack'


export default function Settings ({scaleHandler, bpmHandler}) {

    return (
    <div>
               <Form.Select  size="sm" className="mb-2"onChange={scaleHandler}>
              
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
                <Form.Range onChange ={bpmHandler} min="10" max="200" step="1">

                </Form.Range>
                <Form.Label>Tempo

                </Form.Label>
              </Stack>
            </div>


            </div> 
    )
}