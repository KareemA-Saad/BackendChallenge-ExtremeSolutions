// Basic transaction types for our reconciliation service

export interface SourceTransaction {
  providerTransactionId: string;
  email: string;
  userId: string;
  provider: string;
  amount: number;
  currency: string;
  status: string;
  transactionType: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  providerReference: string;
  fraudRisk: string;
  details_invoiceId: string;
  details_customerName: string;
  details_description: string;
}

export interface SystemTransaction {
  transactionId: string;
  userId: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  referenceId: string;
  metadata_orderId: string;
  metadata_description: string;
}

// Common transaction interface for comparison
export interface BaseTransaction {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: string;
}
