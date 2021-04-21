import React, { useState, useEffect } from "react";
//Creo que me hacen falta las validaciones de autenticcion
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
    const getAucts= (e,item) =>{
        console.log("JUEPUTA")
        setAuctList(e,item)
    }
  
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
  
              <table>
                  <thead>
                      <tr>
                          <th>Id Usuario</th>
                          <th>Alias</th>
                          <th>Correo</th>
                          <th>Tipo de Usuario</th>
                          <th>Numero de ventas</th>
                          <th>Numero de compras</th>
                      </tr>
                  </thead>
  
                  
                  <tbody>
                      {UserList.map(item => (
                              <tr key = {item.cedula} onClick = {(e) => getAucts(e,item)}>
                                  <td>{item.cedula}</td>
                                  <td>{item.alias}</td>
                                  <td>{item.correo}</td>
                                  <td>{"QUE TIPO SOY?"}</td>
                                  <td>{0}</td>
                                  <td>{0}</td>
                              </tr>
                          ))}
                  </tbody>
              </table>
          </div>
      )
  }
  
  export default UserListView