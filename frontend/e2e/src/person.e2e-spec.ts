import {browser, by, element, protractor} from "protractor";
import ProtractorImageComparison from "protractor-image-comparison/build/protractor.image.compare";

describe("person regression test", () => {

    beforeEach(() => {
        browser.imageComparison.defaultOptions.largeImageThreshold = 10000;
        return browser.get(browser.baseUrl);
    });

    it("should compare list page with baseline", async () => {
        await navigateToListPage();
        expect(await browser.imageComparison.checkElement(element(by.tagName("app-person-list")), "person-empty-list-page", { })).toBeLessThanOrEqual(0.1);
    });


    it("should compare creating page with baseline", async () => {
        await navigateToCreatePage();
        expect(await browser.imageComparison.checkElement(element(by.tagName("app-person-edit")), "person-creation-page", { })).toBeLessThanOrEqual(0.1);
    });

    it("should disable submit button if one filed is empty", async () => {
        await navigateToCreatePage();

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
        await navigateToCreatePage();

        // Create form
        await element(by.css("form input[formControlName='firstName']")).sendKeys("Florian");
        await element(by.css("form input[formControlName='lastName']")).sendKeys("Schöffl");
        await browser.sleep(200);
        expect(await browser.imageComparison.checkElement(element(by.tagName("app-person-edit")), "person-creation-page-before-submit", { })).toBeLessThanOrEqual(0.1);
        await element(by.css("button[type=submit]")).click();

        // person list page
        await browser.wait(protractor.ExpectedConditions.urlContains("list"), 10000);
        expect(await browser.imageComparison.checkElement(element(by.tagName("app-person-list")), "person-creation-page-after-submit", { })).toBeLessThanOrEqual(0.1);
        expect(await element(by.css("tr td:nth-of-type(2)")).getText()).toEqual("Florian");
        expect(await element(by.css("tr td:nth-of-type(3)")).getText()).toEqual("Schöffl");

        await element(by.css("tr td:nth-of-type(4) .fa-trash")).click();
        expect(await browser.imageComparison.checkElement(element(by.tagName("app-person-list")), "person-list-page-after-delete", { })).toBeLessThanOrEqual(0.1);
    });

    function navigateToCreatePage() {
        return element(by.partialLinkText("Create a new person")).click();
    }

    function navigateToListPage() {
        return element(by.partialLinkText("List Persons")).click();
    }
});
