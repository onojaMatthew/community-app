import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { Container, Row, Col, Form, FormGroup, Input, Spinner } from "reactstrap";
import Plus from "../../assets/img/plus.jpeg";
import Topic from "./Topic";
import { localStorageAuth } from "../../helper/authenticate";
import { createTopic, getTopics, getByCategory } from "../../store/actions/actions_topic";
import TopicList from "./TopicList";
import CategoryList from "./CategoryList";
import { getChatCategory } from "../../store/actions/actions_community_category";
import AllTopic from "./AllTopic";



class Home extends Component{
  state = {
    modal: false,
    categories: [
      "Help",
      "Our Mobile App",
      "News and Updates",
      "Feedback and Ideas",
      "What are we working On?",
      "General Views",
      "Financial Chats"
    ],
    title: "",
    category: "",
    text: "",
    errMsg: "",
    message: "",
    changeView: false
  }

  async componentDidMount() {
    const { getTopics, getChatCategory } = this.props;
    await getTopics();
    await getChatCategory()
  }

  componentDidUpdate(prevProps, nextProps) {
    const { topic } = this.props;

    if (this.props.topic && this.props.topic !== prevProps.topic) {
      if (topic.error) {
        this.setState({ errMsg: topic.error });
      } else if (topic.success === true) {
        this.setState({ 
          message: "Topic created successfully!",
          title: "",
          category: "",
          text: "",
        });
      } else if (topic.categorySuccess === true) {
        this.setState({ changeView: true });
      } 
    }
  }

  handleChange = (e, name) => {
    this.setState({
      errMsg: "",
      message: ""
    });

    let fields = this.state;
    fields[name] = e.target.value;
    this.setState({ fields });
  }

  onCreateTopic = async (e) => {
    e.preventDefault();
    const { createTopic } = this.props;
    const { title, category, text } = this.state;
    const data = { title, category, text };

    await createTopic(data);
  }

  toggleModal = () => {
    const token = localStorageAuth().token;
    if (!token) {
      this.props.history.push("/community_login");
    }
    this.setState((prevState) => ({ modal: !prevState.modal }))
  }

  handleCategoryChange = async (e, name) => {
    const { getByCategory } = this.props;
    this.setState({ [name]: e.target.value }, () => getByCategory(this.state.category));
  }




  render() {
    const { 
      categories,
      title,
      category,
      text,
      errMsg,
      message,
    } = this.state;
      
    const { topic, topicCategory } = this.props;
    const topicList = topic.topics && topic.topics;
    const cat = topicCategory.categories && topicCategory.categories;
    return (
      <div>
        <Header />
        <Container className="mt-3">
          <Row>
            <Col xs="7" xl="6">
              <Row className={
                navigator.userAgent.match(/Android/i) ? "ml-2" :
                navigator.userAgent.match(/webOS/i) ? "ml-2" :
                navigator.userAgent.match(/iPhone/i)  ? "ml-2" :
                navigator.userAgent.match(/iPad/i)  ? "ml-2" :
                navigator.userAgent.match(/iPod/i)  ? "ml-2" :
                navigator.userAgent.match(/BlackBerry/i)  ? "ml-2" :
                navigator.userAgent.match(/Windows Phone/i) ? "ml-2" : "ml-0"}>
                <Form inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="select" 
                      style={{
                        background: "#fff !important",
                        color: "#333",
                        border: "1px solid green",
                        borderRadius: 0,
                      }}
                      value={this.state.category}
                      onChange={(e) => this.handleCategoryChange(e, "category")}
                    >
                      {cat.map(category => (
                        <option value={category._id}>{category.name}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Form>
              </Row>
            </Col>
            <Col xs="5" xl="6">
              <span 
                style={{
                  background: "#fff",
                  padding: 8,
                  border: "1px solid green",
                  cursor: "pointer",
                  paddingLeft: 10,
                  paddingRight: 10
                }}
                onClick={() => this.toggleModal()}
              >
                <img style={{
                  width: 20
                }} src={Plus} alt=""/> 
                New Topic
              </span>
            </Col>
          </Row>
        </Container>
        <div>
          
          {this.state.changeView === true ? (
            <Container className="mt-3">
              <AllTopic topic={topic} topicList={topicList} />
            </Container>
          ) : (
          <Container className="mt-3">
            

            <Row className="mt-3">
              <Col xs="12" xl="6">
                {topicCategory.loading === true ? (
                  <div className="text-center">
                    <Spinner color="primary" /> Loading...
                  </div>
                ) : (
                  <CategoryList topicCategory={topicCategory} categories={cat} />
                )}
              </Col>
              <Col xs="12" xl="6">
                <TopicList topicList={topicList} />
              </Col>
            </Row>
          </Container>
          )}
          <Row>
            <Topic 
              categories={categories} 
              modal={this.state.modal} 
              toggleModal={this.toggleModal}
              onCreateTopic={this.onCreateTopic}
              handleChange={this.handleChange}
              errMsg={errMsg}
              message={message}
              title={title}
              category={category}
              text={text}
              topic={topic}
              topicCategories={cat}
            />
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ ...state });
const mapDispatchToProps = (dispatch) => {
  const dispatchProps = {
    createTopic: (data) => dispatch(createTopic(data)),
    getTopics: () => dispatch(getTopics()),
    getChatCategory: () => dispatch(getChatCategory()),
    getByCategory: (category) => dispatch(getByCategory(category))
  }

  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);