
# CSV Data Filler

This Node.js and TypeScript program reads data from two CSV files. It uses the first CSV file as a reference to fill in missing information in the second CSV file based on matching IDs. The updated data is then saved to a new CSV file.


## Requirements

- Node.js (v14 or higher)

- npm (v6 or higher)
  

## Installation  

1. Clone the repository:

`git clone https://github.com/magnosansil/csv-data-filler.git
cd csv-data-filler `


2. Install the dependencies:

`npm install`


3. Create a .env file in the root directory with the following content:

`PATH_FILE_1='./path/to/your/first-file.csv'
PATH_FILE_2='./path/to/your/second-file.csv'`

Replace './path/to/your/first-file.csv' and './path/to/your/second-file.csv' with the actual paths to your CSV files.


## Usage  

To run the program and fill the data, use the following command:

`npm  run  start`

The  program  will  read  the  files  specified  in  the  .env  file,  process  the  data,  and  write  the  results  to  ./result.csv.