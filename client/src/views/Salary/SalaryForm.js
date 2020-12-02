import React from "react";
import { Input, Spinner, FormGroup, Button, } from "reactstrap";

const SalaryForm = ({ salary, salaryId, toggleIsUpdate, submitUpdate, amount, handleChange  }) => {
  return(
    <div>
      <tr>
        <td colSpan="4">
          <FormGroup className="mr-sm-2">
            <Input 
              type="text" 
              onChange={(e) => handleChange(e, "amount")} 
              value={amount}
              placeholder="New Salary Amount *"
              className="form-control"
            />
          </FormGroup>
        </td>
        <td>
          {salary.updateLoading === true ? <Spinner color="primary" /> : (
            <Button 
              color="success" 
              className="mr-sm-2"
              onClick={() => submitUpdate(salaryId)}
            >Save</Button>
          )}
        </td>
        <td>
        <Button
          color="primary"
          onClick={() => toggleIsUpdate()}
        >View</Button>
        </td>
        
      </tr>
    </div>
  )
}

export default SalaryForm;