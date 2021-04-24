import React, { useState, useEffect } from "react";
import { Row, Card, Col } from "antd";
import Icon from "@ant-design/icons";
import CheckBox from "../components/CheckBox";
import RadioBox from "../components/RadioBox";
import { categorias, price } from "../components/Datas";
import SearchFeature from "../components/SearchFeature";
import ImageSlider from "../components/ImageSlider.js";

const { Meta } = Card;
const CategoriyView = ({ getAuctData }) => {
  async function getAuctions() {
    try {
      return fetch("http://localhost:5000/dashboard/getAuctions", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "Content-Type": "application/json",
        },
      }).then((data) => data.json());
    } catch (err) {
      console.error(err.message);
    }
  }

  const [Auctions, setAuctions] = useState([]);

  const logout = (e) => {
    // Se evita el refreso de la página.
    e.preventDefault();
    // Se elimina el token asignado.
    localStorage.removeItem("token");
    // Se actualiza la autorización a falso.
  };

  useEffect(() => {
    let mounted = true;
    getAuctions().then((items) => {
      if (mounted) {
        setAuctions(items);
      }
    });
    return () => (mounted = false);
  }, []);

  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState();
  const [SearchTerms, setSearchTerms] = useState("");
  const [Filters, setFilters] = useState({
    categorias: [],
    price: [],
  });

  // const onLoadMore = () => {
  //   let skip = Skip + Limit;

  //   const variables = {
  //     skip: skip,
  //     limit: Limit,
  //     loadMore: true,
  //     filters: Filters,
  //     searchTerm: SearchTerms,
  //   };
  //   getProducts(variables);
  //   setSkip(skip);
  // };

  const renderCards = Auctions.map((auction, index) => {
    console.log("INFO DE LA SUBASTA", auction);
    return (
      <Col lg={6} md={8} xs={24}>
        <Card
          hoverable={true}
          cover={
            <a href={`/product/${auction.iditem}`}>
              {" "}
              <ImageSlider images={auction.imagen} />
            </a>
          }
        >
          <p>{`Vendedor: ${auction.aliasvendedor}`}</p>
          <Meta
            title={auction.descripcion}
            description={
              auction.preciobase < auction.pujamasalta
                ? `${auction.pujamasalta}`
                : `$${auction.preciobase}`
            }
            onClick={(e) => getAuctData(e, auction)}
          />
        </Card>
      </Col>
    );
  });

  // const showFilteredResults = (filters) => {
  //   const variables = {
  //     skip: 0,
  //     limit: Limit,
  //     filters: filters,
  //   };
  //   getProducts(variables);
  //   setSkip(0);
  // };

  // const handlePrice = (value) => {
  //   const data = price;
  //   let array = [];

  //   for (let key in data) {
  //     if (data[key]._id === parseInt(value, 10)) {
  //       array = data[key].array;
  //     }
  //   }
  //   console.log("array", array);
  //   return array;
  // };

  // const handleFilters = (filters, category) => {
  //   const newFilters = { ...Filters };

  //   newFilters[category] = filters;

  //   if (category === "price") {
  //     let priceValues = handlePrice(filters);
  //     newFilters[category] = priceValues;
  //   }

  //   console.log(newFilters);

  //   showFilteredResults(newFilters);
  //   setFilters(newFilters);
  // };

  // const updateSearchTerms = (newSearchTerm) => {
  //   const variables = {
  //     skip: 0,
  //     limit: Limit,
  //     filters: Filters,
  //     searchTerm: newSearchTerm,
  //   };

  //   setSkip(0);
  //   setSearchTerms(newSearchTerm);

  //   getProducts(variables);
  // };

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2> Subastas</h2>
      </div>

      {/* Filter  */}

      {/* <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <CheckBox
            list={categorias}
            handleFilters={(filters) => handleFilters(filters, "categorias")}
          />
        </Col>
        <Col lg={12} xs={24}>
          <RadioBox
            list={price}
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </Col>
      </Row> */}

      {/* Search  */}
      {/* <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <SearchFeature refreshFunction={updateSearchTerms} />
      </div> */}
      {Auctions.length === 0 ? (
        <div
          style={{
            display: "flex",
            height: "300px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>No hay subastas en este momento</h2>
        </div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>{renderCards}</Row>
        </div>
      )}
      <br />
      <br />

      {/* {PostSize >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={onLoadMore}>Load More</button>
        </div>
      )} */}
    </div>
  );
};

export default CategoriyView;
