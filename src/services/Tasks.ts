import { Webhook as WebhookEvent } from "./Webhook.ts";
import { IIssue } from "./IWebhook";
import { pullRequestClient } from "./Api";
import bluebird = require('bluebird');

module Tasks {

  /**
   * Webhook-related tasks
   */
  class Webhook {

    private webhookEvent: WebhookEvent;

    constructor(webhookEvent: WebhookEvent, signature: string) {
      this.webhookEvent = webhookEvent;

      //TODO: Check event payload sha (Json stringify the payload and compare sha with secret to signature)
      //If this fails, run sendOutput(0, 1) and exit process
    }

    shouldDeployOnPR(webhook: WebhookEvent): any {

      const DEPLOY_LABEL = process.env.PULL_REQUEST_DEPLOY_LABEL;
      let pr = this.webhookEvent.pullRequest;

      // Webhook event must be a PR, merged to master & closed
      if (!pr.is() || !pr.isMerged() || !pr.isBaseMaster() || !pr.isClosed() ) {
        return sendOutput(0);
      }

      // Find if the PR has the deploy label
      return pullRequestClient()
        .fetch(pr.getNumber())
        .then((response: IIssue) =>
          response
            .labels
            .filter(label => label.name === DEPLOY_LABEL)
            .length > 0
        )
        .then(hasDeployLabel => sendOutput(hasDeployLabel ? 1 : 0));
    }

  }





  function sendOutput(output:number, error: boolean = false) {
    console.log(output);
    process.exit(error ? 1 : 0);
  }



}

export = Tasks;