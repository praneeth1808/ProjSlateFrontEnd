import React, { Component } from "react";
import PropTypes from "prop-types";
import Tab from "./Tab";

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
    data: PropTypes.any,
  };
  constructor(props) {
    super(props);

    this.state = {
      // activeTab: this.props.children[0].props.label,
      data: this.props.data,
    };
  }
  decideActiveTab = (data) => {
    if (data.CurrentProcess) {
      if (data.CurrentProcess.Action == "SwitchTab") {
        if (this.state.activeTab != data.CurrentProcess.value) {
          this.setState({
            activeTab: data.CurrentProcess.value,
            updatedCurrentTab: 1,
          });
        }
      }
    }
  };
  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const {
      onClickTabItem,
      decideActiveTab,
      props: { children, data, activeTab, setActiveTab },
      // state: { activeTab },
    } = this;
    decideActiveTab(data);
    return (
      <div style={{ width: window.innerWidth }}>
        <ol className="tab-list">
          {children.map((child) => {
            const { label } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={setActiveTab}
              />
            );
          })}
        </ol>
        <div className="tab-content">
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;
