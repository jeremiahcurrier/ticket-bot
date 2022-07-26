# ticket-bot

### Expected behavior

#### Phase 1
**When**: User in Slack uses Message Shortcut to open a modal to input and then submits the modal.
**Do**: Create a conversation in Intercom with a link to the Slack message where the Message Shortcut was used.

#### Phase 2:
**When**: Intercom conversation marked as closed.
**Do**: Thread a Slack message on the original Slack message/thread where the app was originally used to create the Intercom conversation.
