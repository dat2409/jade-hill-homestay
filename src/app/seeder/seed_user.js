var seeder = require('mongoose-seed');
const bcrypt = require('bcrypt');

const password = '123456'
const hash = bcrypt.hashSync(password, 10);

seeder.connect('mongodb://localhost:27017/jade_hill_homestay', function () {
  seeder.loadModels([
    '../models/user.js'
  ])


  seeder.clearModels('User', function () {
    seeder.populateModels(data, function () {
      seeder.disconnect();
    })
  })
});

var data = [
  {
    'model': 'User',
    'documents': [
      {
        'email': 'managerSample@gmail.com',
        'password': hash,
        'role': 'Manager',
        'first_name': 'Dat',
        'last_name': 'Thai Doan',
        'phone_num': '19001009'
      }
    ]
  }
]
