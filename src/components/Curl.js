import _ from "lodash";
import { from, Subject } from "rxjs";

class Curl {
  constructor() {
    this.headers = new Array();
    this.body = "";
    this.url = "";
    this.response = "";
    this.state = from([""]);
  }
  parse(args) {
    let argsMap = this.retreiveArgs(args);
  }
  retreiveArgs(args) {
    let argsMap = new Array();
    args.replace(
      /([^' \t\n]+|'[^']*')\s([^' \t\n]+|'[^']*')/g,
      ($0, param, value) => {
        argsMap.push({ param, value });
      }
    );
    return argsMap;
  }

  retreiveUrl(args) {
    if (!args || args == undefined) return null;
    return args.match(/(https|http):\/\/[\w]+[.|\w|\/]*/g);
  }
  retreiveHeaders(argsMap) {
    return this.retreiveArgument(argsMap, "-H");
  }
  retreiveBody(argsMap) {
    return this.retreiveArgument(argsMap, "-d");
  }
  retreiveMethod(argsMap) {
    return this.retreiveArgument(argsMap, "-X");
  }
  retreiveArgument(argsMap, paramName) {
    if (!argsMap || !paramName) return null;
    return _.map(_.filter(argsMap, ["param", paramName]), "value");
  }

  httpCallAsync(url, method, body, callback) {
    let xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    };
    xmlHttp.open(method, url, true); // true for asynchronous

    if (this.headers) {
      this.headers.forEach(h => {
        var header = h.split(":");
        xmlHttp.setRequestHeader(header[0], header[1]);
      });
    }

    xmlHttp.send(body);
  }

  doPost(callback) {
    this.httpCallAsync(this.url, "POST", this.body, callback);
  }

  doGet(callback) {
    this.httpCallAsync(this.url, "GET", this.body, callback);
  }

  call(args, callback) {
    let argsMap = this.retreiveArgs(args);
    let method = _.toUpper(_.trim(this.retreiveMethod(argsMap)));
    this.headers = this.retreiveHeaders(argsMap);
    this.body = this.retreiveBody(argsMap);
    this.url = this.retreiveUrl(args);

    switch (method) {
      case "POST":
        this.doPost(callback);
        break;
      default:
        this.doGet(callback);
        break;
    }

    return this.response;
  }
}

export default Curl;
