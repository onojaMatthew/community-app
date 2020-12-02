import { connect } from "react-redux";
import BusinessDevelopment from "../../../views/Business/BusinessDevelopment";

const mapStateToProps = (state) => ({...state});

const mapDispatchToProps = (dispatch) => {
  const dispatchToProps = {

  }
  return dispatchToProps;
}

const BusinessDev = connect(mapStateToProps, mapDispatchToProps)(BusinessDevelopment);

export default BusinessDev;