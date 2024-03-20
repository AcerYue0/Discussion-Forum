import React from "react";
import Joi from "joi-browser";
import { ToastContainer, toast } from "react-toastify";
import Input from "./common/input";
import Form from "./common/form";
import http from "../services/httpService";
import { api } from "../config.js";
import { createpost } from "../services/postService";

class NewPost extends Form {
  state = {
    data: { Content: "", tags: [] },
    errors: { Content: "", tags: [] },
    tags: [],
  };
  schema = {
    Content: Joi.string().required().min(10).label("Content"),
    tags: Joi.array(),
  };
  handleTagChange = (tagID) => {
    console.log("hello");
    let data = this.state.data;
    const newtags = data.tags;
    const index = newtags.indexOf(tagID);
    if (index === -1) newtags.push(tagID);
    else newtags.splice(index, 1);
    data = {
      Content: data.Content,
      tags: newtags,
    };
    console.log(data);
    this.setState({ data });
  };
  async componentDidMount() {
    let tags = await http.get(api.tagsEndPoint);
    try {
      this.setState({ tags: tags.data });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("Post Validation Failed!");
      }
    }
  }
  // TODO: get login session to get submit author
  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { response } = await createpost(user, data, crypto.randomBytes(10).toString('hex'), 0);
      console.log(response);
      window.location = "/dashboard";
    } catch (ex) {}
  };
  render() {
    const { data, errors, tags } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="container-lg">
          <h1 className="text-center m-2">Create a New Discussion</h1>
          <div
            className="container m-4 p-4 rounded"
            style={{ backgroundColor: "#F1F1F1" }}
          >
            <form onSubmit={this.handleSubmit}>
              <Input
                value={data.Content}
                onChange={this.handleChange}
                label="Question"
                name="Question"
                type="text"
                error={errors.Content}
              />
              <div className="form-group">
                <label htmlFor="tags">Related Tags</label>
                <br />
                {tags.map((tag) => (
                  <React.Fragment>
                    <label className="mr-3 ml-3">
                      <input
                        key={tag._id}
                        className="form-check-input"
                        type="checkbox"
                        onChange={() => this.handleTagChange(tag._id)}
                      />
                      {tag.name}
                    </label>
                  </React.Fragment>
                ))}
                {errors.tags && <div className="alert-info">{errors.tags}</div>}
              </div>
              <div className="text-center">
                <button
                  className="btn btn-primary mt-4"
                  disabled={this.validate()}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NewPost;
