import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import papa from 'papaparse'
import { uniqBy } from 'lodash'
import exportToCsv from './exportToCsv.js'

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

  // Convert form column headers into variables
  const email = 'Email Address'
  const gender = 'I am a'
  const age = 'I am aged'
  const gender_pref = 'I am interested in dating a'
  const age_pref = 'I am interested in dating someone aged '
  const religion_important = 'It is important that my partner is the same religion as me'
  const religion = 'What religion are you?'
  const want_children = 'Do you want to have children?'
  const mind_children = 'Do you mind if your match has children?'
  const have_children = 'Do you have children?'
  const politics_important = 'It is important that my partner has the same political beliefs as I do'
  const politics = 'If so, my political beliefs are'
  const city = 'City'

  const ageChoices = ['Early 20s', 'Late 20s', 'Early 30s', 'Late 30s', 'Early 40s', 'Late 40s', '50s+', '60+']

  // TODO: Refactor this function
  const findMatches = rows => {
    const matches = rows.map(row1 => {
      return ([
        row1[email],
        rows.filter(row2 => {
          return (
            // Cannot match with self
            (row1[email] !== row2[email]) &&
            // Match to gender preference
            (row1[gender_pref] === row2[gender] && row1[gender] === row2[gender_pref]) &&
            // Females match with their age range + one above
            (
              row1[gender] === "Female" ? 
              (
                row1[age_pref] === ageChoices[ageChoices.indexOf(row2[age])] ||
                row1[age_pref] === ageChoices[ageChoices.indexOf(row2[age]) + 1] 
              ) : null ||
              row2[gender] === "Female" ?
              (
                row2[age_pref] === ageChoices[ageChoices.indexOf(row1[age])] ||
                row2[age_pref] === ageChoices[ageChoices.indexOf(row1[age]) + 1]
              ) : null
            ) &&
            // Male match with their age range + one below
            (
              row1[gender] === "Male" ?
              (
                row1[age_pref] === ageChoices[ageChoices.indexOf(row2[age])] ||
                row1[age_pref] === ageChoices[ageChoices.indexOf(row2[age]) - 1]
              ) : null ||
              row2[gender] === "Male" ?
              (
                row2[age_pref] === ageChoices[ageChoices.indexOf(row1[age])] ||
                row2[age_pref] === ageChoices[ageChoices.indexOf(row1[age]) - 1]
              ) : null
            ) &&
            (row1[city] === row2[city]) &&
            // If either person minds children, their match should not have children
            (
              row1[mind_children] === "Yes" ? row2[have_children] === "No" :
              row2[mind_children] === "Yes" ? row1[have_children] === 'No' : null
            ) &&
            (
              (row1[religion_important] === 'Yes' || row2[religion_important] === 'Yes') ? 
              row1[religion] === row2[religion] : null
            ) &&
            // Moderates can match with whoever
            (
              (
                (row1[politics_important] === 'Yes' && row1[politics] !== 'Moderate') || 
                (row2[politics_important] === 'Yes' && row2[politics] !== 'Moderate')
              ) ?
              row1[politics] === row2[politics] : 
              (row1[politics] === row2[politics] || row1[politics] !== row2[politics])
            ) &&
            // Children: unsure can match with whoever
            (
              row1[want_children] !== "Unsure" ?
              row1[want_children] === row2[want_children] : 
              (row1[want_children] === row2[want_children] || row1[want_children] !== row2[want_children])
            ) 
          )
        }).map(row => row[email])
      ])
    }).filter(match => match[1].length > 0) // Remove rows with no matches

    console.log("matches", matches)
    
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
