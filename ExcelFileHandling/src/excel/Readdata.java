package excel;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.testng.annotations.Test;

public class Readdata {
@Test
public void readdata() throws IOException
{
FileInputStream fis=new FileInputStream("./excelfiles/rakesh.xlsx");
XSSFWorkbook wb=new XSSFWorkbook(fis);
System.out.println(wb.getSheet("Sheet1").getRow(7).getCell(4).toString());
}
}
