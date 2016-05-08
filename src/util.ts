
export function timestamp()
{
    return (new Date()).getTime();
}

export class Size
{
    constructor(private _w: number, private _h: number)
    {
    }
    
    get width() { return  this._w }
    get height() { return this._h }
}
