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

const API_URL_BASE = "https://pokeapi.co/api/v2/pokemon/"

function downloadPokemonPicture (targetId = getRandomPokemonId()) {
    return new Promise(async (resolve, reject) => {
        try {
        // step 1: get the image URL
        let newUrl = await getPokemonPictureUrl(targetId)
        // step 2: do the download
        let saveFileLocation = await savePokemonPictureToDisk(newUrl, "ExampleImage.png", "images");
        resolve(saveFileLocation);
        } catch (error) {
            reject(error);
        }
    })
}
// generate a random number between 1 and 1017
function getRandomPokemonId() {
    return Math.floor(Math.random()*1017)+1;
}

//retrieve pokemon data for that number
//retrieve the image url from that pokemon data
async function getPokemonPictureUrl(targetId = getRandomPokemonId()) {
    let response = await fetch(API_URL_BASE + targetId).catch(error => {
        throw new Error("API failure");
    });

    if (response.status == "404") {
        throw new Error("API did not have data for the requested ID")
    };

    let data = await response.json().catch(error => {
        throw new Error("API did not return valid JSON")
    })
    return data.sprites.other["official-artwork"].front_shiny;
}

//Download that image and save it to the computer
//return the downloaded image's file path
async function savePokemonPictureToDisk(targetUrl, targetDownloadFilename, targetDownloadDirectory = ".") {
    // fetch request to the image
    let imageData = await fetch(targetUrl).catch(error => {
        throw new Error("Image failed to download");
    })
    //check if the target directory exists
    //make a directory if we need too
    if (!fs.existsSync(targetDownloadDirectory)) {
        await mkdir(targetDownloadDirectory);
    }

    let fullFileDestination = path.join(targetDownloadDirectory, targetDownloadFilename);
 
    let fileDownloadStream = fs.createWriteStream(fullFileDestination);

    await finished(Readable.fromWeb(imageData.body).pipe(fileDownloadStream)).catch(error => {
        throw new Error("Failed to save content to disk")
    })
// return the saved image location
    return fullFileDestination

}

module.exports = {
    downloadPokemonPicture,
    getPokemonPictureUrl,
    getRandomPokemonId,
    savePokemonPictureToDisk
}