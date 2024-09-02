import React from 'react';
import {Framework} from "./framework/Framework";
import views from './views'
import './assets/css/common.less'

const App = () => {
    return (
        <Framework views={views} default={'FlowDesigner'} />
    )
}

export default App;