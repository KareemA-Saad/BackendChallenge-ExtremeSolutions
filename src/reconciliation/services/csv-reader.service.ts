import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { parse } from 'csv-parse/sync';
import * as path from 'path';
import {
  SourceTransaction,
  SystemTransaction,
} from '../../types/transaction.types';

@Injectable()
export class CsvReaderService {
  private readonly dataPath = path.join(process.cwd(), 'data');

  async readSourceTransactions(): Promise<SourceTransaction[]> {
    try {
      const filePath = path.join(this.dataPath, 'source_transactions.csv');
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
      throw new Error(`Failed to read source transactions: ${error.message}`);
    }
  }

  async readSystemTransactions(): Promise<SystemTransaction[]> {
    try {
      const filePath = path.join(this.dataPath, 'system_transactions.csv');
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
      throw new Error(`Failed to read system transactions: ${error.message}`);
    }
  }
}
