import React, { Fragment, useState, useEffect } from "react";

// Components
import NavBar from "../components/NavBar";
import CategoryView from "./CategoryView";
import CreateAuctionView from "./CreateAuctionView";
import RegisterUserView from "./RegisterUserView";
import AuctHistoryView from "./AuctHistoryView";

const Dashboard = ({ setAuth }) => {
  const [alias, setAlias] = useState("");
  const [userType, setUserType] = useState("");
  const [view, setView] = useState("");
  const [Subasta,setSubasta] = useState("")

  const getAuctData = (e,Subasta) => {
    setSubasta(Subasta)
    console.log("Entra a setear subasta")
    console.log(Subasta)
    setView("auct_history")
  }

  async function getUserData() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseResponse = await response.json();

      setAlias(parseResponse.alias);
      setUserType(parseResponse.tipousuario);
    } catch (err) {
      console.error(err.message);
    }
  }

  const logout = (e) => {
    // Se evita el refreso de la página.
    e.preventDefault();
    // Se elimina el token asignado.
    localStorage.removeItem("token");
    // Se actualiza la autorización a falso.
    setAuth(false);
  };

  useEffect(() => {
    getUserData();
  }, []);


  return (
    <Fragment>
      <header>
        <NavBar
          setView={setView}
          alias={alias}
          userType={userType}
          logout={logout}
        />
      </header>
      <body>
        <div>
          {view === "category_view" && userType === "participante" ? (
            <CategoryView 
              getAuctData={getAuctData}
            />
          ) : view === "create_auction_view" && userType === "participante" ? (
            <CreateAuctionView />
          ) : view === "register_user_view" && userType === "administrador" ? (
            <RegisterUserView />
          ) : view === "auct_history" && userType === "participante" ?(
            <AuctHistoryView 
             Subasta = {Subasta}/>
          ):(
            <div></div>
          )}
        </div>
      </body>
    </Fragment>
  );
};

export default Dashboard;
