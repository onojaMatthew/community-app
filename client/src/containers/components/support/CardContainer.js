import { connect } from "react-redux";
import Card from "../../../views/Support/Card";

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  const dispatchProps = {

  }

  return dispatchProps;
}

const CardContainer = connect(mapStateToProps, mapDispatchToProps)(Card);

export default CardContainer;