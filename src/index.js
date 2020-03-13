import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ViewSchedule from './ViewSchedule'
import * as serviceWorker from './serviceWorker';
import { Apply } from './ApplyAppointment';
import ViewCoursePlan from './VIewCoursePlan';
import Profile from './Profile';

// ReactDOM.render(<ViewSchedule facultyId={1} />, document.getElementById('root'));
ReactDOM.render(<Profile/>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
