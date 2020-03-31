import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import papa from 'papaparse'
import { uniq, uniqBy } from 'lodash'

function App() {

  const [matches, setMatches] = useState([])

  const handleChange = e => {
    const { files } = e.target
    const readable = files[0]
    papa.parse(readable, {
      header: true,
      complete: data => {
        setMatches(findMatches(data.data))
      }
    });
  }
  
  const handleClick = () => {
    if (matches.length < 1) {
      alert("Please choose a file.")
    } else {
      let csvContent = "data:text/csv;charset=utf-8," + matches.map(e => e.join(",")).join("\n")
      const encodedUri = encodeURI(csvContent)
      window.open(encodedUri)
    }
  }

  const findMatches = rows => {
    const data = rows.map(row1 => {
      const row1_email = row1['Email Address'].trim().toLowerCase()
      const row1_gender = row1['I am a']
      const row1_age = row1['I am aged']
      const row1_pref = row1['I am interested in dating a']
      const row1_interest = row1['I am interested in dating someone aged ']
      const row1_religion_important = row1['It is important that my partner is the same religion as me']
      const row1_religion = row1['What religion are you?'].trim().toLowerCase()
      const row1_children = row1['Do you want to have children?']
      const row1_politics_important = row1['It is important that my partner has the same political beliefs as I do']
      const row1_politics = row1['If so, my political beliefs are'].trim().toLowerCase()
      return ([
        row1_email,
        rows.filter(row2 => { // TODO: trim and standardize case
          const row2_email = row2['Email Address'].trim().toLowerCase()
          const row2_gender = row2['I am a']
          const row2_age = row2['I am aged']
          const row2_pref = row2['I am interested in dating a']
          const row2_interest = row2['I am interested in dating someone aged ']
          const row2_religion_important = row2['It is important that my partner is the same religion as me']
          const row2_religion = row2['What religion are you?'].trim().toLowerCase()
          const row2_children = row2['Do you want to have children?']
          const row2_politics_important = row2['It is important that my partner has the same political beliefs as I do']
          const row2_politics = row2['If so, my political beliefs are'].trim().toLowerCase()
          return (
            (row1_email !== row2_email) && // Cannot match with yourself
            (row1_pref === row2_gender) && (row1_gender === row2_pref) &&
            (row1_interest === row2_age) && (row1_age === row2_interest) &&
            ((row1_religion_important === 'Yes' || row2_religion_important === 'Yes') ? row1_religion === row2_religion : null) &&
            ((row1_politics_important === 'Yes' || row2_politics_important === 'Yes') ? row1_politics === row2_politics : null) &&
            (row1_children === row2_children) 
          )
        }).map(row => row['Email Address'])
      ])
    })

    let matches = data.filter(match => match[1].length > 0) // Remove rows with no matches
                      .map(match => [match[0], uniq(match[1])]) 
    matches = uniqBy(matches, item => JSON.stringify(item)) // Only include unique entries
    // Add headers
    matches.unshift(['email', 'matches'])
    return matches
  } 
  return (
    <div className="App">
      <div className="container-fluid">
        <h1>#CFNC Matches</h1>
        <div className="input">
          <input type="file" name="file" accept=".csv" onChange={e => handleChange(e)}/>
          <Button variant="success" onClick={handleClick}>
            Download Matches
          </Button> 
        </div>
      </div>  
    </div>
  )
}

export default App;
