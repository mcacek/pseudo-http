"use strict";

const meow = require("meow");
const inquirer = require("inquirer");
const profiles = require("./profiles");

const helpText = `
Options
	--profile, -p  Profile name
	--list,    -l  List profiles
	--port,    -P  Mock server port
`;
const options = {
  flags: {
    profile: {
      type: "string",
      alias: "p"
    },
    list: {
      alias: "l"
    },
    port: {
      type: "number",
      alias: "P"
    }
  }
};

module.exports.show = function() {
  return meow(helpText, options);
};

module.exports.promptForProfiles = function(config) {
  return profiles
    .list(config)
    .then(profiles => {
      const profileChoices = profiles.map(profile => {
        return {
          name: profile.value.label,
          value: profile
        };
      });

      const questions = [
        {
          type: "list",
          name: "profile",
          message: "Choose a profile",
          choices: profileChoices
        }
      ];

      return inquirer.prompt(questions);
    })
    .then(answers => answers.profile.value);
};

module.exports.listProfiles = function(config) {
  profiles.list(config).then(profiles => {
    if (profiles.length > 0) {
      profiles.forEach(profile =>
        console.log(`  * ${profile.value.label} (${profile.name})`)
      );
    } else {
      console.log("No profiles found.");
    }
  });
};
