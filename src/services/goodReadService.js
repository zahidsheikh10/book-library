const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodReadService');
const parser = xml2js.Parser({ explicitArray: false });

function goodReadService() {
    function getBookById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=vaFI1UAk7rvmoHOQ9G40Q`)
                .then((response) => {
                    parser.parseString(response.data, (error,result) => {
                        if (error) {
                            debug(error);
                        } else {
                            debug(result);
                            resolve(result.GoodreadsResponse.book);
                        }
                    })
                })
                .catch((error) => {
                    reject(error);
                    debug(error)

                })
        });
    }
    return { getBookById }
}
module.exports = goodReadService();