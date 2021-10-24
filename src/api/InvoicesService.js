import http from '@/api/http';

class InvoicesService {
  baseAPI = '/invoices'

  getAll() {
    return http.get(this.baseAPI);
  }

  get(id) {
    if (!id) throw new Error('id is required to get the invoice');
    return http.get(`${this.baseAPI}/${id}`);
  }

  create (invoice) {
    return http.post(this.baseAPI, invoice);
  }

  update (id, invoice) {
    invoice.amount = invoice.items.map(i => i.subtotal || 0).reduce((a, b) => a + b, 0);
    return http.put(`${this.baseAPI}/${id}`, invoice);
  }

  delete (id) {
    if (!id) throw new Error('id is required to delete');
    return http.delete(`${this.baseAPI}/${id}`);
  }
}

export default new InvoicesService();
