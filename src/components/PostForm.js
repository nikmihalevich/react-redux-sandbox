import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost } from "../store/actions/postsActions";
import { showAlert } from "../store/actions/appActions";
import Alert from "./Alert";

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
    };
  }

  submitHandler = (event) => {
    event.preventDefault();

    const { title } = this.state;

    if (!title.trim())
      return this.props.showAlert("Title post cannot be empty");

    const newPost = {
      title,
      id: Date.now().toString(),
    };

    this.props.createPost(newPost);
    this.setState({ title: "" });
  };

  changeHandler = (event) => {
    event.persist();
    this.setState((prevState) => ({
      ...prevState,
      ...{
        [event.target.name]: event.target.value,
      },
    }));
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        {this.props.alert && <Alert text={this.props.alert} />}

        <div className="form-group">
          <label htmlFor="title">Post title</label>
          <input
            className="form-control"
            id="title"
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.changeHandler}
          />
        </div>
        <button
          // disabled={!this.state.title.length}
          className="btn btn-success"
          type="submit"
        >
          Create
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = {
  createPost,
  showAlert,
};

const mapStateToProps = (state) => ({
  alert: state.app.alert,
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
