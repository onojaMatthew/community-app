import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Button, Input, FormGroup } from "reactstrap";

const ChatHome = ({ match }) => {
  const [roomName, setRoom] = useState("");
  const [username, setName] = useState("");
  
  
    const roomList = [
      "Software Engineers",
      "General",
      "Sales",
      "Support",
      "Designers"
    ]
    return(
      <div>
        
          <Card style={{ height: "300px" }}>
            <CardBody>
              <h3>Join a chat room</h3>
              {/* {errMsg.length > 0 ? <p style={{ color: "#ff0000" }}>{errMsg}</p> : null} */}
              <FormGroup className="mr-sm-2">
                <Input 
                  type="text" 
                  onChange={(e) => setName(e.target.value)}
                  value={username}
                />
              </FormGroup>
              <FormGroup className="mr-sm-2">
                <Input 
                  type="select" 
                  onChange={(e) => setRoom(e.target.value)} 
                >
                  <option value="">Select a roomId</option>
                  {roomList.map((room, i) => (
                    <option key={i} value={room}>{room}</option>
                  ))}
                </Input>
              </FormGroup>
              <Link onClick={(e) => (!username || !roomName) ? e.preventDefault() : null} to={`${match.url}/messages?username=${username}&roomName=${roomName}`}>
                <Button color="primary">Send</Button>
              </Link>
            </CardBody>
          </Card>
      </div>
    )
}

export default ChatHome;