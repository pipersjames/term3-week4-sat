// syncronous library for doing file IO
const fs = require("node:fs");

// asynchronous function, making a directory can take time
const {mkdir} = require("node:fs/promises");

//stream data, safer than traditional saving/downloading/etc
// synchronous, so we wait and it is blocking
const {Readable} = require("node:fs/stream");

// wait for streaming to finish, it can take time, so it should be a promise
const {finished} = require("node:stream/promises");

// node file & directory path helper system
// /folder/subfolder/filename.png etc.
const path = require("node:path")



function downloadPokemonPicture (targetId = getRandomPokemonId()) {

}
// generate a random number between 1 and 1017
function getRandomPokemonId() {
    let pkmId = Math.floor(Math.random()*1017)
    return pkmId
}

//retrieve pokemon data for that number
//retrieve the image url from that pokemon data
async function getPokemonPictureUrl(targetId = getRandomPokemonId()) {

}

//Download that image and save it to the computer
//return the downloaded image's file path
async function savePokemonPictureToDisk(targeUrl, targetDownloadFilename, targetDownloadDirectory = ".") {

}

module.exports = {
    downloadPokemonPicture,
    getPokemonPictureUrl,
    getRandomPokemonId,
    savePokemonPictureToDisk
}