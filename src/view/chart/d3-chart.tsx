import * as React from "react"
import * as ReactDOM from "react-dom"
import * as D3 from "d3"
import {Size} from "../../util"

interface ID3ChartComponentProps<T>
{
    className?: string;
    updateChart: (selection: D3.Selection<T>, size: Size) => void;
}

export class D3ChartComponent<T> extends React.Component<ID3ChartComponentProps<T>, {}>
{
    private renderD3()
    {
        const el = ReactDOM.findDOMNode(this);
        const w = el.clientWidth;
        const h = el.clientHeight;
        this.props.updateChart(D3.select(el), new Size(w, h));
    }
    
    componentDidMount()
    {
        this.renderD3();
    }
    
    shouldComponentUpdate()
    {
        this.renderD3();
        return false; // disable React renderer
    }
    
    render()
    {
        return <svg className={this.props.className}>
        // this component is rendered by D3.js
        </svg>;
    }
}
