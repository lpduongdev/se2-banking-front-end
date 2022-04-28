package com.ebanking.elements.login;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginElement {

    WebDriverWait wait;


    public LoginElement(WebDriver driver){
        this.wait = new WebDriverWait(driver, 30);
    }

    @FindBy(xpath = "(//a[@class='navbar__tab'])[2]")
    private WebElement homeLoginBtn;
    private void homeLoginBtn(){
        homeLoginBtn.click();
    }

    @FindBy(xpath = "//h3[text()='Phone number:']/following::input")
    private WebElement phoneNumber;
    private void setPhoneNumber(String email){
        phoneNumber.sendKeys(email);
    }

    @FindBy(xpath = "//input[@action='click']")
    private WebElement password;
    private void setPassword(String password){
        this.password.sendKeys(password);
    }

    @FindBy(xpath = "//button[contains(@class,'ant-btn ant-btn-primary')]")
    private WebElement loginButton;
    private void clickLoginButton(){
        loginButton.click();
    }

    @FindBy(xpath = "//span[text()='Change password']")
    private WebElement changePassword;
    @FindBy(xpath ="//span[text()='Something went wrong']")
    private WebElement errorMessage;
    @FindBy(xpath ="//span[text()='Oops']")
    private WebElement errorMessage2;
    private void checkElementTestVisible(){
        wait.until(ExpectedConditions.or(
                ExpectedConditions.visibilityOf(changePassword),
                ExpectedConditions.visibilityOf(errorMessage),
                ExpectedConditions.visibilityOf(errorMessage2)
        ));
    }

    public void loginTest(String phoneNumber, String password){
        homeLoginBtn();
        setPhoneNumber(phoneNumber);
        setPassword(password);
        clickLoginButton();
        checkElementTestVisible();
    }

    public void loginPrecondition(String phoneNumber, String password){
        homeLoginBtn();
        setPhoneNumber(phoneNumber);
        setPassword(password);
        clickLoginButton();
    }
}
