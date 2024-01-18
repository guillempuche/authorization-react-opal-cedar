// Function to replace newlines with underscores
function replaceNewLinesWithUnderscores(data: Uint8Array): Uint8Array {
	let dataStr = new TextDecoder().decode(data);
	dataStr = dataStr.replace(/\n/g, '_');
	return new TextEncoder().encode(dataStr);
}

// Function to process the RSA keys
async function processRSAKeys() {
	try {
		// Read the contents of the private key
		const rsaPrivateKey = await Deno.readFile('rsa');
		// Replace newlines with underscores in the private key
		const modifiedPrivateKey = replaceNewLinesWithUnderscores(rsaPrivateKey);

		// Write the modified private key to a new file
		await Deno.writeFile('rsa_modified', modifiedPrivateKey);

		// Repeat the process for the public key
		const rsaPublicKey = await Deno.readFile('rsa.pub');
		const modifiedPublicKey = replaceNewLinesWithUnderscores(rsaPublicKey);

		// Write the modified public key to a new file
		await Deno.writeFile('rsa.pub_modified', modifiedPublicKey);
	} catch (error) {
		console.error('Error processing RSA keys:', error);
	}
}

// Run the script `deno run --allow-read --allow-write make-keys-compatible.ts`
processRSAKeys();
