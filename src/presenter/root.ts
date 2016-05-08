import {IViewState} from "../viewstate"

export class RootPresenter
{
    constructor(private _state: IViewState)
    {
        console.log(_state);
    }
    
    get hello()
    {
        return "hehehe";
    }
    
    get hoge()
    {
        return `${this._state.m}, ${this._state.n}`;
    }
    
    get trend()
    {
        const r = () => Math.random() * 100 + 500;
        return [
            {year: 2007, gdp: r(), up: true},
            {year: 2008, gdp: r(), up: false},
            {year: 2009, gdp: r(), up: false},
            {year: 2010, gdp: r(), up: true},
            {year: 2011, gdp: r(), up: false},
            {year: 2012, gdp: r(), up: true},
            {year: 2013, gdp: r(), up: true}
        ];
    }
}
