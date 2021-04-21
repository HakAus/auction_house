import React, { useState, useEffect } from "react";

const UserAuctsView = ({Usuario}) => {
  
      const [History,setHistory] = useState([])
  
      async function getHistory(){
  
          try {
            const body = {cedula:Usuario.cedula};
            console.log(Usuario)
            console.log(body)
            return fetch("http://localhost:5000/dashboard/verSubastasUsuario", {
              method: "POST",
              headers: { token: localStorage.token },
              body: JSON.stringify(body)
            }).then(data => data.json());
          } catch (err) {
            console.error(err.message);
            
          }
        }
  
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
                          <th>Id Usuario</th>
                          <th>Alias</th>
                          <th>Correo</th>
                          <th>Numero de ventas</th>
                          <th>Numero de compras</th>
                      </tr>
                  </thead>
  
                  {History.length !==0?
                  <tbody>
                      {History.map(item => (
                              <tr key={item.idsubasta}>
                                  <td>{item.id}</td>
                                  <td>{item.price}</td>
                                  <td>{item.quantity}</td>
                                  <td>{item.dateOfPurchase}</td>
                              </tr>
                          ))}
                  </tbody>
                :<tbody>,<h2> No aucts yet...</h2></tbody>}
              </table>
          </div>
      )
  }
  
  export default UserAuctsView