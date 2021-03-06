# Bella [![Build Status](https://secure.travis-ci.org/chrisenytc/bella.png?branch=master)](https://travis-ci.org/chrisenytc/bella) [![Dependency Status](https://gemnasium.com/chrisenytc/bella.png)](https://gemnasium.com/chrisenytc/bella) [![NPM version](https://badge-me.herokuapp.com/api/npm/bella.png)](http://badges.enytc.com/for/npm/bella) [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/chrisenytc/bella/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

> A API Authentication for node.js

## Getting Started
Install the module with: `npm install bella`

```javascript
var bella = require('bella');
//Express.js
app.configure(function() {
  app.use(bella.init(mongoose, {connection: conn, uri: dbUri, status: true, model: userModel}));
  app.use(bella.authenticate('user'));
});
```

## Documentation

#### .init(mongoose, options)

**Parameter**: `mongoose`
**Type**: `Object`
**Example**: `var mongoose = require('mongoose');`


**Parameter**: `options`
**Type**: `Object`
**Example**: `{connection: conn, status: true, model: userModel}`


- **connection**: Mongoose connection
- **uri**: Database uri e.g: `mongo://localhost/belladb`
- **status**: if true required a property `status` with the value `true`
- **model**: your custom mongoose user model


The `init` is method responsible for initiating the module and set the Schema and create a model to be used by other methods.

How to use this method

```javascript
app.configure(function() {
  app.use(bella.init(mongoose, {connection: conn, uri: dbUri, status: true, model: userModel}));
});
```

#### .create(user, ip, domain, cb)

**Parameter**: `user`
**Type**: `ObjectID`
**Example**: `5349788398020b89c53c4297`


**Parameter**: `permissions`
**Type**: `Array`
**Example**: `['create_article']`


**Parameter**: `ip`
**Type**: `String`
**Example**: `127.0.0.1`


**Parameter**: `domain`
**Type**: `String`
**Example**: `example.com`


**Parameter**: `cb`
**Type**: `Function`
**Example**: `function(err, access_token) {};`


The `create` is method responsible for creating the access_tokens to be used by the authentication system.

How to use this method

```javascript
bella.create(req.user, ['create_article'], '127.0.0.1', 'example.com', function(err, access_token) {
   console.log('Token: ' + access_token);
});
```

#### .remove(access_token, cb)

**Parameter**: `access_token`
**Type**: `String`


**Parameter**: `cb`
**Type**: `Function`
**Example**: `function(err, access_token) {};`


The 'remove' method is responsible for removing users

How to use this method

```javascript
bella.remove('YOUR ACCESS TOKEN', function(err, access_token) {
   console.log('Token: ' + access_token + 'Deleted');
 });
```

#### .authenticate(permission)

**Parameter**: `permission`
**Type**: `String`
**Example**: `create_article`


The `authenticate` method is responsible for authenticating access the API.
Only users with Access Token, Domain, and IP authenticated can access the API.

How to use this method

```javascript
app.configure(function() {
   app.use(bella.init(mongoose, {connection: conn, uri: dbUri, status: true, model: userModel}));
   app.use(bella.authenticate('create_article'));
});

  //OR

app.get('/users', bella.authenticate('create_article'), ctrl);
```

## Contributing

Please submit all issues and pull requests to the [chrisenytc/bella](http://github.com/chrisenytc/bella) repository!

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/chrisenytc/bella/issues).

## License

The MIT License

Copyright (c) 2014, Christopher EnyTC

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
