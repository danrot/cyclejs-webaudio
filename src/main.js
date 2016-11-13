import xs from 'xstream';
import { run }  from '@cycle/xstream-run';
import { makeDOMDriver, div } from '@cycle/dom';
import Track from './Track';

function main(sources) {
    return new Track(sources);
}

run(main, { DOM: makeDOMDriver('#app') });
