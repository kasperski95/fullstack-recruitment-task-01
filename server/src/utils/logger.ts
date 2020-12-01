import Case from 'case';
import { existsSync, unlinkSync } from 'fs';
import path from 'path';
import { injectable } from 'tsyringe';
import { Logger as ORMLogger } from 'typeorm';
import { createLogger, format, Logger as Winston, transports } from 'winston';

@injectable()
export class Logger implements ORMLogger {
  private static fileName = '';
  private static rootDir = '';
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
        ext: '',
        name: '',
        root: '',
      });

      if (existsSync(filePath)) {
        unlinkSync(filePath);
      }
    } else {
      throw new Error(
        '(Logger) Class must be initialized to be able to delete the log file.'
      );
    }
  }

  private logger: Winston;
  private label: string | null = null;

  constructor() {
    if (Logger.initialized) {
      this.logger = createLogger(this.getLoggerConfig());
    } else {
      throw new Error('(Logger) Class must be initialized.');
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

  public logQuery(
    query: string,
    parameters?: any[],
    queryRunner?: import('typeorm').QueryRunner
  ) {
    this.logger.silly(
      `${query} ${parameters ? `Parameters: ${parameters}` : ''}`
    );
  }

  public logQueryError(
    error: string,
    query: string,
    parameters?: any[],
    queryRunner?: import('typeorm').QueryRunner
  ) {
    this.error(`${error} ${query}`);
  }

  public logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: import('typeorm').QueryRunner
  ) {
    this.warn(
      `${time}: ${query} ${parameters ? `Parameters: ${parameters}` : ''}`
    );
  }

  public logSchemaBuild(
    message: string,
    queryRunner?: import('typeorm').QueryRunner
  ) {
    this.info(message);
  }

  public logMigration(
    message: string,
    queryRunner?: import('typeorm').QueryRunner
  ) {
    this.info(message);
  }

  public log(
    level: 'log' | 'info' | 'warn',
    message: any,
    queryRunner?: import('typeorm').QueryRunner
  ) {
    switch (level) {
      case 'log':
        this.logger.silly(message);
        break;
      case 'info':
        this.logger.silly(message);
        break;
      case 'warn':
        this.warn(message);
        message;
        break;
    }
  }

  private getLoggerConfig() {
    return {
      transports: [
        Logger.initialized
          ? new transports.File(this.getFileTransportOptions())
          : null,
        new transports.Console(this.getConsoleTransportOptions()),
      ].filter((t) => !!t),
    };
  }

  private getConsoleTransportOptions() {
    const colorizeFormat = format.colorize({ colors: { label: 'gray' } });

    return {
      level: 'info',
      format: format.combine(
        format.metadata(),
        format.printf((info) => {
          return (
            '[' +
            colorizeFormat.colorize(
              info.level,
              `${Case.constant(info.level)}`
            ) +
            '] ' +
            colorizeFormat.colorize('label', new Date().toLocaleTimeString()) +
            colorizeFormat.colorize(
              'label',
              `${this.label ? ` (${this.label}) ` : ' '}`
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
      ext: '',
      name: '',
      root: '',
    });

    return {
      filename: filePath,
      level: 'silly',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({ stack: true }),
        format.label({ label: this.label }),
        format.simple()
      ),
    };
  }
}
