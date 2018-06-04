const request = require('request')
const cheerio = require('cheerio')
const URL = require('url-parse')
const fs = require('fs')

if (!process.argv[2] || process.argv[2].length < 8) {
    console.log("Please input webpage to crawl. Ex: crawl http://webpage.com")
    process.exit(1)
}

if (!process.argv[3]) {
    let param = process.argv[2].toString()
    let ini = (param.indexOf('/', 0) + 2)
    let fim = param.indexOf('.', ini)
    if (param.substring(ini, fim) === 'www') {
        ini = fim + 1
        fim = param.indexOf('.', ini)
    }
    var name = param.substring(ini, fim)
} else {
    var name = process.argv[3].toString()
}

const page = process.argv[2]
console.log("visiting page", page)

let relName = `./links/${name}-relLinks.txt`
let absName = `./links/${name}-absLinks.txt`

let relStream = fs.createWriteStream(relName, 'utf-8');
let absStream = fs.createWriteStream(absName, 'utf-8');

request(page, (error, response, body) => {
    if (error) return console.log(error)
    if (response.statusCode >= 400) {
        console.log("Not able to read:", response.statusCode)
    } else {
        let data = cheerio.load(body)
        collectLinks(data)
    }
})

collectLinks = (data) => {

    var relLinks = data("a[href^='/']")
    relLinks.each(function () {
        relStream.write(data(this).attr('href'))
    })

    var absLinks = data("a[href^='http']")
    absLinks.each(function () {
        absStream.write(data(this).attr('href') + '\n')
    })
}