//---------------------R-ALAB-308.4.1---------------------//

const { type } = require("os"); // idk where this comes from

let csvData1 =
  "Index,Mass (kg),Spring 1 (m),Spring 2 (m)\n1,0.00,0.050,0.050\n2,0.49,0.066,0.066\n3,0.98,0.087,0.080\n4,1.47,0.116,0.108\n5,1.96,0.142,0.138\n6,2.45,0.166,0.158\n7,2.94,0.193,0.174\n8,3.43,0.204,0.192\n9,3.92,0.226,0.205\n10,4.41,0.238,0.232";
let csvData2 =
  "ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26";
// PART 1
console.log("\n-------------------PART 1-------------------\n");

function csvDisplay(data) {
  if (data.length === 0) {
    return;
  }
  let result = "";
  let temp = "";
  let limit = data.length;
  let index = 0;
  while (index <= limit) {
    if (data[index] === "\n" || index === limit) {
      result += temp + "\n";
      temp = "";
    } else if (data[index] === ",") {
      temp += " | ";
    } else {
      temp += data[index];
    }
    index++;
  }
  return result.slice(0, -1);
}

//display1 = csvDisplay(csvData1); "Set 1\n", display1, "\nSet 2\n",
display2 = csvDisplay(csvData2);
console.log(display2);

// Part 2
console.log("\n-------------------PART 2-------------------\n");
function csvToArray(data) {
  let row = []; // outer array <- returning this
  let col = []; // inner array, must reset per row
  //console.log(data.split("\n"));

  //for (element of data.split("\n")) {
  //  console.log(element.split(","));
  //}
  let dataArray = data.split("\n");
  for (r in dataArray) {
    let temp = dataArray[r].split(",");
    for (c in temp) {
      col.push(temp[c]);
    }
    row.push(col);
    col = [];
  }
  //console.log(row);
  return row;
}

//console.log("\n" + csvToArray(csvData1));
//console.log("\n" + csvToArray(csvData2));
//"Set 1\n", dataArray1, "\nSet 2\n",
//dataArray1 = csvToArray(csvData1);
dataArray2 = csvToArray(csvData2);
console.log(dataArray2);

// PART 3
console.log("\n-------------------PART 3-------------------\n");
function csvToJson(dataArray) {
  header = dataArray[0];
  valuesArr = dataArray.slice(1, dataArray.length); // removing header array from dataArray
  jsonData = [];

  //console.log(header, valuesArr);

  for (arr in valuesArr) {
    // looping through the updated array
    // getting the index of individual
    // inner arrays
    //
    //
    let innerDict = {}; // temporary {} object, reset when innerloop ends
    let current = valuesArr[arr]; // temporary variable/accessing the current value-array
    //console.log(arr);
    for (i in current) {
      // iterating through the current value-array
      // uses i as index to find the correct
      // key from header and assign it to the
      // correct corresponding value
      innerDict[header[i].toLowerCase()] = current[i]; // toLowerCase() method used to match on paper output
      //console.log("inner", innerDict);
    }
    jsonData.push(innerDict);
    //console.log("outer", innerDict);
    //console.log(jsonData);
  }
  return jsonData;
}

//let json1 = csvToJson(dataArray1); "Set 1\n", json1, "\nSet 2\n", j
let json2 = csvToJson(dataArray2);
console.log(json2);
console.log("\n-------------------PART 4-------------------\n");

let insert1 = { id: "48", name: "Barry", occupation: "Runner", age: "25" };
let insert2 = { id: "7", name: "Bilbo", occupation: "None", age: "111" };

function removeObj(dataArray, index) {
  if (index === -1 || index === dataArray.length - 1) {
    // remove last obj
    dataArray.pop();
    return dataArray;
  }
  if (index === 0) {
    // remove first obj
    dataArray.shift();
    return dataArray;
  }
  dataArray.splice(index, 1);
  // remove specified obj using its index
  return dataArray;
}

function arrayIndexPush(dataArray, newObj, index) {
  let newArray = [];
  for (i in dataArray) {
    if (i == index) {
      newArray.push(newObj);
    }
    newArray.push(dataArray[i]);
  }
  return newArray;
}

function pushLast(dataArray, newObj) {
  dataArray.push(newObj);
  return dataArray;
}

console.log("Current Array: \n", json2);
json2 = removeObj(json2, -1);
console.log("1. Removing last object\n", json2);
json2 = arrayIndexPush(json2, insert1, 1);
console.log("2. Inserting new object into the array at index 1\n", json2);
json2 = pushLast(json2, insert2);
console.log("3. Adding new object at the end of the array\n", json2);
console.log("\n-------------------PART 5-------------------\n");

// ID,Name,Occupation,Age
//\n42,Bruce,Knight,41
//\n57,Bob,Fry Cook,19
//\n63,Blaine,Quiz Master,58
//\n98,Bill,Doctor’s Assistant,26

function jsonToCSV(jsonData) {
  let body = "\n";
  let dupCheck = []; // Adding unique keys | using this as header
  //console.log(jsonData);
  for (obj of jsonData) {
    let currentKeys = Object.keys(obj);
    for (key of currentKeys) {
      // THIS INNER FORLOOP FINDS ALL UNIQUE KEYS IN THE JSON
      if (!dupCheck.includes(key)) {
        dupCheck.push(key);
      } else {
        continue;
      }
    }
    body += Object.values(obj).join(",") + "\n";
    //console.log(body);
  }
  //console.log(header.slice(0, -1));

  return dupCheck.join(",") + body;
}

let newCSV = jsonToCSV(json2);
console.log(newCSV);
