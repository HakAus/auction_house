import React, { useState } from "react";
import { Select } from "antd";

const { Option } = Select;

const CategorySelectors = ({
  categories,
  subcategories,
  setCategoryId,
  setSubcategoryId,
}) => {
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  const handleCategoryChange = (value) => {
    setCategoryId(value);
    // Se filtran las subcategorias
    setFilteredSubcategories(
      subcategories.filter((item) => {
        return item.idcategoria === Number(value);
      })
    );
  };

  const handleSubcategoryChange = (value) => {
    setSubcategoryId(value);
  };

  return (
    <>
      <table style={{ width: "100%", tableLayout: "fixed" }}>
        <td>
          <tr style={{ alignItems: "center" }}>
            <label>Categoría</label>
          </tr>
          <tr>
            <Select style={{ width: 300 }} onChange={handleCategoryChange}>
              {categories.map((category) => (
                <Option key={category.id}>{category.nombre}</Option>
              ))}
            </Select>
          </tr>
        </td>
        <td>
          <tr>
            <label style={{ marginVertical: 15 }}>Subcategoría</label>
          </tr>
          <tr>
            <Select style={{ width: 300 }} onChange={handleSubcategoryChange}>
              {filteredSubcategories.map((subcategory) => (
                <Option key={subcategory.id}>{subcategory.nombre}</Option>
              ))}
            </Select>
          </tr>
        </td>
      </table>
    </>
  );
};

export default CategorySelectors;
