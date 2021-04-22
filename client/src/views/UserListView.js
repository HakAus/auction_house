import React, { useState, useEffect } from "react";
import SearchFeature from "../components/SearchFeature";


const UserListView = ({setAuctList}) => {
  
      const [UserList,setUserList] = useState([])
  
      async function getUserList(){
  
          try {
            return fetch("http://localhost:5000/dashboard/listaUsuarios", {
              method: "POST",
              headers: { token: localStorage.token },
            }).then(data => data.json());
          } catch (err) {
            console.error(err.message);
            
          }
        }
    const getAucts= (e,item,modo) =>{
      setAuctList(e,item,modo)
    }

    const updateSearchTerms = (newSearchTerm) => {

    };
  
      useEffect(() => {
          let mounted = true;
          getUserList()
            .then(items => {
              if(mounted) {
                  setUserList(items)
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
   <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <SearchFeature refreshFunction={updateSearchTerms} />
      </div>
              <table class="table mt-5 text-center">
                  <thead>
                      <tr>
                          <th>Id Usuario</th>
                          <th>Alias</th>
                          <th>Correo</th>
                          <th>Tipo de Usuario</th>
                          <th>Ventas</th>
                          <th>Compras</th>
                      </tr>
                  </thead>
  
                  
                  <tbody>
                      {UserList.map(item => (
                              <tr key = {item.cedula} >
                                  <td>{item.cedula}</td>
                                  <td>{item.alias}</td>
                                  <td>{item.correo}</td>
                                  <td>{"QUE TIPO SOY?"}</td>
                                  <td><button onClick = {(e) => getAucts(e,item,"venta")} type="button" class="btn btn-warning">Ventas</button></td>
                                  <td><button onClick = {(e) => getAucts(e,item,"compra")} type="button" class="btn btn-danger">Compras</button></td>
                              </tr>
                          ))}
                  </tbody>
              </table>
          </div>
      )
  }
  
  export default UserListView