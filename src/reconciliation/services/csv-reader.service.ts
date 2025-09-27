import { Injectable } from '@nestjs/common';
import {
  SourceTransaction,
  SystemTransaction,
} from '../../types/transaction.types';

@Injectable()
export class CsvReaderService {
  readSourceTransactions(): Promise<SourceTransaction[]> {
    // TODO: Implement CSV reading for source transactions
    // Will read from data/source_transactions.csv
    throw new Error('Not implemented yet');
  }

  readSystemTransactions(): Promise<SystemTransaction[]> {
    // TODO: Implement CSV reading for system transactions
    // Will read from data/system_transactions.csv
    throw new Error('Not implemented yet');
  }
}
