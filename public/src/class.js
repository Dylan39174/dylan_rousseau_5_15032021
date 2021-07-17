class Item {
  constructor(id, name, url, price, lense, quant){
      this.id = id;
      this.name = name;
      this.url = url;
      this.price = price;
      this.lense = lense;
      this.quant = quant;
  }
}

class Contact {
  constructor (firstName, lastName, address, city, email){
      this.firstName = firstName;
      this.lastName = lastName;
      this.address = address;
      this.city = city;
      this.email = email;
  }
}

class obj {
  constructor (contact, products){
      this.contact = contact;
      this.products = products;
  }
}