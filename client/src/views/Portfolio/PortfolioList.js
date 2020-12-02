import React from 'react';
import { Table, Spinner } from 'reactstrap';
import moment from "moment";

const PortfolioList = ({portfolio}) => {
  const portfolios = portfolio.portfolios && portfolio.portfolios;
  return (
    <Table dark>
      <thead>
        <tr>
          <th>S/N</th>
          <th>Portfolio</th>
          <th>Created by</th>
          <th>Date created</th>
        </tr>
      </thead>
      <tbody>
        {portfolio.getLoading === true ? <Spinner color="primary" /> : portfolios && portfolios.length > 0 ? portfolios.map((p,i) => (
          <tr key={p._id}>
            <th scope="row">{i + 1}</th>
            <td>{p.name}</td>
            <td>{p.createdBy && p.createdBy.firstName} {p.createdBy && p.createdBy.lastName}</td>
            <td>{moment(p.createdAt).format("DD/MM/YYYY")}</td>
          </tr>
        )) : <tr><td>Record is empty</td></tr>}
        
       
      </tbody>
    </Table>
  );
}

export default PortfolioList;
