import React, { Component } from 'react';
import moment from "moment";
import { Button, Form, FormGroup, Label, Input, Table, Card, CardBody, Spinner } from 'reactstrap';

export default class ChatRoom extends Component{
  state = {
    name: "",
    isOpen: false,
    message: "",
    errMsg: ""
  }

  async componentDidMount() {
    const { getChatRoom } = this.props;
    await getChatRoom();
  }

  componentDidUpdate(prevProps, nextProps) {
    const { room } = this.props;
    if (this.props.room && this.props.room !== prevProps.room) {
      if (room.error && room.error.length > 0) {
        this.setState({
          errMsg: room.error
        })
      } else if (room.postSuccess === true) {
        this.setState({
          message: "Room created successfully"
        });
      } else if (room.deleteSuccess === true) {
        this.setState({
          message: "Room successfully deleted"
        });
      }
    }
  }

  handlechange = (e, name) => {
    this.setState({ 
      message: "",
      errMsg: ""
    });

    let fields = this.state;
    fields[name] = e.target.value;
    this.setState({ fields });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { createChatRoom } = this.props;
    const { name } = this.state;
    const data = { name };
    await createChatRoom(data);
  }

  deleteRoom = async (roomId) => {
    const { deleteChatRoom } = this.props;
    await deleteChatRoom(roomId);
  }

  render() {
    const { errMsg, message, isOpen } = this.state;
    const { room } = this.props;
    const rooms = room.rooms && room.rooms;
    return (
      <Card>
        <CardBody>
          {message.length > 0 ? <p style={{ color: "#00ff00", fontSize: 20 }}>{message}</p> : null}
          {errMsg.length > 0 ? <p style={{ color: "#ff0000", fontSize: 20 }}>{errMsg}</p> : null}
          {isOpen === true ? (
            <>
              <h3>All Chat Room</h3>
              <Table dark>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Name</th>
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {room.getLoading === true ? <Spinner color="primary" /> : rooms && rooms.length > 0 ? rooms.map((r,i) => (
                    <tr key={r._id}>
                      <th scope="row">{i + 1}</th>
                      <td>{r.name}</td>
                      <td>{moment(r.createdAt).format("DD/MM/YYYY")}</td>
                      {room.deleteLoading === true ? <Spinner color="primary" /> : (
                        <td><Button color="danger" onClick={() => this.deleteRoom(r._id)}>Delete</Button></td>
                      )}
                    </tr>
                  )) : <tr><td>Record is empty</td></tr>}
                </tbody>
              </Table>
            </>
          ) : (
            <Form onSubmit={(e) => this.handleSubmit(e)}>
              <FormGroup>
                <Label for="exampleSelect">Chat Room Name:</Label>
                <Input placeholder="Enter a name" onChange={(e) => this.handlechange(e, "name")} type="text" id="exampleSelect" />
              </FormGroup>
              {room.postLoading === true ? <Spinner color="primary" /> : (
                <Button color="primary">Send</Button>
              )}
            </Form>
          )}
          
          <hr />
          {isOpen === true ? 
            <p 
              onClick={() => this.setState({ isOpen: false })}
              style={{ color: "skyblue", fontSize: 20, float: "right", cursor: "pointer" }}
            >Click to create new chat rooms</p> : 
            <p 
              onClick={() => this.setState({ isOpen: true })}
              style={{ float: "right", color: "skyblue", fontSize: 20, cursor: "pointer" }}
            >Click to view chat rooms</p>
          }
        </CardBody>
      </Card>
    );
  }
  
}