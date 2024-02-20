import { Keypair } from "@solana/web3.js";
import { Connection, Transaction, clusterApiUrl, sendAndConfirmTransaction, SystemProgram } from '@solana/web3.js';
import * as SOLANA from '@solana/web3.js';
import { readFile } from 'fs/promises';
const { PublicKey, LAMPORTS_PER_SOL } = SOLANA;

let data;



//Sender wallet
let senderPrivKey;
async function readDataFromFile() {
    try {
      const fileContent = await readFile('wallet.json', 'utf8');
      return JSON.parse(fileContent);
    } catch (err) {
      console.error('Dosya okuma hatası:', err);
      return {};
    }
  }

(async () => {
  const keypair2 = Keypair.fromSecretKey(
    Uint8Array.from([
        137, 191, 195, 241,   9, 236, 197,  16, 124, 151, 207,
      189, 157,  76, 246, 226,  44, 200, 133,  46,  90, 185,
      177, 206, 162,  33, 146,  38,  32, 248, 245,  83, 159,
       70,   0,  39, 204, 212, 189, 151,  35,  60, 165, 224,
      154, 226, 114, 166, 163, 222, 110, 240, 124,  26, 198,
      162, 105, 134,  17,  82, 254, 114, 162,  28
    ])
  );
  senderPrivKey = keypair2;
})();


async function transfer(solAmount = 0.05) {
    try {
      // Read wallet data from wallet.json
      const walletData = await readDataFromFile();
  
      // Connection to devnet
      const connection = new Connection('https://api.devnet.solana.com/');
  
      // Transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: senderPrivKey.publicKey,
          toPubkey: new PublicKey(walletData.publicKey),
          lamports: solAmount * LAMPORTS_PER_SOL,
        })
      );
  
      // Approve and sign
      const signature = await sendAndConfirmTransaction(connection, transaction, [senderPrivKey]);
  
      console.log(`${solAmount} SOL transferi yapıldı. İşlem İmzası:`, signature);
    } catch (err) {
      console.error('Transfer işleminde hata:', err);
    }
  }
  
  transfer(0.05);