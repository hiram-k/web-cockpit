import * as React from "react"
import * as ReactDOM from "react-dom"
import * as D3 from "d3"
import {D3ChartComponent} from "./d3-chart"
import {Size} from "../../util"
import * as styles from "./d3-chart-style.css"

interface ILineChartComponent
{
    data: IChartData[];
}

interface IChartData
{
    year: number;
    gdp: number;
    up: boolean;
}

class LineChartComponentCore extends D3ChartComponent<IChartData>
{
}

export class LineChartComponent extends React.Component<ILineChartComponent, {}>
{
    private updateChart(selection: D3.Selection<IChartData>, size: Size)
    {
        const xScale = D3.scale.linear()
            .domain([2007, 2013])
            .range([5, size.width - 5]);
            
        const yScale = D3.scale.linear()
            .domain([D3.min(this.props.data, d => d.gdp), D3.max(this.props.data, d => d.gdp)])
            .range([size.height-5, 5]);
        
        const line = D3.svg.line<IChartData>()
            .x(d => xScale(d.year))
            .y(d => yScale(d.gdp));
        
        const s = selection
            .selectAll("circle")
            .data(this.props.data);
            
        s
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.year))
            .attr("cy", d => yScale(d.gdp))
            .attr({
                r: 10,
                fill: "black",
            });
            
        s
            .exit()
            .remove();
        
        selection
            .append("path")
            .datum(this.props.data)
            .attr({
                'd': line,
                'stroke': "black",
                "stroke-width": 0,
                "fill": "none",
            });
            
        selection
            .selectAll("circle")
            .transition()
            .ease("bounce")
            .delay(100)
            .duration(500)
            .attr("r", 2);
            
        selection
            .selectAll("path")
            .transition()
            .delay(100)
            .duration(500)
            .attr("stroke-width", 1);
    }
    
    render()
    {
        return <div className={styles.chartContainer}>
            <div className={styles.chartHeader}>ほげほげのようす</div>
            <LineChartComponentCore className={styles.chartWrapper} updateChart={(sel, size) => this.updateChart(sel, size)} />
        </div>
    }
}
