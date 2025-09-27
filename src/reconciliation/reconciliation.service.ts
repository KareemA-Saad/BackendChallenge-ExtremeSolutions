import { Injectable } from '@nestjs/common';
import { CsvReaderService } from './services/csv-reader.service';
import { ReconcilerService } from './services/reconciler.service';
import { ReconciliationResult } from './models/reconciliation-result.model';

@Injectable()
export class ReconciliationService {
  constructor(
    private readonly csvReaderService: CsvReaderService,
    private readonly reconcilerService: ReconcilerService,
  ) {}

  async reconcileTransactions(): Promise<ReconciliationResult> {
    // Step 1: Read both CSV files
    const sourceTransactions =
      await this.csvReaderService.readSourceTransactions();
    const systemTransactions =
      await this.csvReaderService.readSystemTransactions();

    // Step 2: Perform reconciliation
    const result = this.reconcilerService.reconcile(
      sourceTransactions,
      systemTransactions,
    );

    return result;
  }
}
