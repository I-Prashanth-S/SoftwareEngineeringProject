from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import time

desired_cap = {
 'browser': 'Chrome',
 'browser_version': '81.0 beta',
 'os': 'Windows',
 'os_version': '10',
 'resolution': '1024x768',
 'name': 'Bstack-[Python] Sample Test'
}

driver = webdriver.Remote(
    command_executor='http://himanshukumar14:WnsNz7SsYbyT291rkPJr@hub.browserstack.com:80/wd/hub',
    desired_capabilities=desired_cap)

driver.get('http://akashsuper2000.github.io/faculty-dashboard')

time.sleep(2)

username = driver.find_element_by_name('id')
username.send_keys('sample')

password = driver.find_element_by_name('password')
password.send_keys('password')
time.sleep(2) 
subbut = driver.find_element_by_xpath("//input[@type='submit']")
subbut.click()

time.sleep(3)
subbut = driver.find_elements_by_xpath('//span[@class="Navbut"]')

for i in range(1,len(subbut)):
    time.sleep(2)
    subbut[i].click()
    time.sleep(2)

time.sleep(2)
driver.quit()

print('Success')
