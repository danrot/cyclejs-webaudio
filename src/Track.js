import xs from 'xstream';
import { div, input } from '@cycle/dom';
import isolate from '@cycle/isolate';

function intent(domSource) {
    return {
        changeFrequency$: domSource.select('.frequency').events('input')
            .map(ev => ev.target.value)
    }
}

function model(actions) {
    const frequency$ = actions.changeFrequency$.startWith(440);

    return frequency$.map(frequency => ({frequency}));
}

function view(state$) {
    return state$.map(({ frequency }) => div([
        input('.frequency', { attrs: { value: frequency } })
    ]));
}

function audio(state$) {
    return state$.map(({ frequency }) => ({
        oscillators: [{
            frequency
        }]
    }));
}

function Track(sources) {
    const action$ = intent(sources.DOM);
    const state$ = model(action$);
    const view$ = view(state$);
    const audio$ = audio(state$);

    return {
        DOM: view$,
        WebAudio: audio$
    };
}

export default sources => isolate(Track)(sources);
