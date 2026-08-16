import { StrictMode } from 'react' //import strict mode for debugging 
import { createRoot } from 'react-dom/client' //connects react components to browser DOM
import App from './App.jsx' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> //runs the app.jsx file
  </StrictMode>,
)


//starting point to tell broswer where it should start rendering 
//connection point between plain html page and React components
//the browser only understands html/css/js but does not understand react component
//createroot make it reference the root div and every other DOM element will be wrapped in between <div id="root"> </div>