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

    // Get the data from the API
    axios.get("https://cors-anywhere.herokuapp.com/http://eacodingtest.digital.energyaustralia.com.au/api/v1/festivals")
    .then(response => {
        this.setState({
          festivalBandArray: response.data, // Add the returned data to the app's state
          loaded: true // Let the page know the data has loaded 
        })
    }).catch(error => {
        console.log(error)
    })
  }

  render() {

    const { festivalBandArray, loaded } = this.state

    if (!loaded) { // Check if the data has loaded from the API
      return("Loading...");
    } else { // When data has loaded we can work with it

      var labelList = [];
      var exists = false;
      var label;

      // Re-format the data into the required format
      for (var festival of festivalBandArray) {
        for (var band of festival.bands) {
          
          if (!band.recordLabel) // If a band doesn't have a lable listed set to "No Label"
            band.recordLabel = "No Label";
          
          // Check that the current label isn't a duplicate 
          for(label in labelList){
            if (labelList[label].recordLabel === band.recordLabel) {
              exists = true;
              break;
            }
          }

          // If the current lable is unique add it to the list of lables, 
          // along with band and festival information
          if (!exists) {
            labelList.push({
              recordLabel: band.recordLabel, 
              bands: [{ 
                name: band.name, festivals: [ 
                  festival.name 
                ] 
              }] 
            })
          } else { // If it already exists, add another band to it
            labelList[label].bands.push({ 
              name: band.name, 
              festivals: [
                festival.name 
              ] 
            });

            exists = false; // Set to false to check next label
          }
        }
      }

      // Sort record labels alphabetically
      labelList = labelList.sort( ( a, b ) => {
        var x = a.recordLabel.toUpperCase();
        var y = b.recordLabel.toUpperCase();
        if (x < y) 
          return -1;
        if (x > y) 
          return 1;
        return 0;
      });

      
      labelList.forEach((label) => {

        // Sort bands alphabetically
        label.bands = label.bands.sort( ( a, b ) => {
          var x = a.name.toUpperCase();
          var y = b.name.toUpperCase();
          if (x < y) 
            return -1;
          if (x > y)
            return 1;
          return 0;
        });

        // Compare each band at a label then combine any duplicates
        label.bands.forEach( (band) => {
          label.bands.forEach( (band2, b2) => {
        
            if (band.name === band2.name && band !== band2){
              for (var festival of band2.festivals) {
                band.festivals.push(festival); // add festivals to one band entry
              }
              band.festivals.sort(); // sort the festivals alphabetically
              label.bands.splice(b2,1); // remove duplicate band
            } 
          });
        });
      });

      // Create a record lable entry one the page
      const createRecordLabel = ( label, i ) => { 
        return(
          <RecordLabel
            key={i}
            label={label}
          />
        )
      }

      // Render the list of record lables and all their children
      return (
        <div className="App">
          {labelList.map(createRecordLabel)}
        </div>
      );
    }
  }
}

export default App;