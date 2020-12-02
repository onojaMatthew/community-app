const d_string = ["6th Jun 1933", "26th May 1960"];
let convertedDate;

function dateConverter(dateString) {
  let dateArr = [];
  for (let i = 0; i < dateString.length; i++) {
    const r_date = dateString[i].replace(/(\d+)(rd|st|nd|th)/, "$1");
    convertedDate = new Date(r_date).toISOString().split("T")[0];
    
    dateArr.push(convertedDate);
  }
  console.log(dateArr)
  return dateArr
}

dateConverter(d_string);