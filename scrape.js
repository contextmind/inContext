var cheerio = require('cheerio')
var chrome = require('selenium-webdriver/chrome')
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until

// Configure user agent for web driver
var opts = new chrome.Options()
opts.addArguments(['user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36"'])

var driver = new webdriver.Builder().
    withCapabilities(opts.toCapabilities()).
    build()

// url to visit
let url = 'YOUTUBE_VIDEO_URL_HERE'

// open browser with url
driver.get(url)

// waits and clicks action menu
driver.sleep(2000)
driver.wait(until.elementLocated(By.xpath("//button[@aria-label='Action menu.']")), 2000)
var btn = driver.findElement(By.xpath("//button[@aria-label='Action menu.']"))
driver.sleep(1000)
btn.click()

// waits and selects transcripts menu
driver.wait(until.elementLocated(By.id('action-panel-overflow-menu')), 2000)
var btn = driver.findElement(By.id('action-panel-overflow-menu'))
driver.sleep(1000)
btn.click()

// waits for transcripts to load
driver.wait(until.elementLocated(By.id('transcript-scrollbox')), 2000)
driver.sleep(1000)

// loads html block and extracts data for each caption
const parse_captions = (html) => {
  const $ = cheerio.load(html)
  $('.caption-line').each(function(i, caption) {
    const data_time = $(this).data('time')
    const line_time = $(this).children('.caption-line-time').text()
    const line_text = $(this).children('.caption-line-text').text()
    console.log(`${i+1} ${data_time}, ${line_time}, ${line_text}`)
  })
}

// find transcripts
driver.findElement(By.id('transcript-scrollbox'))
  .then(el => el.getAttribute('innerHTML'))
  .then(parse_captions)

// wait for next videos container to appear
driver.wait(until.elementLocated(By.id('watch-related')), 2000)
driver.sleep(1000)

// loads html block and extracts next video href property from a tag
const parse_next_videos = (html) => {
  const $ = cheerio.load(html)
  $('.content-wrapper > a').each(function(i, link) {
    const href = $(this).prop('href')
    console.log(`${i+1} ${href}`)
  })
}

// find next video container
driver.findElement(By.id('watch-related'))
  .then(el => el.getAttribute('innerHTML'))
  .then(parse_next_videos)

// close browser
driver.quit()