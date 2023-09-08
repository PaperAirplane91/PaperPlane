import './footer.scss';

import React from 'react';

import { Col, Row } from 'reactstrap';

const Footer = () => (
  <div className="footer page-content">
 &nbsp;
    <Row>
      <Col md="12">
          <p>
          &emsp;
          &emsp;
          &emsp;
          &emsp;
          &emsp;
          &emsp;
          <a href="https://www.linkedin.com/in/brentcubbage1" target = "_blank">Brent Cubbage</a>
          <span className="tab"></span>
          <a href="https://www.linkedin.com/in/margaret-snyder" target = "_blank">Margaret Snyder</a>
          <span className="tab"></span>
          <a href="https://www.linkedin.com/in/emmanuelmontales" target = "_blank">Emmanuel Montales</a>
          <span className="tab"></span>
          <a href="https://www.linkedin.com/in/dimaromaniv" target = "_blank">Dmytro Romaniv</a>
          </p>
      </Col>
    </Row>
  </div>
);

export default Footer;
