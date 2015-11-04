/// <reference path="../../typings/tsd.d.ts" />
import { IIssue } from "./IWebhook";
import bluebird = require('bluebird');
let octonode = require("octonode");

module Api {

  interface IClient {
    me: Function,
    user: Function,
    repo: Function,
    org: Function,
    issue: Function,
    milestone: Function,
    label: Function,
    pr: Function,
    release: Function,
    gist: Function,
    team: Function,
    notification: Function,
  }

  const credentials = {
    organization: process.env.GITHUB_ORGANIZATION,
    repo: process.env.GITHUB_REPO,
    username: process.env.GITHUB_USERNAME,
    password: process.env.GITHUB_PASSWORD
  }

  class ApiClient {
    static new(): IClient {
      return octonode.client({
        username: credentials.username,
        password: credentials.password
      });
    }
  }

  class PullRequest {

    /**
     * http://bluebirdjs.com/docs/anti-patterns.html#explicit-construction-anti-pattern
     */
    public fetch = (number: number): bluebird.Thenable<any> => {

      let wrap = (number: number, callback) => {
        return ApiClient.new().pr(`${credentials.organization}/${credentials.repo}`, number).info(callback);
      }

      return bluebird.promisify(wrap);

      // return ApiClient.new().pr(`${credentials.organization}/${credentials.repo}`, number).info(callback);
    }

    // public fetch = (number: number) => bluebird.fromNode(this.fetchCallback);

  }

  export function pullRequestClient() {
    return new PullRequest()
  }


}

export = Api;