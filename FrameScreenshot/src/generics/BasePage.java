package generics;

import org.openqa.selenium.Alert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.Select;

public class BasePage
{
	
		public void selectbyvisbiletext(WebElement element, String text)
		{
			Select sel=new Select(element);
			sel.selectByVisibleText(text);
		}
		
		public void selectbyvalue(WebElement element, String value)
		{
			Select sel=new Select(element);
			sel.selectByValue(value);
		}
		
		public void selectbyindex(WebElement element, int index)
		{
			Select sel=new Select(element);
			sel.selectByIndex(index);
		}
		
		public void movetoelement(WebDriver driver, WebElement element)
		{
			Actions act=new Actions(driver);
			act.moveToElement(element).perform();
		}

		public void alertok(WebDriver driver)
		{
			Alert alt=driver.switchTo().alert();
			alt.accept();
		}

}
