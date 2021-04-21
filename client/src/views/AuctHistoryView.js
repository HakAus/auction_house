import React, { useState, useEffect } from "react";

const AuctHistoryView = ({Subasta,userId}) => {

  const [inputs, setInputs] = useState({
    monto: ""
  });
  const {
    monto
  } = inputs;
  const idsubasta = Subasta.idsubasta
  
  

    const [History,setHistory] = useState([])

    async function getHistory(){
      const body = {idsubasta};
      console.log(body)
      console.log(userId)
        try {
          return fetch("http://localhost:5000/dashboard/verSubastas", {
            method: "POST",
            headers: { token: localStorage.token ,'Content-Type': 'application/json'},
            body: JSON.stringify(body)
          }).then(data => data.json());
        } catch (err) {
          console.error(err.message);
          
        }
      }

      async function getHigherBid()
      {

      }

      const bid = (e) =>{
        try {
          const body = {monto,
                        userId,
                        idsubasta};
          console.log(body)
          return fetch("http://localhost:5000/dashboard/ofertar", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
          }).then(data => data.json());
        } catch (err) {
          console.error(err.message);
          
        }
      }

      const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
      };

    useEffect(() => {
        let mounted = true;
        getHistory()
          .then(items => {
            if(mounted) {
                setHistory(items)
            }
          })
        return () => mounted = false;
      }, [])

      
    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>History</h1>
            </div>
            <br />

            <table>
                <thead>
                    <tr>
                        <th>Id Oferta</th>
                        <th>Id Ofertante</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                
       
         <input
          type="number"
          name="monto"
          placeholder="monto"
          className="form-control my-3"
          value={monto}
          onChange={(e) => onChange(e)}
          />
          {console.log(History)}
          <button
            type="button"
            class="btn btn-light mx-2"
            onClick={()=>bid()}
          >
            Pujar
          </button>


                {History.length !==0?//Tengo que traer el idOferta?
                <tbody>
                    {History.map(item => (
                            <tr key={item.p_ifoferta}>
                                <td>{item.p_ifoferta}</td>
                                <td>{item.p_id_ofertante}</td>
                                <td>{item.p_monto}</td>
                                <td>{item.p_fecha_tiempo}</td>
                            </tr>
                        ))}
                </tbody>
              :<tbody>,<h2> No bids yet...</h2></tbody>}
            </table>
        </div>
    )
}

export default AuctHistoryView
/**/