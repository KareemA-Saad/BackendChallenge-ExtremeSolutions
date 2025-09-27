import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { parse } from 'csv-parse/sync';
import * as path from 'path';
import {
  SourceTransaction,
  SystemTransaction,
} from '../../types/transaction.types';
import { FileNotFoundError, CsvParsingError } from '../exceptions/reconciliation.exceptions';

@Injectable()
export class CsvReaderService {
  private readonly dataPath = path.join(process.cwd(), 'data');

  async readSourceTransactions(): Promise<SourceTransaction[]> {
    const fileName = 'source_transactions.csv';
    try {
      const filePath = path.join(this.dataPath, fileName);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      
      const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
      });

      return records.map((record: any) => ({
        providerTransactionId: record.providerTransactionId,
        email: record.email,
        userId: record.userId,
        provider: record.provider,
        amount: parseFloat(record.amount),
        currency: record.currency,
        status: record.status,
        transactionType: record.transactionType,
        paymentMethod: record.paymentMethod,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
        providerReference: record.providerReference,
        fraudRisk: record.fraudRisk,
        details_invoiceId: record.details_invoiceId,
        details_customerName: record.details_customerName,
        details_description: record.details_description,
      }));
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new FileNotFoundError(fileName);
      }
      throw new CsvParsingError(fileName, error.message);
    }
  }

  async readSystemTransactions(): Promise<SystemTransaction[]> {
    const fileName = 'system_transactions.csv';
    try {
      const filePath = path.join(this.dataPath, fileName);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      
      const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
      });

      return records.map((record: any) => ({
        transactionId: record.transactionId,
        userId: record.userId,
        amount: parseFloat(record.amount),
        currency: record.currency,
        status: record.status,
        paymentMethod: record.paymentMethod,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
        referenceId: record.referenceId,
        metadata_orderId: record.metadata_orderId,
        metadata_description: record.metadata_description,
      }));
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new FileNotFoundError(fileName);
      }
      throw new CsvParsingError(fileName, error.message);
    }
  }
}
