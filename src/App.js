import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import papa from 'papaparse'
import { uniqBy } from 'lodash'
import exportToCsv from './exportToCsv.js'
import { allPermutations, oneSided } from './utils.js'
import { matchGender, 
         matchAge, 
         matchCity, 
         matchMindChildren, 
         matchWantChildren, 
         matchReligion, 
         matchPolitics 
       } from './matchFilters.js'

function App() {

  const [matches, setMatches] = useState([])
  const [fileUploaded, setFileUploaded] = useState(false)

  const handleChange = e => {
    const { files } = e.target
    const readable = files[0]
    setFileUploaded(true)
    papa.parse(readable, {
      header: true,
      complete: data => {
        setMatches(findMatches(data.data))
      }
    });
  }

  const formatCsvName = () => {
    const d = new Date()
    const isoDate = d.toISOString().slice(0, 10)
    const dateTime = `${isoDate}_${d.getHours()}_${d.getMinutes()}_${d.getSeconds()}`
    return `matches_${dateTime}.csv`
  }
  
  const handleClick = () => {
    const fileName = formatCsvName()
    if (!fileUploaded) {
      alert("Please choose a file.")
    } else {
      exportToCsv(fileName, matches)
    }
  }

  const findMatches = rows => {
    const email = 'Email Address'
    const matches = rows.map(row1 => {
      return ([
        row1[email],
        rows.filter(row2 => {
          return (
            matchGender(row1, row2) &&
            matchCity(row1, row2) &&
            matchAge(row1, row2) &&
            matchMindChildren(row1, row2) &&
            matchPolitics(row1, row2) &&
            matchReligion(row1, row2) &&
            matchWantChildren(row1, row2) 
          )
        }).map(row => row[email])
      ])
    }).filter(match => match[1].length > 0) // Remove rows with no matches

    // console.log("matches", matches)  

    const output = oneSided(allPermutations(matches))

    console.log("output", uniqBy(output, item => JSON.stringify(item)))

    // Only include unique entries
    return uniqBy(output, item => JSON.stringify(item))
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
        <h4>Matching Criteria:</h4>
        <div className="criteria"> 
          <ol>
            <li>
              <strong>Gender Preference</strong>: Gender of match should equal gender preference.
            </li>  
            <li>
              <strong>Age preference</strong>: Age of match should be included in age preferences and vice versa. 
            </li>
            <li>
              <strong>City</strong>: City of match should be included in city preferences and vice versa. 
            </li>  
            <li>
              <strong>Minds children</strong>: If either person minds chidren, their match should not have children.
            </li>
            <li>
              <strong>Wants children</strong>: If answer is "Yes" or "No", match on this criteria. If "Unsure", ignore this criteria.
            </li>
            <li>
              <strong>Religion</strong>: If religion is important to either person, match on religion.
            </li>
            <li>
              <strong>Politics</strong>: If politics is important to either person AND that person is NOT a Moderate, match on politics. Else ignore this criteria.
            </li>
          </ol>
        </div>
      </div>  
    </div>
  )
}

export default App
