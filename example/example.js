
import Switchery from "../src/switchery2";

let switches = {};
let switchConfig = {
    'demo-default-1': {},
    'demo-size-1': {
        size: 'small'
    },
    'demo-size-2': {
        size: 'default'
    },
    'demo-size-3': {
        size: 'large'
    },
    'demo-checked-1': {
        checked: false
    },
    'demo-checked-2': {
        checked: true
    },
    'demo-text-1' :{
        showText: true,
        onText: 'O',
        offText: 'X'
    },
    'demo-color-1': {
        color    : '#34B363',
        secondaryColor   : '#D6B3A3',
        jackColor      : '#1453B3',
        jackSecondaryColor     : '#A4B363'
    },
    'switch-danger' : {
        secondaryColor : '#d06d6d',
        color : '#e61818',
        jackColor      : '#f17d05',
        jackSecondaryColor     : '#ffffff'
    },
    'switch-primary' : {
        secondaryColor : '#5e81a7',
        color : '#0575ef',
        jackColor      : '#1453B3',
        jackSecondaryColor     : '#ffffff'
    },
    'switch-black' : {
        secondaryColor : '#bec3c7',
        color : '#101010',
        jackColor      : '#1453B3',
        jackSecondaryColor     : '#ffffff'
    },
    'switch-success' : {
        secondaryColor : '#8fc59b',
        color : '#28bd4a',
        jackColor      : '#03f56f',
        jackSecondaryColor     : '#ffffff'
    },
    'switch-warning' : {
        secondaryColor : '#eacd74',
        color : '#fdbf00',
        jackColor      : '#855439',
        jackSecondaryColor     : '#ffffff'
    },
    'switch-info' : {
        secondaryColor : '#7bc5d2',
        color : '#09d3f7',
        jackColor      : '#1453B3',
        jackSecondaryColor     : '#ffffff'
    },
    'switch-transparent' : {
        secondaryColor : '#ffffff',
        color : '#ffffff',
        jackColor      : '#1453B3',
        jackSecondaryColor     : '#ffffff'
    },
    'demo-disabled-1': {
        checked: true,
        disabled: true
    },
    'demo-api-1': {},
    'demo-destroy-1': {},
};

Object.keys(switchConfig).forEach(function (key) {
    switches[key] = new Switchery(document.querySelector('.' + key),switchConfig[key]);
});

function switchHandle(key, event) {
    switches[key][event]();
}

window.switchHandle = switchHandle;
