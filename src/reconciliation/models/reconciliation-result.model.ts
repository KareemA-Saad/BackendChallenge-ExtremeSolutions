import {
  SourceTransaction,
  SystemTransaction,
} from '../../types/transaction.types';

// Result models matching the required output format
export interface MismatchedTransaction {
  transactionId: string;
  discrepancies: {
    amount?: {
      source: number;
      system: number;
    };
    status?: {
      source: string;
      system: string;
    };
  };
}

export interface ReconciliationResult {
  missing_in_internal: SourceTransaction[];
  missing_in_source: SystemTransaction[];
  mismatched_transactions: MismatchedTransaction[];
}

// Simple class to build the result
export class ReconciliationResultBuilder {
  private result: ReconciliationResult = {
    missing_in_internal: [],
    missing_in_source: [],
    mismatched_transactions: [],
  };

  addMissingInInternal(transaction: SourceTransaction): void {
    this.result.missing_in_internal.push(transaction);
  }

  addMissingInSource(transaction: SystemTransaction): void {
    this.result.missing_in_source.push(transaction);
  }

  addMismatchedTransaction(mismatch: MismatchedTransaction): void {
    this.result.mismatched_transactions.push(mismatch);
  }

  build(): ReconciliationResult {
    return this.result;
  }
}
