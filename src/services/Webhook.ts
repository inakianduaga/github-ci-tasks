import { GenericWebhookEvent, PullRequestEvent } from './IWebhook.ts';

module Webhook {

  export class Webhook {

    private event: GenericWebhookEvent;

    constructor(event: GenericWebhookEvent) {
      this.event = event;
    }

    public pullRequest = {
      is: () => typeof this.event.pull_request !== undefined,
      getNumber: () => this.event.pull_request.number,
      isMerged: () => this.event.pull_request.merged,
      isClosed: () => this.event.pull_request.state === 'closed',
      isBaseMaster: () => this.event.pull_request.base.label === 'master',
    };

  }

}

export = Webhook;