import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import papa from 'papaparse'
import converter from 'convert-array-to-csv'
import { uniq, uniqBy } from 'lodash'
import exportToCsv from './exportToCsv.js'

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
      exportToCsv('download.csv', matches)
    }
  }

  // Convert form column headers into variables
  const email = 'Email Address'
  const gender = 'I am a'
  const age = 'I am aged'
  const gender_pref = 'I am interested in dating a'
  const age_pref = 'I am interested in dating someone aged '
  const religion_important = 'It is important that my partner is the same religion as me'
  const religion = 'What religion are you?'
  const children = 'Do you want to have children?'
  const politics_important = 'It is important that my partner has the same political beliefs as I do'
  const politics = 'If so, my political beliefs are'

  const findMatches = rows => {
    const matches = rows.map(row1 => {
      return ([
        row1[email],
        rows.filter(row2 => {
          return (
            (row1[email] !== row2[email]) && // Cannot match with yourself
            (row1[gender_pref] === row2[gender]) && 
            (row1[gender] === row2[gender_pref]) &&
            (row1[age_pref] === row2[age]) && 
            (row1[age] === row2[age_pref]) &&
            ((row1[religion_important] === 'Yes' || row2[religion_important] === 'Yes') ? row1[religion] === row2[religion] : null) &&
            ((row1[politics_important] === 'Yes' || row2[politics_important] === 'Yes') ? row1[politics] === row2[politics] : null) &&
            (row1[children] === row2[children]) 
          )
        }).map(row => row[email])
      ])
    }).filter(match => match[1].length > 0) // Remove rows with no matches
    
    // Format as all possible matches                 
    let output = []
    for (let i=0; i<matches.length; i++) {
      const a = matches[i][0]
      const b = matches[i][1]
      if (b.length > 1) {
        for (let j=0; j<b.length; j++) {
          output.push([a, b[j]])
        }
      } else {
        output.push([a, b[0]])
      }
    }

    // Only include unique entries
    output = uniqBy(output, item => JSON.stringify(item))
    
    // Only include one side of matches
    for (let i=0; i<output.length; i++) {
      for (let j=0; j<output.length; j++) {
        if (output[i][0] === output[j][1] && output[i][1] === output[j][0]) {
          output.splice(output.indexOf(output[j]), 1)
        }
      }
    }

    // Add headers
    output.unshift(['1', '2'])

    return output
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
