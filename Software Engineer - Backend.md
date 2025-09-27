

# Hiring Challenge

## **Software Engineer \- Backend** **2025/Q3**

## **Challenge**

Build a transaction reconciliation service or function that reads transactions from two provided JSON files—one representing an external source and the other representing an internal system. Your task is to compare these datasets, identify discrepancies, and generate a structured reconciliation report.

You are free to use either Go or Nodejs to do this challenge.

### **What you need to do**

1. Read transactions from two provided [CSV files](#supporting-documents):  
   * source\_transactions.csv (simulating transactions from an external provider like Stripe/PayPal).  
   * system\_transactions.csv (simulating internal transaction records).  
2. Perform **reconciliation** between the two datasets to identify:  
   * Transactions missing in the internal system.  
   * Transactions missing in the external source.  
   * Mismatched amounts or statuses.  
3. Implement a function that processes these files and outputs a reconciliation result.

### **Requirements**

1. Process Transactions from CSV files  
   1. Your function should read and parse transactions from the provided CSV files.  
2. Implement Reconciliation Logic  
   1. Develop a function that:  
* **Finds Missing Transactions:**  
  * Transactions that exist in the **source file** but not in the internal system.  
  * Transactions that exist **internally** but not in the source file.  
* **Finds Mismatched Transactions:**  
  * Transactions with the **same ID** but **different amounts**.  
  * Transactions with the **same ID** but **different statuses**.  
3. Present Reconciliation Results  
   1. Expected Output:

```javascript
{
  "missing_in_internal": [
    { "providerTransactionId": "txn_99999", "amount": 200.00, "currency": "USD", "status": "succeeded" }
  ],
  "missing_in_source": [
    { "transactionId": "txn_77777", "amount": 50.00, "currency": "USD", "status": "completed" }
  ],
  "mismatched_transactions": [
    {
      "transactionId": "txn_12345",
      "discrepancies": {
        "amount": { "source": 150.00, "system": 145.00 },
        "status": { "source": "succeeded", "system": "completed" }
      }
    }
  ]
}
```

### **Supporting Documents** {#supporting-documents}

* [source\_transactions.csv](https://drive.google.com/file/d/1J6OSNLmU6TOqrAeX7HpyIBFWx0xjrCDZ/view?usp=sharing)  
* [system\_transactions.csv](https://drive.google.com/file/d/1r0EZ2-lIVgtgxHvLlbq0nZEvTd_Uexy8/view?usp=drive_link)

## **Submission**

A Git repository containing:

* The service or function code.  
* A clear commit history.  
* A README with setup instructions, technical design rationale, and your code review notes.