import React from "react";

export default class Todo extends React.Component {
  render() {
    return (
      <div id="id-here" className="class-name">
        <div className="first-name second-name">
          <p id="_1" className="all"></p>
          <div id="nested" className="all"></div>
          <div className="all"></div>
          <div className="all"></div>
          <div className="all"></div>
          <div id="nested nested">
            <p id="_3" className="all">
              <p></p>
              <p id="_4" className="all"></p>
              <p id="_4" className="all"></p>
              <div className="all"></div>
              <p id="_4" className="all">
                <p id="_4" className="all"></p>
                <p id="_4" className="all"></p>
                <p id="_4" className="all"></p>
                <p id="_4" className="all">
                  <p id="_4" className="all"></p>
                  <p id="_4" className="all"></p>
                  <div id="deep_down" className="all">
                    <p id="_4" className="all">
                      <p id="_4" className="all"></p>
                    </p>
                  </div>
                </p>

                <p id="_4" className="all"></p>
                <p id="_last" className="all"></p>
                <p id="last" className="all"></p>
              </p>
            </p>
          </div>
        </div>
      </div>
    );
  }
};
