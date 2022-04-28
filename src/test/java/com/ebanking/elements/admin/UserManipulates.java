package com.ebanking.elements.admin;


import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

// page_url = https://hanu-banking.herokuapp.com/admin_dashboard
public class UserManipulates {

    WebDriverWait wait;


    public UserManipulates(WebDriver driver){
        this.wait = new WebDriverWait(driver, 30);
    }

    @FindBy(xpath = "//button[@type='button']")
    private WebElement btn_show_user;
    private void clickShowUser(){
        wait.until(ExpectedConditions.visibilityOf(btn_show_user));
        btn_show_user.click();
    }

    @FindBy(xpath = "//button[contains(@class,'ant-btn ant-btn-round')]")
    private WebElement btn_add_user;
    private void clickAddUser(){
        wait.until(ExpectedConditions.visibilityOf(btn_add_user));
        btn_add_user.click();
    }

    @FindBy(xpath = "//label[text()='Phone number']/following::input")
    private WebElement txt_phone_number;
    private void inputPhoneNumber(String phone_number){
        txt_phone_number.sendKeys(phone_number);
    }

    @FindBy(xpath = "//label[text()='Initial balance']/following::input")
    private WebElement txt_initial_balance;
    private void inputInitialBalance(String initial_balance){
        txt_initial_balance.sendKeys(initial_balance);
    }

    @FindBy(xpath = "//input[@type='password']")
    private WebElement txt_password;
    private void inputPassword(String password){
        txt_password.sendKeys(password);
    }

    @FindBy(xpath = "(//input[@type='password'])[2]")
    private WebElement txt_confirm_password;
    private void inputConfirmPassword(String confirm_password){
        txt_confirm_password.sendKeys(confirm_password);
    }

    @FindBy(xpath = "//input[@id='code']")
    private WebElement txt_admin_code;
    private void inputAdminCode(String admin_code){
        txt_admin_code.sendKeys(admin_code);
    }

    @FindBy(xpath = "//input[@id='firstName']")
    private WebElement txt_first_name;
    private void inputFirstName(String first_name){
        txt_first_name.sendKeys(first_name);
    }

    @FindBy(xpath = "//input[@id='lastName']")
    private WebElement txt_last_name;
    private void inputLastName(String last_name){
        txt_last_name.sendKeys(last_name);
    }

    @FindBy(xpath = "//input[@id='citizenIdentification']")
    private WebElement txt_citizen_identification;
    private void inputCitizenIdentification(String citizen_identification){
        txt_citizen_identification.sendKeys(citizen_identification);
    }

    @FindBy(xpath = "//input[@id='email']")
    private WebElement txt_email;
    private void inputEmail(String email){
        txt_email.sendKeys(email);
    }

    @FindBy(xpath = "//input[@id='address']")
    private WebElement txt_address;
    private void inputAddress(String address){
        txt_address.sendKeys(address);
    }

    @FindBy(xpath = "//span[text()='Submit']")
    private WebElement btn_submit;
    private void clickSubmit(){
        btn_submit.click();
    }

    public void addUserTest(String phoneNumber, String initialBalance, String password, String confirmPassword,
                            String firstName, String lastName, String citizenIdentification, String email, String address){
        clickShowUser();
        clickAddUser();
        inputPhoneNumber(phoneNumber);
        inputInitialBalance(initialBalance);
        inputPassword(password);
        inputConfirmPassword(confirmPassword);
        inputFirstName(firstName);
        inputLastName(lastName);
        inputCitizenIdentification(citizenIdentification);
        inputEmail(email);
        inputAddress(address);
        clickSubmit();
    }

    public void addAdminTest(String phoneNumber, String initialBalance, String password, String confirmPassword,
                             String adminCode, String firstName, String lastName, String citizenIdentification, String email, String address){
        clickShowUser();
        clickAddUser();
        inputPhoneNumber(phoneNumber);
        inputInitialBalance(initialBalance);
        inputPassword(password);
        inputConfirmPassword(confirmPassword);
        inputAdminCode(adminCode);
        inputFirstName(firstName);
        inputLastName(lastName);
        inputCitizenIdentification(citizenIdentification);
        inputEmail(email);
        inputAddress(address);
        clickSubmit();
    }


    @FindBy(xpath = "(//a[@class='ant-dropdown-trigger ant-dropdown-link'])[2]")
    private WebElement btn_user_action;
    private void clickUserAction(){
        wait.until(ExpectedConditions.visibilityOf(btn_user_action));
        btn_user_action.click();
    }

    @FindBy(xpath = "//span[text()='Update information']")
    private WebElement btn_update_information;
    private void clickUpdateInformation(){
        btn_update_information.click();
    }


    @FindBy(xpath = "//label[text()='First name']/following::input")
    private WebElement txt_first_name_adjust;
    private void inputFirstNameAdjust(String first_name){
        txt_first_name_adjust.sendKeys(Keys.chord(Keys.CONTROL,"a", Keys.DELETE));
        txt_first_name_adjust.sendKeys(first_name);
    }

    @FindBy(xpath = "//label[text()='Last name']/following::input")
    private WebElement txt_last_name_adjust;
    private void inputLastNameAdjust(String last_name){
        txt_last_name_adjust.sendKeys(Keys.chord(Keys.CONTROL,"a", Keys.DELETE));
        txt_last_name_adjust.sendKeys(last_name);
    }

    @FindBy(xpath = "//label[text()='Email']/following::input")
    private WebElement txt_email_adjust;
    private void inputEmailAdjust(String email){
        txt_email_adjust.sendKeys(Keys.chord(Keys.CONTROL,"a", Keys.DELETE));
        txt_email_adjust.sendKeys(email);
    }

    @FindBy(xpath = "//label[text()='Address']/following::input")
    private WebElement txt_address_adjust;
    private void inputAddressAdjust(String address){
        txt_address_adjust.sendKeys(Keys.chord(Keys.CONTROL,"a", Keys.DELETE));
        txt_address_adjust.sendKeys(address);
    }

    @FindBy(xpath = "//span[text()='Update']")
    private WebElement btn_update_adjust;
    private void clickUpdateAdjust(){
        btn_update_adjust.click();
    }

    public void editUserTest(String firstNameEdit, String lastNameEdit, String emailEdit, String addressEdit) throws InterruptedException {
        clickShowUser();
        clickUserAction();
        clickUpdateInformation();
        inputFirstNameAdjust(firstNameEdit);
        inputLastNameAdjust(lastNameEdit);
        inputEmailAdjust(emailEdit);
        inputAddressAdjust(addressEdit);
        clickUpdateAdjust();
    }

    @FindBy(xpath = "//span[text()='Adjust balance']")
    private WebElement btn_adjust_balance;
    private void clickAdjustBalance(){
        btn_adjust_balance.click();
    }

    @FindBy(xpath = "//label[text()='Balance']/following::input")
    private WebElement txt_balance_adjust;
    private void inputBalanceAdjust(String balance){
        txt_balance_adjust.sendKeys(Keys.chord(Keys.CONTROL,"a", Keys.DELETE));
        txt_balance_adjust.sendKeys(balance);
    }

    @FindBy(xpath = "//span[text()='OK']")
    private WebElement btn_ok_adjust;
    private void clickOkAdjust(){
        btn_ok_adjust.click();
    }



    public void adjustBalanceTest(String balance){
        clickShowUser();
        clickUserAction();
        clickAdjustBalance();
        inputBalanceAdjust(balance);
        clickOkAdjust();
    }
}