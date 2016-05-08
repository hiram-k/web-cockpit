import {Coordinator} from "../coordinator"
import * as React from "react"
import {ReactGridLayout, IGridLayoutInfo} from "react-grid-layout-wrapper"
import {LineChartComponent} from "./chart/line-chart"
import {StatusChartComponent, Status} from "./chart/status-chart"
import {RootPresenter} from "../presenter/root"
import * as styles from "./root-style.css"

export class RootComponent extends React.Component<{}, {props: RootPresenter}>
{
    constructor()
    {
        super();
        this.state = {props: Coordinator.initialize()};
    }
    
    componentDidMount()
    {
        Coordinator.renderStart((s: RootPresenter) => this.setState({props: s}));
    }
    
    render()
    {
        var layout = [
            {i: 'a', x: 0, y: 0, w: 4, h: 6},
            {i: 'b', x: 0, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
            {i: 'c', x: 0, y: 0, w: 1, h: 2}
        ];
        
        return <div className={styles.root}>
        <ReactGridLayout margin={[10, 10]} layout={layout} cols={10} rowHeight={30} width={1200} onLayoutChange={(l: IGridLayoutInfo[]) => Coordinator.changeLayout(l)}>
            <div key="a" className={styles.gridItem}>
                <LineChartComponent data={this.state.props.trend}/>
            </div>
            <div key="b" className={styles.gridItem}>
                <StatusChartComponent message="hello" status={Status.Normal}/>
            </div>
            <div key="c" className={styles.gridItem}>
            <a href="#" onClick={() => Coordinator.click()}>{this.state.props.hoge}</a>
            </div>
      </ReactGridLayout>
      </div>
    }
}
