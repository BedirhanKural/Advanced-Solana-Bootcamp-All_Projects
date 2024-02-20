import { exec } from 'child_process';

const recipientAccountAddress = 'BijjWG6cdJAp71vYdaCkWPtpcHkJzrpfKgqLvamiPd4X';// my default wallet address

const command = `solana airdrop 1 ${recipientAccountAddress} --url https://api.devnet.solana.com`;

//running like a terminal command
exec(command, (error) => {
  if (error) {
    console.error(`Hata oluştu: ${error.message}`);
    return;
  } 
});