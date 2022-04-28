package com.ebanking.dataconfig;

import java.io.FileInputStream;
import java.io.IOException;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class DataConfig {
    private FileInputStream file;
    private XSSFWorkbook workbook;
    private XSSFSheet sheet;
    private XSSFRow row;
    private XSSFCell cell;

    private String path = null;

    public DataConfig(String path) {
        this.path = path;
    }

    public int getRowCount(int sheetIndex) throws IOException {
        file = new FileInputStream(path);
        workbook = new XSSFWorkbook(file);
        sheet = workbook.getSheetAt(sheetIndex);

        // get data
        int rowCount = sheet.getLastRowNum();
        workbook.close();
        file.close();
        return rowCount;

    }

    public int getCellCount(int sheetIndex, int rowIndex) throws IOException {
        file = new FileInputStream(path);
        workbook = new XSSFWorkbook(file);
        sheet = workbook.getSheetAt(sheetIndex);
        row = sheet.getRow(rowIndex);

        // get data
        int cellCount = row.getLastCellNum();
        workbook.close();
        file.close();
        return cellCount;
    }

    public String getCellData(int sheetIndex, int rowIndex, int colIndex) throws IOException {
        file = new FileInputStream(path);
        workbook = new XSSFWorkbook(file);
        sheet = workbook.getSheetAt(sheetIndex);
        row = sheet.getRow(rowIndex);
        cell = row.getCell(colIndex);

        DataFormatter formatter = new DataFormatter();
        String cellData;
        try {
            cellData = formatter.formatCellValue(cell);

        } catch (Exception e) {
            cellData = "";
        }

        workbook.close();
        file.close();
        return cellData;

    }
}
