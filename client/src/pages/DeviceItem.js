import React from "react";
import { Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";

const DeviceItem = ({ device }) => {
  const navigate = useNavigate()
  const imageURL = `${process.env.REACT_APP_API_URL}/${device.img}`;
  return (
    <Col
      md={3}
      className={"mt-3"}
      onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
    >
      <Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
        <Image
          width={150}
          height={150}
          src={imageURL}
        />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          {device.brand ? device.brand.name : "Mobilnik"}
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
