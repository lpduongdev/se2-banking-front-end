package com.ebanking.elements.features;


import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TransferMoney {

    WebDriverWait wait;

    public TransferMoney(WebDriver driver){
        this.wait = new WebDriverWait(driver, 30);
    }


    @FindBy(xpath = "//a[normalize-space()='Features']")
    private WebElement features_btn;
    private void clickFeatures(){
        wait.until(ExpectedConditions.visibilityOfAllElements(features_btn));
        features_btn.click();
    }

    @FindBy(xpath = "//a[normalize-space()='Features']//following::a[normalize-space()='Transfer money']")
    private WebElement transfer_money_btn;
    private void clickTransferMoney(){
        wait.until(ExpectedConditions.visibilityOfAllElements(transfer_money_btn));
        transfer_money_btn.click();
    }

    @FindBy(xpath = "(//span[normalize-space()='Phone number'])[1]")
    private WebElement phone_number_btn;
    private void clickPhoneNumber(){
        wait.until(ExpectedConditions.visibilityOfAllElements(phone_number_btn));
        phone_number_btn.click();
    }

    @FindBy(className = "ant-input")
    private WebElement phone_number_input;
    private void inputPhoneNumber(String phone_number){
        phone_number_input.sendKeys(phone_number);
    }

    @FindBy(className = "ant-input-number-input")
    private WebElement amount_input;
    private void inputAmount(String amount){
        amount_input.sendKeys(amount);
    }

    @FindBy(xpath = "(//button[@type='submit'])[1]")
    private WebElement transfer_btn;
    private void clickTransfer(){
        transfer_btn.click();
    }

    @FindBy(xpath = "//span[normalize-space()='OK']")
    private WebElement ok_btn;
    private void clickOk(){
        wait.until(ExpectedConditions.visibilityOfAllElements(ok_btn));
        ok_btn.click();
    }

    @FindBy(xpath = "//span[@aria-label='check-circle']//*[name()='svg']//following::span[normalize-space()='OK']")
    private WebElement ok_btn_2;
    private void clickOk2(){
        wait.until(ExpectedConditions.visibilityOfAllElements(ok_btn_2));
        ok_btn_2.click();
    }

    public void transferMoney(String phone_number, String amount, String amount_deposit, String amount_withdraw
                , String amount_saving, String amount_loan){
        clickFeatures();
        clickTransferMoney();
        clickPhoneNumber();
        inputPhoneNumber(phone_number);
        inputAmount(amount);
        clickTransfer();
        clickOk();
        clickOk2();
        clickFeatures();
        clickDeposit();
        inputAmountDeposit(amount_deposit);
        clickDepositSubmit();
        clickOk();
        clickOk2();
        clickFeatures();
        clickWithdraw();
        inputAmountWithdraw(amount_withdraw);
        clickWithdrawSubmit();
        clickOk();
        clickOk2();
        clickFeatures();
        clickMoneySaving();
        clickPlan();
        clickMaturutyAndProfit();
        inputAmountSaving(amount_saving);
        clickSavingSubmit();
        clickOk();
        clickOk2();
        clickFeatures();
        clickMoneyLoan();
        clickPlanLoan();
        inputAmountLoan(amount_loan);
        clickLoanSubmit();
        clickOk();

    }


    @FindBy(xpath = "//a[normalize-space()='Features']//following::a[normalize-space()='Deposit money']")
    private WebElement deposit_btn;
    private void clickDeposit(){
        wait.until(ExpectedConditions.visibilityOfAllElements(deposit_btn));
        deposit_btn.click();
    }

    @FindBy(xpath = "(//input[@value='0'])[1]")
    private WebElement amount_deposit_input;
    private void inputAmountDeposit(String amount){
        amount_deposit_input.sendKeys(amount);
    }

    @FindBy(xpath = "//span[normalize-space()='Deposit']")
    private WebElement deposit_submit_btn;
    private void clickDepositSubmit(){
        deposit_submit_btn.click();
    }

    public void depositMoney(String amount){
        clickFeatures();
        clickDeposit();
        inputAmountDeposit(amount);
        clickDepositSubmit();
        clickOk();
    }

    @FindBy(xpath = "//a[normalize-space()='Features']//following::a[normalize-space()='Withdraw money']")
    private WebElement withdraw_btn;
    private void clickWithdraw(){
        wait.until(ExpectedConditions.visibilityOfAllElements(withdraw_btn));
        withdraw_btn.click();
    }

    @FindBy(xpath = "//input[@value='0']")
    private WebElement amount_withdraw_input;
    private void inputAmountWithdraw(String amount){
        amount_withdraw_input.sendKeys(amount);
    }

    @FindBy(xpath = "//span[normalize-space()='Withdraw']")
    private WebElement withdraw_submit_btn;
    private void clickWithdrawSubmit(){
        withdraw_submit_btn.click();
    }

    public void withdrawMoney(String amount){
        clickFeatures();
        clickWithdraw();
        inputAmountWithdraw(amount);
        clickWithdrawSubmit();
        clickOk();
    }


    @FindBy(xpath = "//a[normalize-space()='Features']//following::a[normalize-space()='Money saving']")
    private WebElement money_saving_btn;
    private void clickMoneySaving(){
        wait.until(ExpectedConditions.visibilityOfAllElements(money_saving_btn));
        money_saving_btn.click();
    }

    @FindBy(xpath = "//h2[normalize-space()='Plan list']/..//label[contains(@class,'ant-radio-button-wrapper')]")
    private WebElement plan_btn;
    private void clickPlan(){
        wait.until(ExpectedConditions.visibilityOfAllElements(plan_btn));
        plan_btn.click();
    }

    @FindBy(xpath = "//span[normalize-space()='Maturity']")
    private WebElement maturity_btn;
    @FindBy(xpath = "//span[normalize-space()='Profit']")
    private WebElement profit_btn;
    private void clickMaturutyAndProfit(){
        maturity_btn.click();
        profit_btn.click();
    }


    @FindBy(xpath = "//input[contains(@value,'0')]")
    private WebElement amount_saving_input;
    private void inputAmountSaving(String amount){
        amount_saving_input.sendKeys(amount);
    }

    @FindBy(xpath = "//span[normalize-space()='Create saving']")
    private WebElement saving_submit_btn;
    private void clickSavingSubmit(){
        wait.until(ExpectedConditions.visibilityOfAllElements(saving_submit_btn));
        saving_submit_btn.click();
    }

    public void createSaving(String amount){
        clickFeatures();
        clickMoneySaving();
        clickPlan();
        clickMaturutyAndProfit();
        inputAmountSaving(amount);
        clickSavingSubmit();
        clickOk();
    }


    @FindBy(xpath = "//a[normalize-space()='Features']//following::a[normalize-space()='Money loan']")
    private WebElement money_loan_btn;
    private void clickMoneyLoan(){
        wait.until(ExpectedConditions.visibilityOfAllElements(money_loan_btn));
        money_loan_btn.click();
    }

    @FindBy(xpath = "//h2[normalize-space()='Plan list']//following::label[contains(@class,'ant-radio-button-wrapper')]")
    private WebElement plan_loan_btn;
    private void clickPlanLoan(){
        wait.until(ExpectedConditions.visibilityOfAllElements(plan_loan_btn));
        plan_loan_btn.click();
    }

    @FindBy(xpath = "//input[@value='0']")
    private WebElement amount_loan_input;
    private void inputAmountLoan(String amount){
        amount_loan_input.sendKeys(amount);
    }

    @FindBy(xpath = "//span[normalize-space()='Loan']")
    private WebElement loan_submit_btn;
    private void clickLoanSubmit(){
        loan_submit_btn.click();
    }

    public void action(String amount){
        clickFeatures();
        clickMoneyLoan();
        clickPlanLoan();
        inputAmountLoan(amount);
        clickLoanSubmit();
        clickOk();
    }






}
