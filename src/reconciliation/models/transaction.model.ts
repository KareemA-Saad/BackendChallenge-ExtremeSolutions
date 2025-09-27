import {
  SourceTransaction,
  SystemTransaction,
} from '../../types/transaction.types';

// Re-export types for convenience
export type { SourceTransaction, SystemTransaction };

// Simple transaction for internal use
export class Transaction {
  constructor(
    public id: string,
    public userId: string,
    public amount: number,
    public currency: string,
    public status: string,
  ) {}

  // Helper method to create from source transaction
  static fromSource(source: SourceTransaction): Transaction {
    return new Transaction(
      source.providerTransactionId,
      source.userId,
      source.amount,
      source.currency,
      source.status,
    );
  }

  // Helper method to create from system transaction
  static fromSystem(system: SystemTransaction): Transaction {
    return new Transaction(
      system.transactionId,
      system.userId,
      system.amount,
      system.currency,
      system.status,
    );
  }
}
