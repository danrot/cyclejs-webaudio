import xs from 'xstream';
import { input } from '@cycle/dom';

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
    return state$.map(({ frequency }) => input('.frequency', { attrs: { value: frequency } }));
}

function Track(sources) {
    return {
        DOM: view(model(intent(sources.DOM)))
    };
}

export default Track;
