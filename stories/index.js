import React from 'react';
import {storiesOf} from '@storybook/react';

import Locky, {LockyTransparent} from '../src';

const clone = a => Array(10).fill(1).map(x => a);

const Lock = () => (
  <div>
    {clone(<div>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/></div>)}
    <LockyTransparent>
      <button onClick={() => alert('transparent')}>OUT OF LOCK</button>
    </LockyTransparent>
    <div style={{overflow: 'scroll', height: 500}}>
      {clone(<div>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/></div>)}
      <div style={{overflow: 'scroll', height: 400}}>
        <Locky onEscape={(event) => console.log('ESC!!', event)}>
          LOCKY!!
          <div style={{overflow: 'scroll', maxHeight: 200, background: 'rgba(0,0,0,0.3)'}}>
            <div>
              <div style={{overflow: 'scroll', maxHeight: 60, background: 'rgba(0,0,0,0.3)'}}>
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

const LockOnly = () => (
  <div>
    {clone(<div>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/></div>)}
    <div style={{overflow: 'scroll', height: 500}}>
      {clone(<div>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/></div>)}
      <LockyTransparent>
        <button onClick={() => alert('transparent')}>a button</button>
      </LockyTransparent>
      <div style={{overflow: 'scroll', height: 400}}>
        <Locky onEscape={(event) => console.log('ESC!!', event)} noDefault events={{click: 'report-only'}}>
          LOCKY!!
          <div style={{overflow: 'scroll', maxHeight: 200, background: 'rgba(0,0,0,0.3)'}}>
            <div>
              <div style={{overflow: 'scroll', maxHeight: 60, background: 'rgba(0,0,0,0.3)'}}>
                {clone(<div><b>>> LOCK</b>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/>
                </div>)}
              </div>
              {clone(<div><b>>> LOCK</b>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/>
              </div>)}
            </div>
          </div>
        </Locky>
      </div>
    </div>
  </div>
)

const LockGroup = () => (
  <div>
    <div style={{overflow: 'scroll', height: 500}}>
      <div style={{overflow: 'scroll', height: 100}}>
        {clone(<div>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/></div>)}
      </div>
      <div style={{overflow: 'scroll', height: 500}}>
        <Locky enabled={true} group="1" onEscape={(event) => console.log('ESC!!', event)}>
          <div style={{overflow: 'scroll', maxHeight: 100, background: 'rgba(0,0,0,0.3)'}}>
            {clone(<div><b>>> LOCK</b>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/>
            </div>)}
          </div>
        </Locky>
        <div style={{overflow: 'scroll', height: 100}}>
          {clone(<div>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/></div>)}
        </div>
        <Locky enabled={true} group="1" onEscape={(event) => console.log('ESC!!', event)}>
          <div style={{overflow: 'scroll', maxHeight: 100, background: 'rgba(0,0,0,0.3)'}}>
            {clone(<div><b>>> LOCK</b>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/>
            </div>)}
          </div>
        </Locky>
      </div>
      <div style={{overflow: 'scroll', height: 100}}>
        {clone(<div>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/></div>)}
      </div>
    </div>
  </div>
)

const LockHeadless = () => (
  <div>
    {clone(<div>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/></div>)}
    <div style={{overflow: 'scroll', height: 500}}>
      {clone(<div>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/></div>)}
      <LockyTransparent>
        <button onClick={() => alert('transparent')}>a button</button>
      </LockyTransparent>
      <div style={{overflow: 'scroll', height: 400}}>
        <Locky headless onEscape={(event) => console.log('ESC!!', event)}>
          <div style={{overflow: 'scroll', maxHeight: 200, background: 'rgba(0,0,0,0.3)'}}>
            <div>
              <div style={{overflow: 'scroll', maxHeight: 60, background: 'rgba(0,0,0,0.3)'}}>
                {clone(<div><b>>> LOCK</b>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/>
                </div>)}
              </div>
              {clone(<div><b>>> LOCK</b>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/>
              </div>)}
            </div>
          </div>
        </Locky>
      </div>
    </div>
  </div>
);

const LockLead = () => (
  <div>
    <div style={{overflow: 'scroll', height: 500}}>
      <div style={{overflow: 'scroll', height: 100}}>
        {clone(<div>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/></div>)}
      </div>
      <div style={{overflow: 'scroll', height: 500}}>
        <Locky enabled={true} leaded group="1" onEscape={(event) => console.log('ESC!!', event)}>
          <div style={{overflow: 'scroll', maxHeight: 100, background: 'rgba(0,0,0,0.3)'}}>
            {clone(<div><b>>> LOCK</b>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/>
            </div>)}
          </div>
        </Locky>
        <div style={{overflow: 'scroll', height: 100}}>
          {clone(<div>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/></div>)}
        </div>
        <Locky enabled={true} leaded group="1" onEscape={(event) => console.log('ESC!!', event)}>
          <div style={{overflow: 'scroll', maxHeight: 100, background: 'rgba(0,0,0,0.3)'}}>
            {clone(<div><b>>> LOCK</b>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/>
            </div>)}
          </div>
        </Locky>
      </div>
      <div style={{overflow: 'scroll', height: 100}}>
        {clone(<div>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/></div>)}
      </div>
    </div>
  </div>
);

const LockyNestedLead = () => (
  <div>
    <div style={{overflow: 'scroll', height: 500}}>
      <div style={{overflow: 'scroll', height: 100}}>
        {clone(<div>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/></div>)}
      </div>
      <div style={{overflow: 'scroll', height: 500}}>
        <Locky enabled={true} leaded group="1" onEscape={(event) => console.log('ESC!!', event)}>
          <div style={{overflow: 'scroll', maxHeight: 100, background: 'rgba(0,0,0,0.3)'}}>
            {clone(<div><b>>> LOCK</b>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/>
            </div>)}
          </div>
        </Locky>
        <div style={{overflow: 'scroll', height: 100}}>
          {clone(<div>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/></div>)}
        </div>
        <Locky enabled={true} leaded group="1" onEscape={(event) => console.log('ESC!!', event)}>
          <div style={{overflow: 'scroll', maxHeight: 200, background: 'rgba(0,0,0,0.3)'}}>
            <Locky enabled={true} leaded group="1" onEscape={(event) => console.log('ESC!!', event)}>
              <div style={{overflow: 'scroll', maxHeight: 100, background: 'rgba(0,0,0,0.3)'}}>
                {clone(<div><b>>> LOCK</b>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/>
                </div>)}
              </div>
            </Locky>
            {clone(<div><b>>> LOCK</b>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/>
            </div>)}
          </div>
        </Locky>
      </div>
      <div style={{overflow: 'scroll', height: 100}}>
        {clone(<div>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/></div>)}
      </div>
    </div>
  </div>
);


const LockyNestedGroup = () => (
  <div>
    <div style={{overflow: 'scroll', height: 500}}>
      <div style={{overflow: 'scroll', height: 100}}>
        {clone(<div>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/></div>)}
      </div>
      <div style={{overflow: 'scroll', height: 500}}>
        <Locky enabled={true}  group="1" onEscape={(event) => console.log('ESC!!', event)}>
          <div style={{overflow: 'scroll', maxHeight: 100, background: 'rgba(0,0,0,0.3)'}}>
            {clone(<div><b>>> LOCK</b>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/>
            </div>)}
          </div>
        </Locky>
        <div style={{overflow: 'scroll', height: 100}}>
          {clone(<div>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/></div>)}
        </div>
        <Locky enabled={true}  group="1" onEscape={(event) => console.log('ESC!!', event)}>
          <div style={{overflow: 'scroll', maxHeight: 200, background: 'rgba(0,0,0,0.3)'}}>
            <Locky enabled={true}  group="1" onEscape={(event) => console.log('ESC!!', event)}>
              <div style={{overflow: 'scroll', maxHeight: 100, background: 'rgba(0,0,0,0.3)'}}>
                {clone(<div><b>>> LOCK</b>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/>
                </div>)}
              </div>
            </Locky>
            {clone(<div><b>>> LOCK</b>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/>
            </div>)}
          </div>
        </Locky>
      </div>
      <div style={{overflow: 'scroll', height: 100}}>
        {clone(<div>SOME TEXT <button onClick={() => alert('!')}>a button</button> or <input/></div>)}
      </div>
    </div>
  </div>
);

storiesOf('Lock', module)
  .add('smoke', () => <Lock/>)
  .add('report-only', () => <LockOnly/>)
  .add('group', () => <LockGroup/>)
  .add('headless', () => <LockHeadless/>)
  .add('leaded locky', () => <LockLead/>)
  .add('nested group', () => <LockyNestedGroup />)
  .add('nested lead', () => <LockyNestedLead />)
;
