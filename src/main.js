import { getInput, setOutput } from "@actions/core";
import { writeFileSync } from "fs";
import { renderFile } from "ejs";

function execute() {
  const templateFile = getInput("template-path", { required: true });
  const jsonData = getInput("json-data", { required: true });
  const outputFile = getInput("output-path");

  renderFile(templateFile, JSON.parse(jsonData), (error, result) => {
    if (error) {
      throw error;
    } else if (outputFile) {
      writeFileSync(outputFile, result);
    }

    setOutput("output", result);
  });
}

execute();
