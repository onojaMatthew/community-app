import { connect } from "react-redux";
import ChatRoom from "../../../views/Chat/ChatRoom";
import { createChatRoom, getChatRoom, deleteChatRoom } from "../../../store/actions/actions_chatRoom";

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = (dispatch) => {
  const dispatchToProps = {
    createChatRoom: (data) => dispatch(createChatRoom(data)),
    getChatRoom: () => dispatch(getChatRoom()),
    deleteChatRoom: (roomId) => dispatch(deleteChatRoom(roomId))
  }

  return dispatchToProps;
}

const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(ChatRoom);

export default ChatContainer;