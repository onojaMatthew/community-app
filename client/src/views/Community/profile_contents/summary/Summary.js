import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";

const styles = {
  spanText: {
    color: "#5e86c9"
  }
}
const Summary = () => {
  return (
    <div>
      <h4>
        <strong>Stats</strong>
      </h4>
      <Row>
        <strong>10</strong> <span style={ styles.spanText }>days visited</span> <strong>10</strong>  <span style={ styles.spanText }>days visited</span>

        

      </Row>
    </div>
  );
}

export default Summary;