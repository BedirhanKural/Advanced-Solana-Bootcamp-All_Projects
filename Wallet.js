import { Keypair } from "@solana/web3.js";
import { writeFile } from 'fs/promises';

let wallet;

(async () => {
  let keypair = Keypair.generate();
  wallet = keypair;
  console.log(keypair);
})();
const walletData = {
    publicKey: wallet.publicKey.toBase58(),
  };


//wallet write
const jsonData = JSON.stringify(walletData, null, 2);

async function writeDataToFile() {
  try {
    await writeFile('wallet.json', jsonData, 'utf8');
    console.log('Veri başarıyla dosyaya yazıldı.');
  } catch (err) {
    console.error('Dosya yazma hatası:', err);
  }
}

writeDataToFile();

// print wallet address
const publicKey = wallet.publicKey.toBase58();
console.log('Cüzdan Adresi:', publicKey);




