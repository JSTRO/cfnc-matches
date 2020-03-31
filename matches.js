import parse from 'csv-parse'
import fs from 'fs'
import { uniq } from 'lodash'

const csvData = []
const readable = './compatibility-short.csv'
const readStream = fs.createReadStream(readable)

readStream.pipe(
	parse({
		delimiter: ',',
		columns: true
	})
)
.on('data', (data) => {
	csvData.push(data)
})
.on('end', () => {
	writeToCSVFile(csvData)
})	

const writeToCSVFile = rows => {
  const filename = './matches.csv';
  fs.writeFile(filename, findMatches(rows), err => {
    if (err) {
      console.log('Error writing to csv file', err);
    } else {
      console.log(`saved as ${filename}`);
    }
  });
}

const findMatches = rows => {
  const data = rows.map(row1 => {
  	const row1_email = row1['Email Address']
  	const row1_interest = row1['I am interested in dating someone aged']
  	const row1_religion_important = row1['It is important that my partner is the same religion as me']
  	const row1_religion = row1['What religion are you?']
  	const row1_children = row1['Do you want to have children?']
  	const row1_politics_important = row1['It is important that my partner has the same political beliefs as I do']
  	const row1_politics = row1['If so, my political beliefs are']
  	return ([
			row1_email, 
			rows.filter(row2 => {
				const row2_email = row2['Email Address']
				const row2_age = row2['I am aged']
				const row2_religion = row2['What religion are you?']
				const row2_children = row2['Do you want to have children?']
				const row2_politics = row2['If so, my political beliefs are']
				return (
					(row1_email !== row2_email) && //Cannot match with yourself
					(row1_interest === row2_age) && 
					(row1_religion_important === 'Yes' ? row1_religion === row2_religion : null) &&
					(row1_politics_important === 'Yes' ? row1_politics === row2_politics : null) &&
					(row1_children === row2_children) 
				)
			}).map(row => row['Email Address'])
		])
	})
  // Only include first entry if there are multiple
  // standardize case

  let matches = data.filter(match => match[1].length > 0).map(match => [match[0], _.uniq(match[1])])
  // Add headers
  matches.unshift(['email', ['matches']])
  return matches.join("\n");
} 