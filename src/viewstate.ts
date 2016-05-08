import * as Immutable from "immutable"

export interface IViewState
{
    m: number;
    n: number;
}

export class ViewState
{
    private _m: number;
    private _n: number;
    
    constructor(m: number, n: number)
    {
        this._m = m;
        this._n = n;
    }
    
    get m() { return this._m }
    get n() { return this._n }
    
    incrM()
    {
        return new ViewState(this._m+1, this._n);
    }
    
    incrN()
    {
        return new ViewState(this._m, this._n+1);
    }
}
