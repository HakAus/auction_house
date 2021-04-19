import React, { Fragment, useState, useEffect } from "react";
import { Row,Card,Col } from 'antd';
import Icon from '@ant-design/icons';
import ImageSlider from './ImageSlider.js';
import CheckBox from './CheckBox';
import RadioBox from './RadioBox';
import { categorias, price } from './Datas';
import SearchFeature from './SearchFeature';

const { Meta } = Card;


const Dashboard = ({ setAuth }) => {


  const [alias, setAlias] = useState("");

  async function getAlias() {
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseResponse = await response.json();
      setAlias(parseResponse.alias);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getProducts(variables){

    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseResponse = await response.json();
      if (variables.loadMore) {
        setProducts([...Products, ...response.data.products])
      } else {
          setProducts(response.data.products)
      }
      setPostSize(response.data.postSize)
    } catch (err) {
      console.error(err.message);
      //Alert('Failed')
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
    getAlias();
    getProducts();
  }, []);

  const [Products, setProducts] = useState([])
  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(8)
  const [PostSize, setPostSize] = useState()
  const [SearchTerms, setSearchTerms] = useState("")
  const [Filters, setFilters] = useState({
    categorias: [],
    price: []
})

useEffect(() => {

  const variables = {
      skip: Skip,
      limit: Limit,
  }

  getProducts(variables)

}, [])



const onLoadMore = () => {
  let skip = Skip + Limit;

  const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true,
      filters: Filters,
      searchTerm: SearchTerms
  }
  getProducts(variables)
  setSkip(skip)
}


const renderCards = Products.map((product, index) => {

  return <Col lg={6} md={8} xs={24}>
      <Card
          hoverable={true}
          cover={<a href> <ImageSlider images /></a>}
      >
          <Meta
              title
              description
          />
      </Card>
  </Col>
});


const showFilteredResults = (filters) => {

  const variables = {
      skip: 0,
      limit: Limit,
      filters: filters

  }
  getProducts(variables)
  setSkip(0)

}

const handlePrice = (value) => {
  const data = price;
  let array = [];

  for (let key in data) {

      if (data[key]._id === parseInt(value, 10)) {
          array = data[key].array;
      }
  }
  console.log('array', array)
  return array
}

const handleFilters = (filters, category) => {

  const newFilters = { ...Filters }

  newFilters[category] = filters

  if (category === "price") {
      let priceValues = handlePrice(filters)
      newFilters[category] = priceValues

  }

  console.log(newFilters)

  showFilteredResults(newFilters)
  setFilters(newFilters)
}

const updateSearchTerms = (newSearchTerm) => {

  const variables = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm
  }

  setSkip(0)
  setSearchTerms(newSearchTerm)

  getProducts(variables)
}

  return (
    <Fragment>
      <h1>Dashboard</h1>
      <h2>Bienvenido, {alias} </h2>
      <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>  Vamoh a subastar!  <Icon type="rocket" />  </h2>
            </div>


            {/* Filter  */}

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24} >
                    <CheckBox
                        list={categorias}
                        handleFilters={filters => handleFilters(filters, "categorias")}
                    />
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox
                        list={price}
                        handleFilters={filters => handleFilters(filters, "price")}
                    />
                </Col>
            </Row>


            {/* Search  */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>

                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />

            </div>


            {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>

                        {renderCards}

                    </Row>


                </div>
            }
            <br /><br />

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onLoadMore}>Load More</button>
                </div>
            }


        </div>
      <button className="btn btn-primary" onClick={(e) => logout(e)}>
        Cerrar sesión
      </button>
    </Fragment>
  );
          }

export default Dashboard;
