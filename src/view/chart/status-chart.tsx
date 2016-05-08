import * as React from "react"
import * as ReactDOM from "react-dom"
import * as D3 from "d3"
import {D3ChartComponent} from "./d3-chart"
import {Size} from "../../util"
import * as styles from "./d3-chart-style.css"

export enum Status
{
    Excellent,
    Normal,
    Abnormal,
    Warning,
}

interface IStatusChartComponent
{
    message: string;
    status: Status;
}

class StatusChartComponentCore extends D3ChartComponent<Status>
{
}

export class StatusChartComponent extends React.Component<IStatusChartComponent, {}>
{
    private statusIcon(status: Status)
    {
        switch (status) {
            case Status.Abnormal:
                return ;
            default:
                break;
        }
    }
    private updateChart(selection: D3.Selection<Status>, size: Size)
    {
        selection
            .datum(this.props.status)
            .append("path");
    }
    
    render()
    {
        return <div className={styles.chartContainer}>
            <div className={styles.chartHeader}>ほげほげの稼働状況</div>
            <StatusChartComponentCore className={styles.chartWrapper} updateChart={(sel, size) => this.updateChart(sel, size)} />
        </div>
    }
}
