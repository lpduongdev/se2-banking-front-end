package com.ebanking.dataconfig;

public class DataReturn {
    public Object[][] getData(String filePath) {
        String[][] rowCol = null;
        try {
            DataConfig data = new DataConfig(filePath);
            int sheetIndex = 0;

            int noOfRow = data.getRowCount(sheetIndex);
            int noOfCell = data.getCellCount(sheetIndex, 0);
            rowCol = new String[noOfRow][noOfCell];

            for (int i = 1; i <= noOfRow; i++) {
                for (int j = 0; j < noOfCell; j++) {
                    rowCol[i - 1][j] = data.getCellData(sheetIndex, i, j);
                }
            }

        } catch (Exception e) {
            System.out.println(e);
        }
        return rowCol;
    }
}
