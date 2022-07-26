const { WorkflowStep } = require('@slack/bolt');
// ---------------> generalize unique piece

const ws = new WorkflowStep('add_task_xyz', {
    edit: async ({ ack, step, configure }) => {
        console.log("lab8-wfstep edit: ",  step);
        await ack();

        let emptyInputs = Object.entries(step.inputs).length === 0;
        console.log('emptyInputs');
        console.log(emptyInputs);
        console.log(step.inputs);

        // const blocks = [
        let blocks = [
          {
            type: 'input',
            block_id: 'requestor_input',
            element: {
                type: 'plain_text_input',
                action_id: 'requestor',
                placeholder: {
                    type: 'plain_text',
                    text: 'Add a requestor',
                },
                initial_value: (emptyInputs) ? 'no value set yet 1' : step.inputs.requestor.value
            },
            label: {
                type: 'plain_text',
            text: 'Custom text 1',
            },
          },  
          {
                type: 'input',
                block_id: 'task_name_input',
                element: {
                    type: 'plain_text_input',
                    action_id: 'name',
                    placeholder: {
                        type: 'plain_text',
                        text: 'Add a task name',
                    },
                    initial_value: (emptyInputs) ? 'no value set yet 2' : step.inputs.taskName.value
                },
                label: {
                    type: 'plain_text',
                text: 'Custom text 2',
                },
            },
            {
                type: 'input',
                block_id: 'task_description_input',
                element: {
                    type: 'plain_text_input',
                    action_id: 'description',
                    placeholder: {
                        type: 'plain_text',
                        text: 'Add a task description',
                    },
                    initial_value: (emptyInputs) ? 'no value set yet 3' : step.inputs.taskDescription.value
                },
                label: {
                    type: 'plain_text',
                    text: 'Custom text 3',
                },
            },
            {
              type: 'input',
              block_id: 'assigned_to_input',
              element: {
                  type: 'plain_text_input',
                  action_id: 'assigned_to',
                  placeholder: {
                      type: 'plain_text',
                      text: 'Add assigned to user',
                  },
                initial_value: (emptyInputs) ? 'no value set yet 4' : step.inputs.assignedTo.value
              },
              label: {
                  type: 'plain_text',
                  text: 'Custom text 4',
              },
            }
        ];

        let blocksQuip = [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "This step adds a new row to a spreadsheet.\n\n *Connected account*"
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "Name + Email of connected account"
                        },
                        "accessory": {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Change",
                                "emoji": true
                            },
                            "value": "click_me_123",
                            "action_id": "button-action"
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Select a spreadsheet*"
                        },
                        "accessory": {
                            "type": "static_select",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "Spreadsheet",
                                "emoji": true
                            },
                            "options": [
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "*example 1*",
                                        "emoji": true
                                    },
                                    "value": "value-0"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "*example 2*",
                                        "emoji": true
                                    },
                                    "value": "value-1"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "*example 3*",
                                        "emoji": true
                                    },
                                    "value": "value-2"
                                }
                            ],
                            "action_id": "static_select-action"
                        }
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Sheet*"
                        },
                        "accessory": {
                            "type": "static_select",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "Sheet",
                                "emoji": true
                            },
                            "options": [
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "*this is plain_text text*",
                                        "emoji": true
                                    },
                                    "value": "value-0"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "*this is plain_text text*",
                                        "emoji": true
                                    },
                                    "value": "value-1"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "*this is plain_text text*",
                                        "emoji": true
                                    },
                                    "value": "value-2"
                                }
                            ],
                            "action_id": "static_select-action"
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "`This is where each column will appear to configure... etc`"
                        }
                    }
                ];

        // blocks = blocksQuip; // uncomment this line to preview another style of modal
        await configure({ blocks });
    },
    save: async ({ ack, step, view, update }) => {
        console.log("lab8-wfstep save: ",  step);
        await ack();

        const { values } = view.state;
        const requestor = values.requestor_input.requestor;
        const taskName = values.task_name_input.name;
        const taskDescription = values.task_description_input.description;
        const assignedTo = values.assigned_to_input.assigned_to;

        const inputs = {
            requestor: { value: requestor.value },
            taskName: { value: taskName.value },
            taskDescription: { value: taskDescription.value },
            assignedTo: { value: assignedTo.value },
        };

        const outputs = [
            {
              type: 'text',
              name: 'requestor',
              label: 'Requestor',
            },
            {
                type: 'text',
                name: 'taskName',
                label: 'Task name',
            },
            {
                type: 'text',
                name: 'taskDescription',
                label: 'Task description',
            },
            {
              type: 'text',
              name: 'assignedTo',
              label: 'Assigned to',
            }
        ];

        console.log("lab8-wfstep save input: ", inputs)

        await update({ inputs, outputs });
    },
    execute: async ({ step, complete, fail }) => {
        console.log("lab8-wfstep execute: ",  step);
        const { inputs } = step;

        const outputs = {
            requestor: inputs.requestor.value,
            taskName: inputs.taskName.value,
            taskDescription: inputs.taskDescription.value,
            assignedTo: inputs.assignedTo.value,
        };

        console.log("lab8-wfstep execute output: ", outputs);

        // do work with 3rd party system here
        //...
        //...

        // if everything was successful
        await complete({ outputs });

        // if something went wrong
        // fail({ error: { message: "Just testing step failure!" } });
    },
});

module.exports = {
    WFStep: ws
};
