import React from 'react';
import axios from "axios"
import './App.css';

import RecordLabel from "./components/RecordLabel"


class App extends React.Component {

  // Set the initial state with and empty array for the festival list
  // and a boolean to make sure the data is only manipulated after it's 
  // been loaded from the API
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
          
          if (!band.recordLabel)
            band.recordLabel = "No Label";
          
          for(label in labelList){

            if (labelList[label].recordLabel === band.recordLabel) {
              exists = true;
              break;
            }
          }

          if (!exists) {

            labelList.push({
              recordLabel: band.recordLabel, 
              bands: [{ 
                name: band.name, festivals: [{ 
                  name: festival.name 
                }] 
              }] 
            })

          } else {

            labelList[label].bands.push({ 
              name: band.name, 
              festivals: [{ 
                name: festival.name 
              }] 
            });

            exists = false;
          }
        }
      }

      labelList = labelList.sort( ( a, b ) => {
        var x = a.recordLabel.toUpperCase();
        var y = b.recordLabel.toUpperCase();
        if (x < y) 
          return -1;
        if (x > y) 
          return 1;
        return 0;
      });

      for (label of labelList) {
        label.bands = label.bands.sort( ( a, b ) => {
          var x = a.name.toUpperCase();
          var y = b.name.toUpperCase();
          if (x < y) 
            return -1;
          if (x > y)
            return 1;
          return 0;
        });
      }

      console.log(labelList); // For debugging

      const createRecordLabel = ( label, i ) => {
        console.log(label.recordLabel); // For debugging 
        return(
          <RecordLabel
            key={i}
            label={label}
          />
        )
      }

      return (

        <div className="App">
          {labelList.map(createRecordLabel)}
        </div>

      );
    }
  }
}

export default App;
