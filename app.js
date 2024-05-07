const XLSX = require('xlsx');
const fs=require('fs')

function readExcelFile(filePath) {
    // Load the workbook
    const workbook = XLSX.readFile(filePath);

    // Get the first sheet name
    const firstSheetName = workbook.SheetNames[0];

    // Get the worksheet
    const worksheet = workbook.Sheets[firstSheetName];

    // Convert the worksheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    return jsonData;
}

// Example: Replace 'path/to/your/file.xlsx' with the path to your Excel file
const excelData = readExcelFile('../Palletizer-With-Size.xlsx');
fs.writeFileSync('../Palletizer.json',JSON.stringify(excelData))

// Output the JSON data
console.log(excelData);
