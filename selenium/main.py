from re import search
from webbrowser import get
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time


def testReviews(driver):
    driver.get("http://localhost:3000/reviews")

    # Testing if the rating is displayed
    rating_test_input = driver.find_element_by_id(
        "ratingTest").send_keys("100")

    rating_button = driver.find_element_by_id(
        "ratingTestButton").send_keys(Keys.RETURN)

    # Testing if the review is displayed
    review_test_input = driver.find_element_by_id(
        "reviewTest").send_keys("100")

    rating_button = driver.find_element_by_id(
        "reviewTestButton").send_keys(Keys.RETURN)


def testPurchases(driver):
    driver.get("http://localhost:3000/purchases")

    # Testing if the purchase is displayed
    purchase_input = driver.find_element_by_id(
        "purchaseInput").send_keys("50")

    purchase_button = driver.find_element_by_id(
        "purchaseButton").send_keys(Keys.RETURN)


def testLogin(driver):
    driver.get("http://localhost:3000/login")

    # Testing if the purchase is displayed
    email_input = driver.find_element_by_id(
        "emailInput").send_keys("testemail@gmail.com")

    password_input = driver.find_element_by_id(
        "passwordInput").send_keys("test")

    login_button = driver.find_element_by_id(
        "passwordInput").send_keys(Keys.RETURN)


if __name__ == "__main__":
    PATH = "D:\Selenium\chromedriver.exe"
    driver = webdriver.Chrome(PATH)
    testReviews(driver)
    time.sleep(5)
    testPurchases(driver)
    time.sleep(5)
    testLogin(driver)
