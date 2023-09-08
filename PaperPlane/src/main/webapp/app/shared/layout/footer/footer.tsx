import './footer.scss';

import React from 'react';

import { Col, Row } from 'reactstrap';

const Footer = () => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
          <p><a href="https://www.linkedin.com/in/brentcubbage1/" target = "_blank">Brent Cubbage</a>
        </p><p><a href="https://www.linkedin.com/in/margaret-snyder/" target = "_blank">Margaret Snyder</a>
                    </p><p><a href="https://www.linkedin.com/in/emmanuelmontales/" target = "_blank">Emmanuel Montales</a>
                                </p><p><a href="https://www.linkedin.com/in/dimaromaniv/" target = "_blank">Dmytro Romaniv</a>
                                            </p>
      </Col>
    </Row>
  </div>
);

export default Footer;
