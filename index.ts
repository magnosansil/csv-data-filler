import fs from 'fs';
import csv from 'csv-parser';
import dotenv from 'dotenv';

dotenv.config();

const readCSV = (filePath: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

const fillData = async (csv1Path: string, csv2Path: string, outputCsvPath: string) => {
  try {
    const csv1Data = await readCSV(csv1Path);
    const csv2Data = await readCSV(csv2Path);

    const updatedCsv2Data = csv2Data.map((row) => {
      if (row.N) {
        const foundRow = csv1Data.find((data) => data.N === row.N);
        if (foundRow) {
          return { ...row, ...foundRow };
        }
      }
      return row;
    });

    const writeStream = fs.createWriteStream(outputCsvPath);
    writeStream.write(Object.keys(updatedCsv2Data[0]).join(',') + '\n');
    updatedCsv2Data.forEach((row) => {
      writeStream.write(Object.values(row).join(',') + '\n');
    });
    writeStream.end();

    console.log('CSV file filled successfully!');
  } catch (error) {
    console.error('Error filling the CSV:', error);
  }
};

const csv1Path = process.env.PATH_FILE_1;
const csv2Path = process.env.PATH_FILE_2;
const outputCsvPath = './result.csv';

if (!csv1Path || !csv2Path) {
  throw new Error('CSV file paths are not defined in the environment variables.');
}

fillData(csv1Path, csv2Path, outputCsvPath);
