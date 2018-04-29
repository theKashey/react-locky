import React from 'react';
import {storiesOf} from '@storybook/react';

import Locky from '../src';

const clone = a => Array(10).fill(1).map(x => a);

const Lock = () => (
  <div>
    {clone(<div>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/></div>)}
    <div style={{overflow: 'scroll', height: 500}}>
      {clone(<div>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/></div>)}
      <div style={{overflow: 'scroll', height: 400}}>
        <Locky onEscape={(event) => console.log('ESC!!', event)}>
          LOCKY!!
          <div style={{overflow: 'scroll', maxHeight: 200, background:'rgba(0,0,0,0.3)'}}>
            <div>
              <div style={{overflow: 'scroll', maxHeight: 60, background:'rgba(0,0,0,0.3)'}}>
              {clone(<div><b>>> LOCK</b>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/>
              </div>)}
              </div>
              {clone(<div><b>>> LOCK</b>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/>
              </div>)}
            </div>
          </div>
        </Locky>
      </div>
      {clone(<div>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/></div>)}

      <Locky enabled={false}>
        LOCK! SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/>
      </Locky>
    </div>
  </div>
)

storiesOf('Lock', module)
  .add('smoke', () => <Lock/>)
;
