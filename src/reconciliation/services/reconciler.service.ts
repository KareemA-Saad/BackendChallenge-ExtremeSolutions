import { Injectable } from '@nestjs/common';
import {
  SourceTransaction,
  SystemTransaction,
} from '../../types/transaction.types';
import { 
  ReconciliationResult, 
  ReconciliationResultBuilder 
} from '../models/reconciliation-result.model';

@Injectable()
export class ReconcilerService {
  reconcile(
    sourceTransactions: SourceTransaction[],
    systemTransactions: SystemTransaction[],
  ): ReconciliationResult {
    const resultBuilder = new ReconciliationResultBuilder();

    // Create lookup map for system transactions
    const systemTransactionMap = new Map<string, SystemTransaction>();
    for (const systemTx of systemTransactions) {
      systemTransactionMap.set(systemTx.transactionId, systemTx);
    }

    // Process source transactions: find missing and mismatched
    for (const sourceTx of sourceTransactions) {
      const matchingSystemTx = systemTransactionMap.get(sourceTx.providerTransactionId);
      
      if (!matchingSystemTx) {
        resultBuilder.addMissingInInternal(sourceTx);
      } else {
        this.checkForMismatches(sourceTx, matchingSystemTx, resultBuilder);
      }
    }

    // Create lookup map for source transactions
    const sourceTransactionMap = new Map<string, SourceTransaction>();
    for (const sourceTx of sourceTransactions) {
      sourceTransactionMap.set(sourceTx.providerTransactionId, sourceTx);
    }

    // Process system transactions: find missing in source
    for (const systemTx of systemTransactions) {
      const matchingSourceTx = sourceTransactionMap.get(systemTx.transactionId);
      
      if (!matchingSourceTx) {
        resultBuilder.addMissingInSource(systemTx);
      }
    }

    return resultBuilder.build();
  }

  private checkForMismatches(
    sourceTx: SourceTransaction,
    systemTx: SystemTransaction,
    resultBuilder: ReconciliationResultBuilder,
  ): void {
    const discrepancies: any = {};

    // Check for amount mismatch
    if (sourceTx.amount !== systemTx.amount) {
      discrepancies.amount = {
        source: sourceTx.amount,
        system: systemTx.amount,
      };
    }

    // Check for status mismatch
    if (sourceTx.status !== systemTx.status) {
      discrepancies.status = {
        source: sourceTx.status,
        system: systemTx.status,
      };
    }

    // If we found any discrepancies, add to result
    if (Object.keys(discrepancies).length > 0) {
      resultBuilder.addMismatchedTransaction({
        transactionId: sourceTx.providerTransactionId,
        discrepancies,
      });
    }
  }
}
