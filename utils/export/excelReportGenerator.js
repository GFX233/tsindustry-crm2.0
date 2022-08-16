import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function ExportCSVButton({data}) {
  return (
    <ExcelFile element={<button className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">XLSX</button>} filename="report">
    <ExcelSheet data={data} name="Zakázky">
        <ExcelColumn label="Datum" value="date"/>
        <ExcelColumn label="Zákazník" value="customer"/>
        <ExcelColumn label="Zakázka" value="orderNum"/>
        <ExcelColumn label="Název dílu" value="partName"/>
        <ExcelColumn label="Počet dílu" value="partCount"/>
        <ExcelColumn label="Cena" value="price"/>
    </ExcelSheet>
</ExcelFile>
  );
}

export default ExportCSVButton