import './Dashboard.css';

import CarRequestType from '../types/CarRequest';
import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react';


function Dashboard() {
  const [currentRequestId, setCurrentRequestId] = useState("");
  const [carRequestsData, setCarRequestsData] = useState<CarRequestType[]>([]);
  const BASE_URL= import.meta.env.VITE_BASE_BACKEND_URL ;

  

  useEffect(() => {
    fetch(`${BASE_URL}car-requests/all`,
      {
        'mode': 'cors',
        'headers': {
            'Access-Control-Allow-Origin': '*',
        }
      })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setCarRequestsData(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}, []);


  const updateIcons = (icons:any, number: number|string) => {
    icons.card_icon.src = `/static/images/Icon_vehiculo${number}.svg`;
    icons.locality_icon.src = `/static/images/Icon_puntoubicacion${number}.svg`;
    icons.client_icon.src = `/static/images/Icon_persona${number}.svg`;
  };
  
    const proccess_car_data = (car_request_data: CarRequestType[]) => {
      return car_request_data.map((car_request, index) => {
        return (
          <tr key={index}>
          <td>{car_request.brand_id}</td>
          <td id="locality-td">{car_request.requested_at_locality}</td>
          <td>{car_request.user_requesting}</td>
          <td>
            <img className="edit-icon" src="/static/images/Icon_editar1.svg" alt="delete-icon" onClick={()=>{handle_edit_click(car_request.car_request_id)}}  
             />
            <img className="delete-icon" src="/static/images/Icon_eliminar1.svg" alt="delete-icon" onClick={(event)=>{handle_delete_click(car_request.car_request_id, event)}}
            />
          </td>
        </tr>
          )
        });
      }
  

  
  const handleOnclikEdit = () =>{
    const FINAL_URL = BASE_URL + `car-requests/${currentRequestId}`;
    const elements = getElements();
    const { card_id_input, card_locality_input, card_client_input } = elements;
    const car_request_data = {
      "user_requesting": card_client_input ? (card_client_input as HTMLInputElement).value : '',
      "car_requested": card_id_input ? (card_id_input as HTMLInputElement).value : '',
      "requested_at_locality": card_locality_input ? (card_locality_input as HTMLInputElement).value : ''
     };
    fetch(FINAL_URL,
      {
        method: "PUT",
        'mode':'cors',
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(car_request_data)
    });
    updateIcons(elements, "");
    handle_cancel_click();
  }

  

  const set_to_edit_data = (car_request_id: string) => {
    const elements = getElements();
    const { card_id_input, card_locality_input, card_client_input } = elements;

    let card_data = carRequestsData.find((card_request) => card_request.car_request_id === car_request_id);
  
    if (!card_data) {
      console.error("No se encontró el id de la solicitud");
      return;
    }
    if (card_id_input && card_locality_input && card_client_input) {
      (card_id_input as HTMLInputElement).value = card_data.brand_id;
      (card_locality_input as HTMLInputElement).value = card_data.requested_at_locality;
      (card_client_input as HTMLInputElement).value = card_data.user_requesting;
    } else 
      console.error("No se encontraron los inputs para ser rellenados");
  };

 const  handleOnClickCrear =  ()=>{
  
      const FINAL_URL = BASE_URL + "car-requests/save";

      const car_request_data= {
        "user_requesting": document.querySelector<HTMLInputElement>("#card-client-input")?.value || '',
        "car_requested": document.querySelector<HTMLInputElement>("#car-id-input")?.value || '',
        "requested_at_locality": document.querySelector<HTMLInputElement>("#card-locality-input")?.value || ''
      }
      
      fetch(FINAL_URL, {
        method: "POST",
        'mode':'cors',
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(car_request_data)
      });

      
      updateIcons(getElements(), "");
      handleOnClickCancelar();
    }



    const getElements = () => {
      return {
        card_icon: document.querySelector("#car-icon"),
        locality_icon: document.querySelector("#locality-icon"),
        client_icon: document.querySelector("#client-icon"),
        card: document.querySelector("#main-card"),
        confirm_btn: document.querySelector("#confirm-btn-id"),
        cancel_btn: document.querySelector("#cancel-btn-id"),
        card_id_input: document.querySelector("#car-id-input"),
        card_locality_input: document.querySelector("#card-locality-input"),
        card_client_input: document.querySelector("#card-client-input"),
        add_arrow: document.querySelector(".add-arrow"),
        confirm1_btn: document.querySelector(".confirm1-btn"),
        cancel1_btn: document.querySelector(".cancel1-btn")
      };
    };

    const handle_delete_click = (car_request_id: string, event:React.MouseEvent) => {
      const row = event.currentTarget.closest('tr');
      if (row) {
        row.classList.add('delete-animation');
        setTimeout(() => {
            row.remove();
          }, 500);
        }
      
      const FINAL_URL = `${BASE_URL}car-requests/${car_request_id}`;
      fetch(FINAL_URL, {
        method: "DELETE",
        'mode':'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      })
      .then(response => response.json())
      .finally(() => {
          console.info(`Request with id${car_request_id} deleted successfully`);
      });
    }

    const handle_edit_click = (car_request_id: string) => {
      setCurrentRequestId(car_request_id);
      
      const elements = getElements();
      const { card_client_input, card_id_input, card_locality_input, card_icon, locality_icon, client_icon, card, confirm_btn, cancel_btn } = elements;
    
      if (!card_icon || !locality_icon || !client_icon || !card || !confirm_btn || !cancel_btn || !card_id_input || !card_locality_input || !card_client_input) {
        console.error("No se encontraron los iconos para ser reemplazados");
        return;
      }

      updateIcons(elements, "1");

      (card as HTMLElement).style.animation = "expand-card .25s ease forwards";
      setTimeout(() => {
        (confirm_btn as HTMLElement).style.visibility = "visible";
        (cancel_btn as HTMLElement).style.visibility = "visible";
      }, 50);
    
      set_to_edit_data(car_request_id);
      
    };
    
    const handle_cancel_click = () => {
      const elements = getElements();
      const { card_icon, locality_icon, client_icon, card, confirm_btn, cancel_btn, card_id_input, card_locality_input, card_client_input } = elements;
    
      if (!card_icon || !locality_icon || !client_icon || !card || !confirm_btn || !cancel_btn || !card_id_input || !card_locality_input || !card_client_input) {
        console.error("No se encontraron los iconos para ser reemplazados");
        return;
      }
    
      updateIcons(elements, "");
    
      (card as HTMLElement).style.animation = "reset-card .25s ease forwards";
      setTimeout(() => {
        (confirm_btn as HTMLElement).style.visibility = "hidden";
        (cancel_btn as HTMLElement).style.visibility = "hidden";
      }, 30);
    
      (card_id_input as HTMLInputElement).value = "";
      (card_locality_input as HTMLInputElement).value = "";
      (card_client_input as HTMLInputElement).value = "";
    };
    



    const handle_add_click = () => {
      
      const elements = getElements();
      const { add_arrow, card, confirm1_btn, cancel1_btn } = elements;
    
      if (!add_arrow || !card || !confirm1_btn || !cancel1_btn) {
        console.error("No se encontraron los iconos para ser reemplazados");
        return;
      }

      updateIcons(elements, "1");
    
      (card as HTMLElement).style.animation = "expand-card .25s ease forwards";
      (confirm1_btn as HTMLElement).style.visibility = "visible";
      (cancel1_btn as HTMLElement).style.visibility = "visible";
    };
    


    const handleOnClickCancelar = () => {
      const elements = getElements();
      const { card, confirm1_btn, cancel1_btn, card_id_input, card_locality_input, card_client_input } = elements;
    
      if (!card || !confirm1_btn || !cancel1_btn || !card_id_input || !card_locality_input || !card_client_input) {
        console.error("No se encontraron los iconos para ser reemplazados");
        return;
      }
    
      (card_id_input as HTMLInputElement).value = "";
      (card_locality_input as HTMLInputElement).value = "";
      (card_client_input as HTMLInputElement).value = "";
    
      updateIcons(elements, "");
    
      (card as HTMLElement).style.animation = "reset-card .25s ease forwards";

      setTimeout(() => {
        (confirm1_btn as HTMLElement).style.visibility = "hidden";
        (cancel1_btn as HTMLElement).style.visibility = "hidden";
      }, 65);
    };



  return (
    <>
    <section className="card" id="main-card">
      <div className="card-header">
        <span className="add">
          <img className="add-arrow" src="/static/images/Icon_crear.svg" alt="add" onClick={handle_add_click} />
        </span>
      </div>
      <div className="inputs">
        <div className="input-row">
          <img id="car-icon" className="input-image" src="/static/images/Icon_vehiculo.svg" alt="car-input" />
          <input type="text" placeholder="Mazda" id="car-id-input"/>
        </div>
        <div className="input-row">
          <img id="locality-icon" className="input-image" src="/static/images/Icon_puntoubicacion.svg" alt="locality-input" />
          <input type="text" placeholder="Chapinero" id="card-locality-input" />
        </div>
        <div className="input-row">
          <img id="client-icon" className="input-image" src="/static/images/Icon_persona.svg" alt="client-input" />
          <input type="text" placeholder="David Sandoval" id="card-client-input" />
        </div>
      </div>
      <button className="cancel-btn" id="cancel-btn-id" onClick={handle_cancel_click} >
          <img src="/static/images/Icon_cancelar.svg" alt="cancel-btn" />
        </button>
        <button className="confirm-btn" id="confirm-btn-id"  onClick={handleOnclikEdit}>
          <img src="/static/images/Icon_confirmar.svg" alt="confirm-btn" />
        </button>
        <button className="confirm1-btn" onClick={handleOnClickCrear}>
          Crear
        </button>
        <button className="cancel1-btn"  onClick={handleOnClickCancelar}>
          Cancelar
        </button>
    </section>
    <table className="table">
    <thead>
      <tr>
        <th className="separator-1">Marca</th> 
        <th className="separator-2">Sucursal</th> 
        <th>Aspirante</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
        {proccess_car_data(carRequestsData)}
    </tbody>
  </table>
  <footer>
    <img src="/static/images/Imagologotipo_motion.svg" alt="imagologotipo-motion" />
  </footer>
  </>
  );
  
}

export default Dashboard;  