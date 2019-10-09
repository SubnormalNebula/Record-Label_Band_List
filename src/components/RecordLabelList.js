import React from "react"
import BandList from "./BandList"


class RecordLabelList extends React.Component {  

    render(){   

        const createBandList = ( band, i ) => {
            return(
                <BandList
                    key={i}
                    band={band}
                />
            );
        }

        return(
            <div>
                <div>{this.props.label.recordLabel}</div>
                <div>{this.props.label.bands.map(createBandList)}</div>
            </div>
        )
    }
}

export default RecordLabelList;