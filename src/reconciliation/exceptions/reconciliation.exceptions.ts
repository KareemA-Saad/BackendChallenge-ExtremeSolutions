import { HttpException, HttpStatus } from '@nestjs/common';

export class FileNotFoundError extends HttpException {
  constructor(fileName: string) {
    super(
      {
        success: false,
        timestamp: new Date().toISOString(),
        error: 'File Not Found',
        message: `Required file not found: ${fileName}`,
        code: 'FILE_NOT_FOUND',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class CsvParsingError extends HttpException {
  constructor(fileName: string, details: string) {
    super(
      {
        success: false,
        timestamp: new Date().toISOString(),
        error: 'CSV Parsing Error',
        message: `Failed to parse CSV file: ${fileName}. ${details}`,
        code: 'CSV_PARSING_ERROR',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class ReconciliationProcessError extends HttpException {
  constructor(details: string) {
    super(
      {
        success: false,
        timestamp: new Date().toISOString(),
        error: 'Reconciliation Process Error',
        message: `Reconciliation process failed: ${details}`,
        code: 'RECONCILIATION_ERROR',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
