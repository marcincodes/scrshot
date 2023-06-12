import './App.css'

import { defineCustomElements, ScrshotArea } from '@scrshot/react';
import Content from './Content';
import Screenshot from './Screenshot';

defineCustomElements();

function App() {
  return (
    <div className='grid'>
      <div>
        <h1>I'm a real application code</h1>
        <ScrshotArea>
          <Content />
        </ScrshotArea>
      </div>

      <Screenshot />
    </div>
  )
}

export default App
