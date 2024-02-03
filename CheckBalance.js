import * as SOLANA from '@solana/web3.js';
import { Connection } from '@solana/web3.js';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { readFile, writeFile } from 'fs/promises';

const QUICKNODE_RPC = 'https://api.devnet.solana.com/';

(async () => {
  try {
    // read wallet.json file
    const walletData = await readDataFromFile();

    // wallet public key from wallet.json
    const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);
    const WALLET_ADDRESS = walletData.publicKey;

    console.log("Wallet Address:", WALLET_ADDRESS);

    let balance = await SOLANA_CONNECTION.getBalance(new PublicKey(WALLET_ADDRESS));
    console.log(`Wallet Balance: ${balance / LAMPORTS_PER_SOL} SOL`);

    // insert balance
    walletData.balance = balance / LAMPORTS_PER_SOL;
    const jsonData = JSON.stringify(walletData, null, 2);

    await writeDataToFile(jsonData);
  } catch (err) {
    console.error('Bir hata oluştu:', err);
  }
})();

// wallet write
async function writeDataToFile(jsonData) {
  try {
    await writeFile('wallet.json', jsonData, 'utf8');
    console.log('Veri başarıyla dosyaya yazıldı.');
  } catch (err) {
    console.error('Dosya yazma hatası:', err);
  }
}

// wallet read
async function readDataFromFile() {
  try {
    const fileContent = await readFile('wallet.json', 'utf8');
    return JSON.parse(fileContent);
  } catch (err) {
    console.error('Dosya okuma hatası:', err);
    return {};
  }
}
