import React from "react"
import Band from "./Band"


class RecordLabelList extends React.Component {  

    render(){   

        const createBand = ( band, i ) => {
            return(
                <Band
                    key={i}
                    band={band}
                />
            );
        }

        return(
            <div>
                <div>{this.props.label.recordLabel}</div>
                <div>{this.props.label.bands.map(createBand)}</div>
            </div>
        )
    }
}

export default RecordLabelList;