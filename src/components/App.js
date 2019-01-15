import React, { Component } from "react";
import Post from "./Post/Post";
import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import axios from "axios";

const api = "https://practiceapi.devmountain.com/api";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios.get(api + "/posts").then(response => {
      this.setState({ posts: response.data });
    });
  }

  updatePost(id, text) {
    axios.put(api + `/posts?id=${id}`, { text }).then(response => {
      this.setState({ posts: response.data });
    });
  }

  deletePost(id) {
    axios.delete(api + `/posts?id=${id}`).then(response => {
      this.setState({ posts: response.data });
    });
  }

  createPost(text) {
    axios.post(api + `/posts/`, { text }).then(response => {
      this.setState({ posts: response.data });
    });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {posts.map(post => (
            <Post
              key={post.id}
              text={post.text}
              date={post.date}
              id={post.id}
              updatePostFn={this.updatePost}
              deletePostFN={this.deletePost}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
