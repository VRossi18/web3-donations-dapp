import Web3 from 'web3';
import ABI from './abi.json';
import { Campaign } from '@/interfaces/campaign';

const CONTRACT_ADRRESS = '0xc3D6A134c3aCa49171444D367Fb0751Af11E25b7';

export const login = async () => {
   if (!window.ethereum) throw new Error('MetaMask não instalado');

   const web3 = new Web3(window.ethereum);
   const accounts = await web3.eth.requestAccounts();
   if (!accounts || !accounts.length) throw new Error('Carteira não encontrada ou não autorizada');

   localStorage.setItem('wallet', accounts[0]);
   return accounts[0];
};

export const getContract = () => {
   const web3 = new Web3(window.ethereum);
   const from = localStorage.getItem('wallet') as string;
   return new web3.eth.Contract(ABI, CONTRACT_ADRRESS, { from });
};

export const addCampaign = async (campaign: Campaign) => {
   const contract = getContract();
   console.log(contract);
   return contract.methods
      .addCampaign(campaign.title, campaign.description, campaign.videoUrl, campaign.imageUrl)
      .send();
};

export const getLastCampaingId = async () => {
   const contract = getContract();
   return contract.methods.nextId().call();
};

export const getCampaing = async (id: string) => {
   const contract = getContract();
   return contract.methods.campaigns(id).call();
};

export const donate = async (id: string, donation: number) => {
   await login();
   const contract = getContract();
   return contract.methods.donate(id).send({
      value: Web3.utils.toWei(donation, 'ether'),
   });
};
