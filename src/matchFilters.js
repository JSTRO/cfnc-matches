// Convert form column headers into variables
const email = 'Email Address'
const gender = 'I am a'
const age = 'I am aged'
const genderPref = 'I am interested in dating a'
const agePref = 'I am interested in dating someone aged '
const relImportant = 'It is important that my partner is the same religion as me'
const religion = 'What religion are you?'
const wantChildren = 'Do you want to have children?'
const mindChildren = 'Do you mind if your match has children?'
const haveChildren = 'Do you have children?'
const polImportant = 'It is important that my partner has the same political beliefs as I do'
const politics = 'If so, my political beliefs are'
const city = 'City'
const cityPref = 'Are you open to dating someone from another city? If so, what cities?'

export const emailFilter = (row1, row2) => {
  return row1[email] !== row2[email]
}

export const matchGender = (row1, row2) => {
  return (row1[genderPref] === row2[gender] && row1[gender] === row2[genderPref])
}

export const matchAge = (row1, row2) => {
  const row1AgePref = row1[agePref] ? row1[agePref].split(", ") : []
  const row2AgePref = row1[agePref] ? row2[agePref].split(", ") : []

  return row1AgePref.includes(row2[age]) && row2AgePref.includes(row1[age])
}

export const matchCity = (row1, row2) => {
  const row1CityPref = row1[cityPref] ? [...row1[cityPref].split(", "), row1[city]] : []
  const row2CityPref = row2[cityPref] ? [...row2[cityPref].split(", "), row2[city]] : []

  return row1CityPref.includes(row2[city]) && row2CityPref.includes(row1[city])
}

export const matchMindChildren = (row1, row2) => {
  if (
      (row1[mindChildren] === "Yes" && row2[haveChildren] === "Yes") ||
      (row2[mindChildren] === "Yes" && row1[haveChildren] === 'Yes')
     ) {
    return false
  } else {
    return true
  }
}

export const matchWantChildren = (row1, row2) => {
  if (row1[wantChildren] !== "Unsure" && row2[wantChildren] !== "Unsure") {
    return row1[wantChildren] === row2[wantChildren]
  } else {
    return true
  }
}

export const matchReligion = (row1, row2) => {
  if (row1[relImportant] === 'Yes' || row2[relImportant] === 'Yes') {
    return row1[religion] === row2[religion]
  } else {
    return true
  }
}

export const matchPolitics = (row1, row2) => {
  if (
      (row1[polImportant] === 'Yes' && row1[politics] !== 'Moderate') || 
      (row2[polImportant] === 'Yes' && row2[politics] !== 'Moderate')
     ) {
    return row1[politics] === row2[politics]
  } else {
    return true
  }
}