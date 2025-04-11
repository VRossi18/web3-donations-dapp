'use client';
import { donate, getCampaing } from '@/services/Web3Services.service';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Campaign } from '@/interfaces/campaign';
import Web3 from 'web3';

export default function Donate() {
   const params = useParams();
   const [campaign, setCampaign] = useState<Campaign>({});
   const [message, setMessage] = useState('');
   const [donation, setDonation] = useState(0);

   useEffect(() => {
      setMessage('Buscando campanha... aguarde...');
      getCampaing(params.id as string).then((result: any) => {
         setMessage('');
         result.id = params.id;
         setCampaign(result);
      });
   }, []);

   function onDonationChange(evt: React.ChangeEvent<any>) {
      setDonation(evt.target.value);
   }

   const btnDonateClick = () => {
      setMessage('Fazendo sua doação aguarde...');
      donate(campaign.id as string, donation)
         .then((tx) => {
            setMessage('');
            setDonation(0);
         })
         .catch((ex) => {
            setMessage(ex.message);
         });
   };

   return (
      <>
         <div className="container">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3 mt-5">Donate Crypto</h1>
            <p>Verifique se esta campanha é a correta antes de finalizar a sua doação</p>
            <hr />
            <div className="row flex-lg-row-reverse align-imtes-center g-5">
               <div className="col-7">
                  {campaign.videoUrl ? (
                     <iframe
                        width="100%"
                        height="480"
                        src={`https://www.youtube.com/embeded/${campaign.videoUrl}`}
                     ></iframe>
                  ) : (
                     <img
                        src={campaign.imageUrl}
                        className="d-block mx-lg-auto img-fluid"
                        width="640"
                        height="480"
                     />
                  )}
               </div>
               <div className="col-5 mb-5" style={{ height: 480 }}>
                  <h2>{campaign.title}</h2>
                  <p>
                     <strong>Autor: </strong>
                     {campaign.author}
                  </p>
                  <p className="mb-3">{campaign.description}</p>
                  <p className="mb-3 fst-italic mt-5">
                     E aí o que achou do projeto? Já foi arrecadado{' '}
                     {Web3.utils.fromWei(campaign.balance || 0, 'ether')} POL nessa campanha. O
                     Quanto você quer doar?
                  </p>
               </div>
               <div className="mb-3">
                  <div className="input-group">
                     <input
                        type="number"
                        id="donation"
                        className="from-control p-3 w-50"
                        value={donation}
                        onChange={onDonationChange}
                     />
                     <span className="input-group-text">POL</span>
                     <button
                        type="button"
                        className="btn btn-primary p-3 w-25"
                        onClick={btnDonateClick}
                     >
                        Doar
                     </button>
                  </div>
               </div>
               <div>
                  {message ? (
                     <div className="alert alert-success p-3 col-12 mt-3" role="alert">
                        {message}
                     </div>
                  ) : (
                     <></>
                  )}
               </div>
            </div>
         </div>
      </>
   );
}
