import type { NextApiRequest, NextApiResponse } from 'next';

// Mock data store (in production, this would be a database)
let billingData = {
  invoices: [
    {
      id: "inv-001",
      invoiceNumber: "INV-2024-001",
      type: "income",
      clientName: "National Treasury",
      clientEmail: "procurement@treasury.go.ke",
      clientAddress: "Treasury Building, Nairobi",
      description: "Q1 Grant Disbursement - Civic Education Program",
      items: [
        { id: "item-001", description: "Civic Education Workshop Series", quantity: 20, unitPrice: 50000, amount: 1000000 },
        { id: "item-002", description: "Materials and Supplies", quantity: 1, unitPrice: 250000, amount: 250000 }
      ],
      subtotal: 1250000,
      taxRate: 0,
      taxAmount: 0,
      total: 1250000,
      currency: "KES",
      status: "paid",
      issueDate: "2024-01-15",
      dueDate: "2024-01-30",
      paidDate: "2024-01-28",
      paymentMethod: "Bank Transfer",
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-28T14:30:00Z"
    }
  ],
  expenses: [
    {
      id: "exp-001",
      title: "Cloud Hosting - DigitalOcean",
      description: "Monthly cloud infrastructure costs",
      category: "hosting",
      amount: 264,
      currency: "USD",
      date: "2024-03-01",
      vendor: "DigitalOcean",
      status: "approved",
      isRecurring: true,
      recurringFrequency: "monthly",
      createdAt: "2024-03-01T00:00:00Z",
      updatedAt: "2024-03-05T10:00:00Z"
    }
  ],
  techBills: [
    {
      id: "tech-001",
      name: "DigitalOcean Cloud Hosting",
      category: "hosting",
      provider: "DigitalOcean",
      description: "Production and staging servers, databases",
      cost: 264,
      currency: "USD",
      billingFrequency: "monthly",
      nextBillingDate: "2024-04-01",
      lastBillingDate: "2024-03-01",
      autoRenew: true,
      status: "active",
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2024-03-01T00:00:00Z"
    }
  ]
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Return all billing data
      res.status(200).json({
        success: true,
        data: billingData
      });
      break;

    case 'POST':
      // Create new invoice, expense, or tech bill
      const { entity, data } = req.body;
      console.log(`[API] Creating new ${entity}:`, data);

      if (entity === 'invoice') {
        const newInvoice = { ...data, id: `inv-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        billingData.invoices.push(newInvoice);
        res.status(201).json({ success: true, data: newInvoice });
      } else if (entity === 'expense') {
        const newExpense = { ...data, id: `exp-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        billingData.expenses.push(newExpense);
        res.status(201).json({ success: true, data: newExpense });
      } else if (entity === 'techbill') {
        const newTechBill = { ...data, id: `tech-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        billingData.techBills.push(newTechBill);
        res.status(201).json({ success: true, data: newTechBill });
      } else {
        res.status(400).json({ success: false, error: 'Invalid entity type' });
      }
      break;

    case 'PUT':
      // Update existing invoice, expense, or tech bill
      const { entity: updateEntity, id, data: updateData } = req.body;
      console.log(`[API] Updating ${updateEntity} ${id}:`, updateData);

      if (updateEntity === 'invoice') {
        const index = billingData.invoices.findIndex(i => i.id === id);
        if (index !== -1) {
          billingData.invoices[index] = { ...billingData.invoices[index], ...updateData, updatedAt: new Date().toISOString() };
          res.status(200).json({ success: true, data: billingData.invoices[index] });
        } else {
          res.status(404).json({ success: false, error: 'Invoice not found' });
        }
      } else if (updateEntity === 'expense') {
        const expIndex = billingData.expenses.findIndex(e => e.id === id);
        if (expIndex !== -1) {
          billingData.expenses[expIndex] = { ...billingData.expenses[expIndex], ...updateData, updatedAt: new Date().toISOString() };
          res.status(200).json({ success: true, data: billingData.expenses[expIndex] });
        } else {
          res.status(404).json({ success: false, error: 'Expense not found' });
        }
      } else if (updateEntity === 'techbill') {
        const techIndex = billingData.techBills.findIndex(t => t.id === id);
        if (techIndex !== -1) {
          billingData.techBills[techIndex] = { ...billingData.techBills[techIndex], ...updateData, updatedAt: new Date().toISOString() };
          res.status(200).json({ success: true, data: billingData.techBills[techIndex] });
        } else {
          res.status(404).json({ success: false, error: 'Tech bill not found' });
        }
      } else {
        res.status(400).json({ success: false, error: 'Invalid entity type' });
      }
      break;

    case 'DELETE':
      // Delete invoice, expense, or tech bill
      const { entity: deleteEntity, id: deleteId } = req.query;
      console.log(`[API] Deleting ${deleteEntity} ${deleteId}`);

      if (deleteEntity === 'invoice') {
        billingData.invoices = billingData.invoices.filter(i => i.id !== deleteId);
        res.status(200).json({ success: true });
      } else if (deleteEntity === 'expense') {
        billingData.expenses = billingData.expenses.filter(e => e.id !== deleteId);
        res.status(200).json({ success: true });
      } else if (deleteEntity === 'techbill') {
        billingData.techBills = billingData.techBills.filter(t => t.id !== deleteId);
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ success: false, error: 'Invalid entity type' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
