import { combineReducers } from "redux";
import account from "./reducers_account";
import users from "./reducers_user";
import query from "./reducers_query";
import portfolio from "./reducers_portfolio";
import category from "./reducers_category";
import salary from "./reducers_salary";
import task from "./reducers_task";
import room from "./reducer_chatRoom";
import community from "./reducers_community";
import topic from "./reducers_topic";
import chat from "./reducers_chat";
import topicCategory from "./reducers_community_category";

const rootReducer = combineReducers({
  account,
  users,
  query,
  portfolio,
  category,
  salary,
  task,
  room,
  community,
  topic,
  chat,
  topicCategory,
});

export default rootReducer;