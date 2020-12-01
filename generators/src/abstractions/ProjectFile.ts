import fs from "fs";
import Mustache from "mustache";
import path from "path";
import process from "process";
import { Logger } from "./Logger";

export class ProjectFile {
  private static sharedTemplateData: any;
  private static outputDir: string;

  static createProjectDir(outputDir: string) {
    ProjectFile.outputDir = outputDir;
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
  }

  static setSharedTemplateData(data: any) {
    ProjectFile.sharedTemplateData = data;
  }

  private logger: Logger;
  private templateName: string;

  constructor(
    private path: string,
    private fileName: string,
    templateName?: string
  ) {
    this.logger = new Logger().setLabel(this.fileName);
    this.templateName = templateName || this.fileName;
  }

  private createFolders() {
    const directories = this.path.split("/");
    let outputDirTmp = ProjectFile.outputDir;

    if (outputDirTmp[outputDirTmp.length - 1] !== "/") {
      outputDirTmp += "/";
    }

    let baseDir = "";
    for (const directory of [...directories]) {
      if (directory) {
        const path = `${outputDirTmp}${baseDir}${directory}`;
        if (!fs.existsSync(path)) fs.mkdirSync(path);
        baseDir = `${baseDir}${directory}/`;
      }
    }
    baseDir = `${outputDirTmp}${baseDir}`;

    return { baseDirectory: baseDir, depth: directories.length };
  }

  private create() {
    const templateDir = path.join(__dirname, "..", "..", "templates");
    const templatePath = `${templateDir}/${this.templateName}.mu`;

    return new Promise((resolve, reject) => {
      fs.readFile(templatePath, "utf8", (err, template) => {
        if (err) {
          this.logger.error(`Template ${templatePath} not found.`, err);
          reject();
          return false;
        }

        const output = Mustache.render(
          template,
          ProjectFile.sharedTemplateData
        );

        fs.writeFile(this.getFilePath(), output, () => {
          this.logger.info(`CREATED "${process.cwd()}\\${this.getFilePath()}"`);
          resolve();
        });
      });
    });
  }

  private getFilePath() {
    return path.normalize(
      `${ProjectFile.outputDir}/${this.path}/${this.fileName}`
    );
  }

  async generate() {
    this.createFolders();
    await this.create();
  }
}
