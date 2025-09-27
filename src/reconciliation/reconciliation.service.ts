import { Injectable } from '@nestjs/common';
import { CsvReaderService } from './services/csv-reader.service';
import { ReconcilerService } from './services/reconciler.service';
import { ReconciliationResult } from './models/reconciliation-result.model';
import { ReconciliationProcessError } from './exceptions/reconciliation.exceptions';

@Injectable()
export class ReconciliationService {
  constructor(
    private readonly csvReaderService: CsvReaderService,
    private readonly reconcilerService: ReconcilerService,
  ) {}

  async reconcileTransactions(): Promise<ReconciliationResult> {
    try {
      const sourceTransactions =
        await this.csvReaderService.readSourceTransactions();
      const systemTransactions =
        await this.csvReaderService.readSystemTransactions();

      if (!sourceTransactions.length && !systemTransactions.length) {
        throw new ReconciliationProcessError('Both transaction files are empty');
      }

      return this.reconcilerService.reconcile(
        sourceTransactions,
        systemTransactions,
      );
    } catch (error) {
      // Re-throw our custom exceptions
      if (error.name === 'FileNotFoundError' || 
          error.name === 'CsvParsingError' || 
          error.name === 'ReconciliationProcessError') {
        throw error;
      }
      // Wrap unknown errors
      throw new ReconciliationProcessError(`Unexpected error: ${error.message}`);
    }
  }
}
