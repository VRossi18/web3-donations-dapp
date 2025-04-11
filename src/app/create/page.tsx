'use client';
import { useState } from 'react';
import { Campaign } from '@/interfaces/campaign';
import { addCampaign, getLastCampaingId } from '@/services/Web3Services.service';

export default function Create() {
   const [message, setMessage] = useState('');
   const [campaign, setcampaign] = useState<Campaign>({
      title: '',
      description: '',
      imageUrl: '',
      videoUrl: '',
   });

   const onInputChange = (event: React.ChangeEvent<any>) => {
      setcampaign((prevState) => ({ ...prevState, [event.target.id]: event.target.value }));
   };

   const btnSaveClick = () => {
      setMessage('Salvando a campanha aguarde');
      addCampaign(campaign)
         .then(() => getLastCampaingId())
         .then((id) =>
            setMessage(
               `Campanha salva com id ${id}. Em alguns minutos sua campanha estará pronta para receber doações. Link de divulgação http://localhost:3000/donate/${id}`,
            ),
         )
         .catch((ex) => {
            console.error(ex);
            setMessage(ex.message);
         });
   };

   return (
      <>
         <div className="container">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3 mt-5">Donate Crypto</h1>
            <p>Preencha os campos para incluir sua campanha na plataforma.</p>
            <p>
               Ao término do cadastro, você receberá o link para divulgá-la e receber as doações.
            </p>
            <hr className="mb-4" />
            <div className="col-6">
               <div className="form-floating mb-3">
                  <input
                     type="text"
                     id="title"
                     className="form-control"
                     onChange={onInputChange}
                     value={campaign.title || ''}
                  />
                  <label htmlFor="title">Título:</label>
               </div>
               <div className="form-floating mb-3">
                  <textarea
                     id="description"
                     className="form-control"
                     onChange={onInputChange}
                     value={campaign.description || ''}
                  />
                  <label htmlFor="description">Descrição:</label>
               </div>
               <div className="form-floating mb-3">
                  <input
                     type="text"
                     id="imageUrl"
                     className="form-control"
                     onChange={onInputChange}
                     value={campaign.imageUrl || ''}
                  />
                  <label htmlFor="imageUrl">URL da Imagem:</label>
               </div>
               <div className="form-floating mb-3">
                  <input
                     type="text"
                     id="videoUrl"
                     className="form-control"
                     onChange={onInputChange}
                     value={campaign.videoUrl || ''}
                  />
                  <label htmlFor="videoUrl">URL do Vídeo:</label>
               </div>
               <div className="col-12 mb-3">
                  <button
                     type="button"
                     className="btn btn-primary col-12 p-3"
                     onClick={btnSaveClick}
                  >
                     Salvar
                  </button>
               </div>
               {message ? (
                  <div className="alert alert-success p-3 col-12 mt-3" role="alert">
                     {message}
                  </div>
               ) : (
                  <></>
               )}
            </div>
         </div>
      </>
   );
}
