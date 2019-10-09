import React from "react"

class Festival extends React.Component {

    render(){
        return(
            <div className="Festival">
                {this.props.festival}
            </div>
        );
    }
}

export default Festival;