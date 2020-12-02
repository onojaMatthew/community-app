import React from "react";
import { Table } from "reactstrap";

const CategoryList = ({ categories }) => {
  return (
    <Table className="table table-strip">
      <thead style={{
        color: "green"
      }}>
        <tr>
          <th colSpan="30">Category</th>
        </tr>
      </thead>
      <tbody>
        {categories.length > 0 ? categories.map(category => {
          const color = category.name === "Help" ? 
          "green": category.name === "Developers" ?
          "#ED5656" : category.name === "Community and Events" ?
          "#08c" : category.name === "Ideas and Feedback" ? 
          "#345b9d" : category.name === "OjirehPrime Chat" ?
          "#99BDA9" : category.name === "Gererals" ?
          "#E9D09A" : category.name === "Financial Chats" ?
          "#ff0000" : "#000";
          return (
          // !categories.length === 0 ? "Record is empty" : (
            <tr style={{
              paddingTop: "50px !important"
            }}
            >
              <td colSpan="30" style={{
                borderLeft: `6px solid ${color}`
              }}>
                <h4 style={{
                  fontWeight: "bold"
                }}>{category.name}</h4>
                <p style={{
                  color: "#345b9d",
                  fontSize: 14
                }}>{category.description}</p>
              </td>
            </tr>
          )
            }) : "No records found" }
      </tbody>
    </Table>
  )
}

export default CategoryList;