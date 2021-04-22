import React, { useState, useEffect } from "react";

const AuctHistoryView = ({Subasta}) => {

  const [inputs, setInputs] = useState({
    monto: 0
  });
  const {
    monto
  } = inputs;
  const idsubasta = Subasta.idsubasta
  
  

    const [History,setHistory] = useState([])

    const getHistory = async () =>{
      const body = {idsubasta};
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

       const onClick = async (e) =>{
        if(monto < 5000)
          console.log("Oferta minima 5000")
        else{
          bid();
        }
      }

      const bid = async () =>{
        const body = {monto,
          idsubasta};
        try {
          return fetch("http://localhost:5000/dashboard/ofertar", {
            method: "POST",
            headers: {token: localStorage.token ,'Content-Type': 'application/json'},
            body: JSON.stringify(body)
          });
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
          });
        return () => mounted = false;
      }, [])

      
    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>History</h1>
            </div>
            <br />
            <input
          type="number"
          name="monto"
          placeholder="monto"
          className="form-control my-3"
          value={monto}
          onChange={(e) => onChange(e)}
          />
          <button
            type="fetch-button"
            class="btn btn-light mx-2"
            onClick={(e)=>onClick(e)}
          >
            Pujar
          </button>

            <table class="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Id Oferta</th>
                        <th>Id Ofertante</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                
       



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