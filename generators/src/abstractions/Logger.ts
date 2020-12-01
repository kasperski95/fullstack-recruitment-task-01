import Case from "case";
import { Logger as Winston, createLogger, format, transports } from "winston";
import { unlinkSync, existsSync } from "fs";
import path from "path";

export class Logger {
  private static fileName = "";
  private static rootDir = "";
  private static initialized = false;

  public static init(rootDir: string, fileName: string) {
    if (!Logger.initialized) {
      Logger.rootDir = rootDir;
      Logger.fileName = fileName;
      Logger.initialized = true;
    }
  }

  public static deleteFile() {
    if (Logger.initialized) {
      const filePath = path.format({
        dir: Logger.rootDir,
        base: Logger.fileName,
      });

      if (existsSync(filePath)) {
        unlinkSync(filePath);
      }
    } else {
      throw new Error(
        "(Logger) Class must be initialized to be able to delete the log file."
      );
    }
  }

  private logger: Winston;
  private label: string | null = null;

  constructor() {
    if (Logger.initialized) {
      this.logger = createLogger(this.getLoggerConfig());
    } else {
      throw new Error("(Logger) Class must be initialized.");
    }
  }

  public setLabel(label: string) {
    this.label = label;
    this.logger.configure(this.getLoggerConfig());
    return this;
  }

  public info(message: string, ...meta: any[]) {
    return this.logger.info(message, meta);
  }

  public warn(message: string, ...meta: any[]) {
    return this.logger.warn(message, meta);
  }

  public debug(message: string, ...meta: any[]) {
    return this.logger.debug(message, meta);
  }

  public error(message: string, error?: Error) {
    return this.logger.error(error ? `${message}\n\t` : message, error);
  }

  private getLoggerConfig() {
    return {
      transports: [
        new transports.File(this.getFileTransportOptions()),
        new transports.Console(this.getConsoleTransportOptions()),
      ],
    };
  }

  private getConsoleTransportOptions() {
    const colorizeFormat = format.colorize({ colors: { label: "gray" } });

    return {
      level: "info",
      format: format.combine(
        format.metadata(),
        format.printf((info) => {
          return (
            "[" +
            colorizeFormat.colorize(
              info.level,
              `${Case.constant(info.level)}`
            ) +
            "]" +
            colorizeFormat.colorize(
              "label",
              `${this.label ? ` (${this.label}) ` : " "}`
            ) +
            `${info.message}`
          );
        })
      ),
    };
  }

  private getFileTransportOptions() {
    const filePath = path.format({
      dir: Logger.rootDir,
      base: Logger.fileName,
    });

    return {
      filename: filePath,
      level: "silly",
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.errors({ stack: true }),
        format.label({ label: this.label }),
        format.simple()
      ),
    };
  }
}
