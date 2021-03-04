const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuid} = require('uuid');

async function main() {
    console.log('Azure Blob storage v12 - JavaScript quickstart sample');
    // Quick start code goes here
}

main().then(() => console.log('Done')).catch((ex) => console.log(ex.message));