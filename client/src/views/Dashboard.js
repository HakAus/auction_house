import React, { Fragment, useState, useEffect } from "react";

// Components
import NavBar from "../components/NavBar";
import CategoryView from "./CategoryView";
import CreateAuctionView from "./CreateAuctionView";
import RegisterUserView from "./RegisterUserView";
import AuctHistoryView from "./AuctHistoryView";
import UserListView from "./UserListView";
import UserAuctsView from "./UserAuctsView";
import UpdateUserView from "./UpdateUserView";
import UpdateUserListView from "./UpdateUserListView";
import SetSystemParametersView from "./SetSystemParametersView";

const Dashboard = ({ setAuth }) => {
  const [alias, setAlias] = useState("");
  const [userId, setUserId] = useState(0);
  const [userType, setUserType] = useState("");
  const [view, setView] = useState("");
  const [Subasta, setSubasta] = useState("");
  const [Usuario, setUsuario] = useState("");
  const [Modo, setModo] = useState("");

  const getAuctData = (e, Subasta) => {
    setSubasta(Subasta);
    setView("auct_history"); // historial de pujas
  };

  const setAuctList = (e, fetchedId, modo) => {
    setUsuario(fetchedId);
    setModo(modo);
    setView("user_auct_list");
  };

  const setUpdateUserView = (user) => {
    setUsuario(user);
    setView("update_user_view");
  };

  const returnToUserUpdateList = () => {
    setView("update_user_list_view");
  };

  const goToSellerHistory = () => {
    setModo("venta");
    setView("user_auct_list");
  };

  const goToBuyerHistory = () => {
    setModo("compra");
    setView("user_auct_list");
  };

  async function getUserData() {
    try {
      const response = await fetch(
        "http://localhost:5000/dashboard/obtenerAliasTipoUsuario",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const parseResponse = await response.json();
      setAlias(parseResponse.alias);
      setUserId(parseResponse.cedula);
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
    console.log("Cerrando sesión ...");
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
          setModo={setModo}
        />
      </header>
      <body>
        <div>
          {view === "category_view" && userType === "participante" ? (
            <CategoryView getAuctData={getAuctData} />
          ) : view === "create_auction_view" && userType === "participante" ? (
            <CreateAuctionView sellerAlias={alias} />
          ) : view === "register_user_view" && userType === "administrador" ? (
            <RegisterUserView />
          ) : view === "auct_history" && userType === "participante" ? (
            <AuctHistoryView
              Subasta={Subasta}
              goToSellerHistory={goToSellerHistory}
            />
          ) : view === "user_list" && userType === "participante" ? (
            <UserListView setAuctList={setAuctList} />
          ) : view === "user_auct_list" && userType === "participante" ? (
            <UserAuctsView Usuario={Usuario} Modo={Modo} />
          ) : view === "update_user_list_view" &&
            userType === "administrador" ? (
            <UpdateUserListView setUpdateUserView={setUpdateUserView} />
          ) : view === "update_user_view" && userType == "administrador" ? (
            <UpdateUserView
              user={Usuario}
              returnToUserUpdateList={returnToUserUpdateList}
            />
          ) : view === "system_parameters_view" &&
            userType == "administrador" ? (
            <SetSystemParametersView />
          ) : (
            <div></div>
          )}
        </div>
      </body>
    </Fragment>
  );
};

export default Dashboard;
