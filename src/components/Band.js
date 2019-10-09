import React from "react"
import Festival from "./Festival"

class Band extends React.Component {

    render(){

        const createFestival = (festival, i) => {
            return(
                <Festival
                    key={i}
                    festival={festival}
                />
            );
        }

        return(
            <div className="Band">
                <div>{this.props.band.name}</div>
                <div>{this.props.band.festivals.map(createFestival)}</div>
            </div>
        );
    }
}

export default Band;