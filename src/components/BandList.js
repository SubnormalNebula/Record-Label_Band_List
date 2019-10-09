import React from "react"

class BandList extends React.Component {

    render(){
        return(
            <div className="BandList">
                <div>{this.props.band.name}</div>
            </div>
        );
    }
}

export default BandList;