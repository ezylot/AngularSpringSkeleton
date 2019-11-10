import {browser, by, element, protractor} from "protractor";

describe("person regression test", () => {

    beforeEach(() => {
        return browser.get(browser.baseUrl);
    });

    it("should compare creating page with baseline", async () => {
        await navigateToCratePage();
        expect(await browser.imageComparison.checkElement(element(by.tagName("app-person-edit")), "person-creation-page", { })).toEqual(0);
    });

    it("should disable submit button if one filed is empty", async () => {
        await navigateToCratePage();

        let submitButton = element(by.css("button[type=submit]"));
        expect(await submitButton.getAttribute("disabled")).toBeTruthy("No field is set");

        let firstNameInput = element(by.css("form input[formControlName='firstName']"));
        let lastNameInput = element(by.css("form input[formControlName='lastName']"));

        await firstNameInput.sendKeys("Florian");
        expect(await submitButton.getAttribute("disabled")).toBeTruthy("only first name is set");
        await firstNameInput.sendKeys("\b\b\b\b\b\b\b\b\b\b\b\b");

        await lastNameInput.sendKeys("Schöffl");
        expect(await submitButton.getAttribute("disabled")).toBeTruthy("only second name is set");
        await lastNameInput.sendKeys("\b\b\b\b\b\b\b\b\b\b\b\b");

        await firstNameInput.sendKeys("Florian");
        await lastNameInput.sendKeys("Schöffl");
        expect(await submitButton.getAttribute("disabled")).toBeFalsy("bot names are set");
    });

    it("creates person and shows in list", async () => {
        await navigateToCratePage();

        // Create form
        await element(by.css("form input[formControlName='firstName']")).sendKeys("Florian");
        await element(by.css("form input[formControlName='lastName']")).sendKeys("Schöffl");
        expect(await browser.imageComparison.checkElement(element(by.tagName("app-person-edit")), "person-creation-page-before-submit", { })).toEqual(0);
        await element(by.css("button[type=submit]")).click();

        // person list page
        await browser.wait(protractor.ExpectedConditions.urlContains("list"), 1000);
        expect(await browser.imageComparison.checkElement(element(by.tagName("app-person-list")), "person-creation-page-after-submit", { })).toEqual(0);
        expect(await element(by.css("tr td:nth-of-type(1)")).getText()).toEqual("1");
        expect(await element(by.css("tr td:nth-of-type(2)")).getText()).toEqual("Florian");
        expect(await element(by.css("tr td:nth-of-type(3)")).getText()).toEqual("Schöffl");
    });

    function navigateToCratePage() {
        return element(by.partialLinkText("Create a new person")).click();
    }
});