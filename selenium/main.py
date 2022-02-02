import os
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait


if __name__ == "__main__":
    os.environ['PATH'] += r"D:/Selenium"
    driver = webdriver.Chrome()

    driver.get("https://www.google.com")
