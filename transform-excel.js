const XLSX = require('xlsx');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// 读取Excel文件并写入新文件
function readAndWriteExcelFile(inputFilePath, outputFilePath) {
    // 读取原始Excel文件
    const workbook = XLSX.readFile(inputFilePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, {defval: ""}); // 确保空值以空字符串表示

    // 处理每一行数据，添加新列
    data.forEach(row => {
        row.unique_id = uuidv4();
        if (row.CarrierSize) {
            const sizes = row.CarrierSize.replace(',', '.').split('x');
            if (sizes.length === 3) {
                row.CarrierSizeLength = parseFloat(sizes[0]);
                row.CarrierSizeWidth = parseFloat(sizes[1]);
                row.CarrierSizeHeight = parseFloat(sizes[2]);
            }
        }
    });

    // 将更新后的数据转换回工作表
    const newWorksheet = XLSX.utils.json_to_sheet(data);
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Updated Data");

    // 写入新的Excel文件
    XLSX.writeFile(newWorkbook, outputFilePath);
    console.log(`New Excel file has been written to ${outputFilePath}`);
}

// 调用函数，传入源文件和目标文件路径
readAndWriteExcelFile('../Palletizer-Transform.xlsx', '../Palletizer-With-Size.xlsx');
