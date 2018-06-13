import React, { Component } from "react";
import { connect } from "react-redux";
import { Label, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";
import { getAccentColor, fetchFakeArticles } from "../Actions/article.Actions";
import Helmet from "react-helmet";
class HomeLayout extends Component {
  state = {};

  componentDidMount = () => {
    this.props.getAccentColor(this.props.accent);
    this.props.fetchFakeArticles();
    if (window.location.hostname !== "localhost") {
      ReactGA.set({ page: window.location.href });
      ReactGA.pageview(window.location.href);
    }
  };

  GotoPosts = () => {
    this.props.history.push("/articles");
  };

  render() {
    const headerStyle = {
      h1Small: {
        marginRight: "115px",
        fontFamily:"gesta !important",
        fontSize: "0.9rem"
      },
      h1Large: {
        marginRight: "115px",
        fontFamily: "gesta !important",
        fontSize: "2rem"
      },
      h2Small: {
        fontSize: "0.9rem",
        fontFamily: "gesta !important"
      },
      h2Large: {
        fontSize: "1.3rem",
        fontFamily: "gesta !important"
      },
      h3Small: {
        fontFamily: "gesta !important",
        fontSize: "0.8rem"
      },
      h3Large: {
        fontFamily: "gesta !important",
        fontSize: "1.2rem"
      }
    };

    return <div className="fade-in-top" style={{ height: window.innerHeight - 520, textAlign: "center" }}>
        <style>
          {
          "h1,h2,h3,h4,p{font-family: gesta !important;}"
          }
      </style>
      
        <h1 style={window.innerWidth > 850 ? headerStyle.h1Large : headerStyle.h1Small} className="sentence">
          Hi, I'm Mushfiqur Rahman. I am a&nbsp;<div className="fadeIn">
            <span> software developer.</span>
            <span> photographer.</span>
            <span> freelancer.</span>
            <span> tech geek.</span>
            <span> music enthusiast.</span>
          </div>
        </h1>

        <h2
          style={
            window.innerWidth > 850
              ? headerStyle.h2Large
              : headerStyle.h2Small
          }
        >
          I have been working on Web Application Development for more than
          five years.
        </h2>

        <h2
          style={
            window.innerWidth > 850
              ? headerStyle.h2Large
              : headerStyle.h2Small
          }
        >
          Once I started my career on ASP.NET Development but eventually
          switched everything to JavaScript.
        </h2>
        <h2 style={window.innerWidth > 850 ? headerStyle.h2Large : headerStyle.h2Small}>
          And I'm <Icon name="heart" color="red" />ing JavaScript everywhere now!
        </h2>
        <h3
          style={
            window.innerWidth > 850
              ? headerStyle.h3Large
              : headerStyle.h3Small
          }
        >
          You can read my articles.
        </h3>
        <Link to="/articles">
          <Label className="pulse Alegreya" color={this.props.accent}>
            See my articles
          </Label>
        </Link>
        <div>&nbsp;</div>
        <h3
          style={
            window.innerWidth > 850
              ? headerStyle.h3Large
              : headerStyle.h3Small
          }
        >
          You can view my photography.
        </h3>
        <Link target="_blank" to="https://photos.mushfiqweb.com/">
          <Label className="pulse Alegreya" color={this.props.accent}>
            my photography
          </Label>
        </Link>
        <div>&nbsp;</div>
        <h4 style={window.innerWidth > 850 ? headerStyle.h3Large : headerStyle.h3Small}>
          Check out the following app created using <Link target="_blank" to="https://github.com/facebookincubator/create-react-app" className="cool-link Alegreya">
            Create React App
          </Link>, <Link target="_blank" to="https://redux.js.org/" className="cool-link Alegreya">
            Redux
          </Link>, and <Link target="_blank" to="https://firebase.google.com/" className="cool-link Alegreya">
            Firebase
          </Link>.
        </h4>

        <Link target="_blank" to="https://mushfiqweb-todo.firebaseapp.com/">
          <Label className="pulse Alegreya" color={this.props.accent}>
            A Simple Todo App
          </Label>
        </Link>
      </div>;
  }
}
function mapStateToProps(state) {
  return {
    editorText: state.articleStore.editorText,
    accent: state.articleStore.AppAccentColor
  };
}
export default connect(
  mapStateToProps,
  { getAccentColor, fetchFakeArticles }
)(HomeLayout);
