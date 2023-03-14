import readExcel from 'read-excel-file/node';

export const excelRead = async (fileName) => {
    const data = await readExcel(fileName);

    let header;
    return data.map((row, i) => {
        if (i == 0) {
            header = row
            return;
        } else {
            return row.reduce((prev, value, i) => {
                prev[`${header[i]}`] = value;
                return prev;
            }, {})
        }
    }).filter(row => row)
}