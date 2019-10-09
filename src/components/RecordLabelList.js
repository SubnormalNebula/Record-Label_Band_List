import React from "react"


class RecordLabelList extends React.Component {  
    
    render(){      
        
        return(<div>{this.props.label.recordLabel}</div>)
    }
}

export default RecordLabelList;