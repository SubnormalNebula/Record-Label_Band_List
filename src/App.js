import React from 'react';
import axios from "axios"
import './App.css';

import RecordLabelList from "./components/RecordLabelList"


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      festivalBandArray: [],
      loaded: false
    }
  }

  componentDidMount() {
    axios.get("https://cors-anywhere.herokuapp.com/http://eacodingtest.digital.energyaustralia.com.au/api/v1/festivals")
    .then(response => {
        console.log(response);
        this.setState({
          festivalBandArray: response.data,
          loaded: true
        })
    }).catch(error => {
        console.log(error)
    }) 
  }

  render() {

    const { festivalBandArray, loaded } = this.state

    console.log(festivalBandArray);

    if (!loaded) {
      return("Loading...");
    } else {

      var labelList = [];
      var exists = false;
      var label;

      for (var festival of festivalBandArray) {
        for (var band of festival.bands) {
            for(label in labelList) {
              if (labelList[label].recordLabel == band.recordLabel) {
                exists = true;
                break;
              }
            }
          if (!exists) {
            labelList.push({recordLabel: band.recordLabel, bands: [{name: band.name, festival: festival.name}]})
          } else {
            labelList[label].bands.push({name: band.name, festival: festival.name});
            exists = false;
          }
        }
      }

      console.log(labelList); // For debugging

      const createRecordLabelList = ( label, i ) => {
        if (label.recordLabel){
          console.log(label.recordLabel); // For debugging 
          return(
            <RecordLabelList
              key={i}
              label={label}
            />
          )
        }
      }

      return (

        <div className="App">
          {labelList.map(createRecordLabelList)}
        </div>

      );
    }
  }
}

export default App;
