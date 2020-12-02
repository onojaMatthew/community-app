import React from "react";
import { Table, Spinner, Button } from 'reactstrap';
import moment from "moment";
import SalaryForm from "./SalaryForm";

const SalaryList = ({salary, isUpdate, salaryId, toggleIsUpdate, submitUpdate,handleDelete, amount, handleChange }) => {
  const salaryList = salary.salaries && salary.salaries;
  return(
    <Table dark>
      <thead>
        <tr>
          <th>S/N</th>
          <th>Portfolio</th>
          <th>Amount</th>
          <th>Created by</th>
          <th>Date created</th>
          <th>Review</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {salary.getLoading === true ? <Spinner color="primary" /> : salaryList && salaryList.length > 0 ? salaryList.map((p,i) => (
          isUpdate === true && salaryId === p._id ? (
            <SalaryForm
              salary={salary}
              toggleIsUpdate={toggleIsUpdate}
              salaryId={p._id}
              amount={amount}
              handleChange={handleChange}
              submitUpdate={submitUpdate}
            />
          ) : 
          (
          <tr key={p._id}>
            <th scope="row">{i + 1}</th>
            <td>{p.portfolio}</td>
            <td>{p.amount}</td>
            <td>{p.createdBy && p.createdBy.firstName} {p.createdBy && p.createdBy.lastName}</td>
            <td>{moment(p.createdAt).format("DD/MM/YYYY")}</td>
            <td>
              <Button 
                color="primary"
                onClick={() => toggleIsUpdate(p._id)}
              >
                Review Salary
              </Button></td>
            <td>
              {salary.deleteLoading === true ? <Spinner color="primary" /> : (
                <Button color="danger" onClick={() => handleDelete(p._id)}>Delete</Button>
              )}
            </td>
          </tr>
          )
        )) : <tr><td>Record is empty</td></tr>}
      </tbody>
    </Table>
  )
}

export default SalaryList;