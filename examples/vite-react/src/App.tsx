// @ts-nocheck

import './App.css'

import { defineCustomElements, ScrshotArea, ScrshotDebug } from '@scrshot/react';
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
        <ScrshotDebug />
      </div>

      <Screenshot />
    </div>
  )
}

export default App
