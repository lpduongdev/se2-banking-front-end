package com.ebanking;


import com.ebanking.dataconfig.DataReturn;
import com.ebanking.elements.admin.UserManipulates;
import com.ebanking.elements.login.LoginElement;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.*;

public class EBankingFrontTest {
    private static WebDriver driver;
    private static WebDriverWait wait;
    JavascriptExecutor js;
    final private static String baseUrl = "https://hanu-banking.herokuapp.com/";
    //admin test account: 0123456789, testPass1
    //user test account: 0123456788, testPass1
    LoginElement loginElement;
    UserManipulates userManipulates;

    @BeforeClass
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @BeforeMethod
    public void openPage() {
        //clear cookies
        driver.manage().deleteAllCookies();
        driver.get(baseUrl);
        wait = new WebDriverWait(driver, 30);
        loginElement = PageFactory.initElements(driver, LoginElement.class);
        userManipulates = PageFactory.initElements(driver, UserManipulates.class);
    }

    @Test(dataProvider = "loginData")
    void testLogin(String phone, String password, String expected){
        loginElement.loginTest(phone, password);
        String actual = driver.getCurrentUrl().split(".*/")[1];
        Assert.assertEquals(actual, expected);
    }

    @Test(dataProvider = "adjustBalance")
    void testAdjustBalance(String balance, String expected) {
        //login as admin first
        loginElement.loginPrecondition("0123456789", "testPass1");
        userManipulates.adjustBalanceTest(balance);
        wait.until(ExpectedConditions.invisibilityOfElementLocated(By.xpath("//label[@for='basic_balance']")));
        String actual = driver.findElement(By.className("ant-modal-confirm-title")).getText();
        Assert.assertEquals(actual, expected);
    }

//   @Test
//   void testAddUser(String phoneNumber, String initialBalance, String password, String confirmPassword,
//                    String firstName, String lastName, String citizenIdentification, String email, String address, String expected){
//        //login as admin first
//       loginElement.loginPrecondition("0123456789", "testPass1");
//       userManipulates.addUserTest(phoneNumber, initialBalance, password, confirmPassword, firstName, lastName, citizenIdentification, email, address);
//   }

    @AfterMethod
    public void tearDown() {
        //clear local storage
        js = (JavascriptExecutor)driver;
        js.executeScript("sessionStorage.clear();");
        js.executeScript("localStorage.clear();");

    }

    @AfterClass
    public void closePage() {
        driver.quit();
    }

    @DataProvider(name = "loginData")
    public Object[][] getData() {
        DataReturn dataReturn = new DataReturn();
        return dataReturn.getData("src/test/resources/loginCredentials.xlsx");
    }

    @DataProvider(name = "adjustBalance")
    public Object[][] getAdjustBalance() {
        DataReturn dataReturn = new DataReturn();
        return dataReturn.getData("src/test/resources/adjustBalanceCredentials.xlsx");
    }

    @DataProvider(name = "addUser")
    public Object[][] getAddUser() {
        DataReturn dataReturn = new DataReturn();
        return dataReturn.getData("src/test/resources/addUserCredentials.xlsx");
    }

}
