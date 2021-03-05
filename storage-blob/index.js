const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuidv1} = require('uuid');

async function main() {
    console.log('Azure Blob storage v12 - JavaScript quickstart sample');
    
    // Get the connection string
    // Retrieve the connection string for use with the application. The storage
    // connection string is stored in an environment variable on the machine
    // running the application called AZURE_STORAGE_CONNECTION_STRING. If the
    // environment variable is created after the application is launched in a
    // console or with Visual Studio, the shell or application needs to be closed
    // and reloaded to take the environment variable into account.
    const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

    //#region   Create a container    
    // Create the BlobServiceClient object which will be used to create a container client
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

    // Create a unique name for the container
    // const containerName = 'quickstart' + uuidv1();
    const containerName = 'quickstart';

    console.log('\nCreating container...');
    console.log('\t', containerName);

    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Create the container
    // const createContainerResponse = await containerClient.create();
    // console.log("Container was created successfully. requestId: ", createContainerResponse.requestId);
    //#endregion    Create a container
    
    //#region   Upload blobs to a container
    // Create a unique name for the blob
    const blobName = 'quickstart' + uuidv1() + '.txt';

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    console.log('\nUploading to Azure storage as blob:\n\t', blobName);

    // Upload data to the blob
    const data = 'Hello, World!';
    const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
    console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);
    //#endregion    Upload blobs to a container

    console.log('\nListing blobs...');

    // List the blob(s) in the container.
    for await (const blob of containerClient.listBlobsFlat()) {
        console.log('\t', blob.name);
    }
}

main().then(() => console.log('Done')).catch((ex) => console.log(ex.message));