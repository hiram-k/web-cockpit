import * as Events from "ts-events"
import {ViewState} from "./viewstate"
import {RootPresenter} from "./presenter/root"

type StateTransition = (prev:  ViewState) => ViewState;
type StateUpdator = (trans: StateTransition) => void;

function yieldEvent(queue: Events.QueuedEvent<string>)
{
    return new Promise<string>(resolve => queue.attach(msg => resolve(msg)));
}

async function reducer(events: Events.QueuedEvent<string>, updator: StateUpdator)
{
    await reducer2(events, updator);
    while (true) {
        const msg = await yieldEvent(events);
        updator(s => s.incrN());
        console.log(msg);
    }
}

async function reducer2(events: Events.QueuedEvent<string>, updator: StateUpdator)
{
        const msg1 = await yieldEvent(events);
        updator(s => s.incrM());
        await delay(1000);
        updator(s => s.incrM());
        await delay(1000);
        updator(s => s.incrM());
        await delay(1000);
        updator(s => s.incrM());
        const msg2 = await yieldEvent(events);
        console.log("2");
        updator(s => s.incrM());
        const msg3 = await yieldEvent(events);
        console.log("3");
        updator(s => s.incrM());
}

function delay(ms:number)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

class CoordinatorInner
{
    private _update: (state: RootPresenter) => void;
    private _state: ViewState;
    private _queue: Events.QueuedEvent<string>;
    
    initialize()
    {
        console.log("initialize");
        this._state = new ViewState(0, 0);
        this._queue = new Events.QueuedEvent<string>();
        return new RootPresenter(this._state); 
    }
    
    renderStart(update: (state: RootPresenter) => void)
    {
        reducer(this._queue, updator => {
            const n = updator(this._state);
            this._state = n;
            const p = new RootPresenter(this._state);
            update(p);
        });
    }
    
    click()
    {
        this._queue.post("click");
        Events.flush();
    }
    
    changeLayout(l: any)
    {
        this._queue.post("changeLayout");
        Events.flush();
    }
}

export let Coordinator = new CoordinatorInner();
