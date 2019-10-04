import React from 'react';
import Graphic from './components/Graphic';
import AlertList from "./components/AlertList";
import {BrowserRouter, Route} from "react-router-dom";

function App() {
    return (
        <div className="App">

            <BrowserRouter>
                <div>
                    <Route path="/" exact component={AlertList}/>
                    <Route path="/graph/:id" exact component={Graphic}/>

                </div>
                
            </BrowserRouter>
        </div>
);
}

export default App;