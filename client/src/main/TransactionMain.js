import { makeAutoObservable } from "mobx";

export default class TransactionMain {
  constructor() {
    this._types = [];
    this._categories = [];
    this._transactions = [];
    this._selectedType = {};
    this._selectedCategory = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 12;
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }
  setCategories(categories) {
    this._categories = categories;
  }
  setTransactions(transactions) {
    this._transactions = transactions;
  }

  setSelectedType(type) {
    this.setPage(1);
    this._selectedType = type;
  }
  setSelectedCategory(category) {
    this.setPage(1);
    this._selectedCategory = category;
  }
  setPage(page) {
    this._page = page;
  }
  setTotalCount(count) {
    this._totalCount = count;
  }

  get types() {
    return this._types;
  }
  get categories() {
    return this._categories;
  }
  get transactions() {
    return this._transactions;
  }
  get selectedType() {
    return this._selectedType;
  }
  get selectedCategory() {
    return this._selectedCategory;
  }
  get totalCount() {
    return this._totalCount;
  }
  get page() {
    return this._page;
  }
  get limit() {
    return this._limit;
  }
}
