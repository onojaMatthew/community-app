import { connect } from "react-redux";
import Portfolio from "../../../views/Portfolio/Portfolio";
import { createPortfolio, getPortfolio, updatePortfolio, deletePortfolio } from "../../../store/actions/actions_portfolio";

const mapStateToProps = (state) => {
  return {
    portfolio: state.portfolio
  }
}

const mapDispatchToProps = (dispatch) => {
  const dispatchProps = {
    createPortfolio: (data) => dispatch(createPortfolio(data)),
    getPortfolio: () => dispatch(getPortfolio()),
    updatePortfolio: (data) => dispatch(updatePortfolio(data)),
    deletePortfolio: (data) => dispatch(deletePortfolio(data))
  }

  return dispatchProps;
}

const PortfolioFile = connect(mapStateToProps, mapDispatchToProps)(Portfolio);

export default PortfolioFile;