import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";


import _ from "lodash";
import { emptyArticle, getAccentColor } from "./Actions/article.Actions";
import { connect } from "react-redux";
import Home from "./Pages/landingPage";
import ArticleDetails from "./Pages/ArticleDetails";
import TimeZone from "./Pages/TimeZone";
import ArticleViewer from "./Pages/ArticleViewer";
import AddArticle from "./Pages/article.Add";
import InstaFeed from "./Pages/InstaFeed";
import GithubTrends from "./Pages/Github.Trends";
import SocialMenu from "./Components/SocialMenu";
import SubscribeMe from "./Pages/Subscribe";
import TransitionablePortalExampleControlled from "./Pages/Transition.Portal";

class App extends Component {
  componentDidMount = () => {
    this.props.getAccentColor(this.props.AppAccentColor);
  };

  menuHandler = (e, data) => {
    switch (e.target.title) {
      case "Mushfiqur's Blog":
        this.setState({ activeItem: "" });
        this.props.emptyArticle();
        this.props.history.push("/");
        break;
      case "index":
        this.setState({ activeItem: "home" });
        this.props.emptyArticle();
        this.props.history.push("/");
        break;

      case "tweets":
        this.setState({ activeItem: "tweets" });
        this.props.history.push("/tweets");
        break;
      case "articleadd":
        this.setState({ activeItem: "articleadd" });
        this.props.history.push("/articleadd");
        break;
      case "All Articles":
        this.setState({ activeItem: "All Posts" });
        this.props.emptyArticle();
        this.props.history.push("/articles");
        break;
      case "JsCheatSheet":
        this.setState({ activeItem: "JsCheatSheet" });
        this.props.history.push("/JsCheatSheet");
        break;

      case "TypoGraphic":
        this.setState({ activeItem: "TypoGraphic" });
        this.props.history.push("/TypoGraphic");
        break;
      default:
        break;
    }
  };

  render() {
    const newMenu = {
      menuFixedRow: {
        borderBottom: "2px solid",
        borderBottomColor: this.props.AppAccentColor,
        boxShadow: "0px 3px 5px rgba(8, 7, 7, 0.2)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        left: "0",
        top: "0",
        position: "sticky",
        zIndex: "101",
        margin: "0",
        background: "#FFF",
        width: "100vw"
      },
      menuFixedColumn: {
        borderBottom: "2px solid",
        borderBottomColor: this.props.AppAccentColor,
        boxShadow: "0px 3px 5px rgba(8, 7, 7, 0.2)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        left: "0",
        top: "0",
        position: "sticky",
        zIndex: "101",
        margin: "0",
        background: "#FFF",
        width: "100vw"
      }
    };
    return (
      <div>
        <div
          style={
            window.innerWidth > 850
              ? newMenu.menuFixedRow
              : newMenu.menuFixedColumn
          }
        >
          <div
            title="Mushfiqur's Blog"
            className="item borderless menu-home pulse effect-shine link--ilin"
            onClick={this.menuHandler}
          >
            <span title="Mushfiqur's Blog">Mushfiqur's </span>{" "}
            <span
              title="Mushfiqur's Blog"
              style={{
                backgroundColor: "#2d2d2d",
                lineHeight: "30px",
                color: "#fff"
              }}
            >
              {" "}
              Blog{" "}
            </span>
          </div>

          <div
            title="All Articles"
            className="item borderless right menu-home-small pulse effect-shine"
            onClick={this.menuHandler}
          >
            All Articles
          </div>
        </div>

        <div
          className="ui container"
          style={{ minHeight: "80vh", marginTop: "10px" }}
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/how-to-keep-up-with-different-timezones-around-the-world" component={TimeZone} />
            <Route exact path="/articles" component={ArticleViewer} />
            <Route exact path="/articleadd" component={AddArticle} />
            <Route exact path="/InstaFeed" component={InstaFeed} />
            <Route exact path="/GithubTrends" component={GithubTrends} />
            <Route exact path="/Subscribe" component={SubscribeMe} />
            <Route exact path="/:articleUrl" component={ArticleDetails} />

          </Switch>
        </div>
        <SocialMenu accent={this.props.AppAccentColor} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    article: state.articleStore.article,
    AppAccentColor: state.articleStore.AppAccentColor
  };
}
export default connect(mapStateToProps, { emptyArticle, getAccentColor })(App);
