package com.ebanking;


import com.ebanking.dataconfig.DataReturn;
import com.ebanking.elements.admin.UserManipulates;
import com.ebanking.elements.features.TransferMoney;
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
    final private static String baseUrl = "http://localhost:3000/";
    //admin test account: 0123456789, testPass1
    //user test account: 0123456788, testPass1
    LoginElement loginElement;
    UserManipulates userManipulates;
    TransferMoney transferMoney;

    @BeforeClass
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @Test(dataProvider = "add")
    void openGoogle(String phoneNumber, String initialBalance, String password, String confirmPassword,
                     String firstName, String lastName, String citizenIdentification, String email, String address){
        loginElement.loginPrecondition("0936255957", "P@ssw0rd");
        userManipulates.addUserTest(phoneNumber, initialBalance, password, confirmPassword, firstName, lastName, citizenIdentification, email, address);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//span[@role='img']/following-sibling::span)[2]")));
        Assert.assertTrue(true);
    }


    @BeforeMethod
    public void openPage() {
        //clear cookies
        driver.manage().deleteAllCookies();
        driver.get(baseUrl);
        wait = new WebDriverWait(driver, 30);
        loginElement = PageFactory.initElements(driver, LoginElement.class);
        userManipulates = PageFactory.initElements(driver, UserManipulates.class);
        transferMoney = PageFactory.initElements(driver, TransferMoney.class);
    }

    @Test(dataProvider = "transfer")
    void transferTest(String phoneNumber, String pass, String recieverPhone, String transferAmount, String depositAmount,
                      String withdrawAmount, String savingAmount, String loanAmount) throws InterruptedException {
        loginElement.loginPrecondition(phoneNumber, pass);
        transferMoney.transferMoney(recieverPhone, transferAmount, depositAmount, withdrawAmount, savingAmount, loanAmount);
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

//    @Test(dataProvider = "addUser")
//    void testAddUser(String phoneNumber, String initialBalance, String password, String confirmPassword,
//                     String firstName, String lastName, String citizenIdentification, String email, String address) throws InterruptedException {
//
//        //login as admin first
//        loginElement.loginPrecondition("0936255957", "0123456789#Pd");
//        // trong db k co gi dau
//        userManipulates.addUserTest(phoneNumber, initialBalance, password, confirmPassword, firstName, lastName, citizenIdentification, email, address);
//        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("(//span[@role='img']/following-sibling::span)[2]")));
////        String actual = driver.findElement(By.xpath("(//span[@role='img']/following-sibling::span)[2]")).getText();
////        Assert.assertEquals(actual, expected);
//        Assert.assertTrue(true);
//       }

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

    @DataProvider(name = "add")
    public Object[][] getAddUser() {
        DataReturn dataReturn = new DataReturn();
        return dataReturn.getData("src/test/resources/Book.xlsx");
    }

    @DataProvider(name = "transfer")
    public Object[][] getTransfer() {
        DataReturn dataReturn = new DataReturn();
        return dataReturn.getData("src/test/resources/money.xlsx");
    }

}
