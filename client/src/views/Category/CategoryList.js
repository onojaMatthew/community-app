import React from "react";
import { Table, Spinner, Button } from 'reactstrap';
import moment from "moment";

const CategoryList = ({ category, handleDelete, categories}) => {
  return (
    <div>
      <h4>Partnership categories</h4>
      <Table dark>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Created by</th>
            <th>Date created</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {category.getCategoryLoading === true ? <Spinner color="primary" /> : categories && categories.length > 0 ? categories.map((c,i) => (
            <tr key={c._id}>
              <th scope="row">{i + 1}</th>
              <td>{c.name}</td>
              <td>{c.createdBy && c.createdBy.firstName} {c.createdBy && c.createdBy.lastName}</td>
              <td>{moment(c.createdAt).format("DD/MM/YYYY")}</td>
              <td>
                {category.deleteCategoryLoading === true ? <Spinner color="primary" /> : (
                  <Button color="danger" onClick={() => handleDelete(c._id)}>Delete</Button>
                )}
              </td>
            </tr>
          )) : <tr><td>Record is empty</td></tr>}
        </tbody>
      </Table>
    </div>
    
  )
}

export default CategoryList;