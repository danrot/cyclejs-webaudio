import xs from 'xstream';
import { run }  from '@cycle/xstream-run';
import { makeDOMDriver, div } from '@cycle/dom';
import App from './App';

function main(sources) {
    return new App(sources);
}

run(main, { DOM: makeDOMDriver('#app') });
