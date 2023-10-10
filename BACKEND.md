## Functions

### bot.js

<dt><a href="#botListen">botListen()</a> ⇒ <code>void</code></dt>
<dd><p>Listens for incoming messages from the Telegram bot API 
and sends an app link to the user when they type /start</p>
</dd>
<dt><a href="#sendNotification">sendNotification(chatId, userName)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Sends a notification message to a Telegram user with a link to the app.
This function does not throw an error if user has blocked the bot.</p>
</dd>

### tests.controller.js

<dt><a href="#createTest">createTest(req, res)</a> ⇒ <code>Object</code></dt>
<dd><p>This function creates a new test for a user. The user must be authorized 
using a Telegram Web App data token in the <code>Authorization</code> header of the HTTP request. 
The test data is provided in the request body as a JSON object with a <code>questions</code> property 
that contains an array of test questions. Refer to OpenAPI schema for details.
The function creates a new <code>Test</code> document in the database and associates it 
with the user by adding the <code>Test</code> document ID to the <code>test_ids</code> array of the user document. 
If the user has already created a test, the function returns a <code>403</code> error.</p>
</dd>
<dt><a href="#sendAnswer">sendAnswer(req, res)</a> ⇒ <code>Array</code></dt>
<dd><p>This function registers an answer and returns results. 
The user must be authorized using a Telegram Web App data token 
in the <code>Authorization</code> header of the HTTP request. 
The test ID is provided in the request body as a JSON object with a <code>test_id</code> property. 
The function retrieves the <code>Test</code> document from the database and sends a notification 
to the test owner with the name of the user who passed the test. 
The function returns an array of test results.</p>
</dd>
<dt><a href="#getTest">getTest(req, res)</a> ⇒ <code>Object</code></dt>
<dd><p>This function retrieves a test by its ID. The user must be authorized 
using a Telegram Web App data token in the <code>Authorization</code> header of the HTTP request. 
The test ID is provided in the URL path.
The function retrieves the <code>Test</code> document from the database and returns it as a JSON object.
If the user is not the owner of the test, the function returns a <code>403</code> error.</p>
</dd>
<dt><a href="#getQuestions">getQuestions(req, res)</a> ⇒ <code>Array</code></dt>
<dd><p>This function retrieves the questions for a test. 
The user must be authorized using a Telegram Web App data token 
in the <code>Authorization</code> header of the HTTP request. 
The test ID is provided in the URL path. 
The function retrieves the <code>Test</code> document from the database 
and returns an array of question objects.
If the user is the owner of the test or has already taken the test, 
the function returns a <code>403</code> error.</p>
</dd>
<dt><a href="#deleteTest">deleteTest(req, res)</a> ⇒ <code>Object</code></dt>
<dd><p>This function deletes a test by its ID. The user must be authorized 
using a Telegram Web App data token in the <code>Authorization</code> header of the HTTP request. 
The test ID is provided in the URL path. 
The function deletes the <code>Test</code> document from the database and returns a success message.
If the user is not the owner of the test, the function returns a <code>403</code> error.</p>
</dd>

### users.controller.js

<dt><a href="#init">init(req, res)</a> ⇒ <code>Object</code></dt>
<dd><p>This function initializes or looks up a user in the database. 
The user must be authorized using a Telegram Web App data token 
in the <code>Authorization</code> header of the HTTP request.
The function retrieves the user&#39;s Telegram ID and name from the token 
and creates a new <code>User</code> document in the database if one does not already exist. 
The function returns the <code>User</code> document and a boolean value indicating 
whether the user is new or not.</p>
</dd>

### utils/utils.js

<dt><a href="#verifyTelegramWebAppData">verifyTelegramWebAppData(telegramInitData)</a> ⇒ <code>boolean</code></dt>
<dd><p>Verifies the authenticity of Telegram Web App data 
by comparing the provided hash with a calculated hash.
<a href="https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app">https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app</a></p>
</dd>
<dt><a href="#getUserTgId">getUserTgId(telegramInitData)</a> ⇒ <code>number</code></dt>
<dd><p>Extracts the Telegram user ID from the provided Telegram Web App data.</p>
</dd>
<dt><a href="#getUserTgId">getUserTgId(telegramInitData)</a> ⇒ <code>string</code></dt>
<dd><p>Extracts the Telegram username from the provided Telegram Web App data.</p>
</dd>

<a name="botListen"></a>

## botListen() ⇒ <code>void</code>
Listens for incoming messages from the Telegram bot API 
and sends an app link to the user when they type /start

**Kind**: global function  
<a name="sendNotification"></a>

## sendNotification(chatId, userName) ⇒ <code>Promise.&lt;void&gt;</code>
Sends a notification message to a Telegram user with a link to the app.
This function does not throw an error if user has blocked the bot.

**Kind**: global function  
**Throws**:

- <code>Error</code> If the message fails to send.


| Param | Type | Description |
| --- | --- | --- |
| chatId | <code>number</code> | The ID of the Telegram chat to send the message to. |
| userName | <code>string</code> | The name of the user who finished the test. |

<a name="createTest"></a>

## createTest(req, res) ⇒ <code>Object</code>
This function creates a new test for a user. The user must be authorized 
using a Telegram Web App data token in the `Authorization` header of the HTTP request. 
The test data is provided in the request body as a JSON object with a `questions` property 
that contains an array of test questions. Refer to OpenAPI schema for details.
The function creates a new `Test` document in the database and associates it 
with the user by adding the `Test` document ID to the `test_ids` array of the user document. 
If the user has already created a test, the function returns a `403` error.

**Kind**: global function  
**Returns**: <code>Object</code> - The newly created test.  
**Throws**:

- <code>Error</code> If the user is not authorized or has already created a test.


| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | The HTTP request object. |
| req.headers.authorization | <code>Object</code> | The authorization token. |
| req.body | <code>Object</code> | The test data. |
| req.body.questions | <code>Array</code> | The test questions. |
| res | <code>Object</code> | The HTTP response object. |

<a name="sendAnswer"></a>

## sendAnswer(req, res) ⇒ <code>Array</code>
This function registers an answer and returns results. 
The user must be authorized using a Telegram Web App data token 
in the `Authorization` header of the HTTP request. 
The test ID is provided in the request body as a JSON object with a `test_id` property. 
The function retrieves the `Test` document from the database and sends a notification 
to the test owner with the name of the user who passed the test. 
The function returns an array of test results.

**Kind**: global function  
**Returns**: <code>Array</code> - The test results.  
**Throws**:

- <code>Error</code> If the user is not authorized or the test is not found.


| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | The HTTP request object. |
| req.headers.authorization | <code>Object</code> | The authorization token. |
| req.body | <code>Object</code> | The test ID. |
| req.body.test_id | <code>string</code> | The ID of the test. |
| res | <code>Object</code> | The HTTP response object. |

<a name="getTest"></a>

## getTest(req, res) ⇒ <code>Object</code>
This function retrieves a test by its ID. The user must be authorized 
using a Telegram Web App data token in the `Authorization` header of the HTTP request. 
The test ID is provided in the URL path.
The function retrieves the `Test` document from the database and returns it as a JSON object.
If the user is not the owner of the test, the function returns a `403` error.

**Kind**: global function  
**Returns**: <code>Object</code> - The test data.  
**Throws**:

- <code>Error</code> If the user is not authorized or the test is not found.


| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | The HTTP request object. |
| req.headers.authorization | <code>Object</code> | The authorization token. |
| req.params | <code>Object</code> | The URL parameters. |
| req.params.test_id | <code>string</code> | The ID of the test. |
| res | <code>Object</code> | The HTTP response object. |

<a name="getQuestions"></a>

## getQuestions(req, res) ⇒ <code>Array</code>
This function retrieves the questions for a test. 
The user must be authorized using a Telegram Web App data token 
in the `Authorization` header of the HTTP request. 
The test ID is provided in the URL path. 
The function retrieves the `Test` document from the database 
and returns an array of question objects.
If the user is the owner of the test or has already taken the test, 
the function returns a `403` error.

**Kind**: global function  
**Returns**: <code>Array</code> - The test questions.  
**Throws**:

- <code>Error</code> If the user is not authorized or the test is not found.


| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | The HTTP request object. |
| req.headers.authorization | <code>Object</code> | The authorization token. |
| req.params | <code>Object</code> | The URL parameters. |
| req.params.test_id | <code>string</code> | The ID of the test. |
| res | <code>Object</code> | The HTTP response object. |

<a name="deleteTest"></a>

## deleteTest(req, res) ⇒ <code>Object</code>
This function deletes a test by its ID. The user must be authorized 
using a Telegram Web App data token in the `Authorization` header of the HTTP request. 
The test ID is provided in the URL path. 
The function deletes the `Test` document from the database and returns a success message.
If the user is not the owner of the test, the function returns a `403` error.

**Kind**: global function  
**Returns**: <code>Object</code> - A success message.  
**Throws**:

- <code>Error</code> If the user is not authorized or the test is not found.


| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | The HTTP request object. |
| req.headers.authorization | <code>Object</code> | The authorization token. |
| req.params | <code>Object</code> | The URL parameters. |
| req.params.test_id | <code>string</code> | The ID of the test. |
| res | <code>Object</code> | The HTTP response object. |

<a name="init"></a>

## init(req, res) ⇒ <code>Object</code>
This function initializes or looks up a user in the database. 
The user must be authorized using a Telegram Web App data token 
in the `Authorization` header of the HTTP request.
The function retrieves the user's Telegram ID and name from the token 
and creates a new `User` document in the database if one does not already exist. 
The function returns the `User` document and a boolean value indicating 
whether the user is new or not.

**Kind**: global function  
**Returns**: <code>Object</code> - The `User` document and a boolean value indicating whether the user is new or not.  
**Throws**:

- <code>Error</code> If the user is not authorized.


| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | The HTTP request object. |
| req.headers.authorization | <code>Object</code> | The authorization token. |
| res | <code>Object</code> | The HTTP response object. |

<a name="verifyTelegramWebAppData"></a>

## verifyTelegramWebAppData(telegramInitData) ⇒ <code>boolean</code>
Verifies the authenticity of Telegram Web App data 
by comparing the provided hash with a calculated hash.
https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app

**Kind**: global function  
**Returns**: <code>boolean</code> - Whether the data is authentic or not.  

| Param | Type | Description |
| --- | --- | --- |
| telegramInitData | <code>string</code> | The Telegram Web App data to verify. |

<a name="getUserTgId"></a>

## getUserTgId(telegramInitData) ⇒ <code>number</code>
Extracts the Telegram user ID from the provided Telegram Web App data.

**Kind**: global function  
**Returns**: <code>number</code> - The Telegram user ID.  

| Param | Type | Description |
| --- | --- | --- |
| telegramInitData | <code>string</code> | The Telegram Web App data to extract the user ID from. |

<a name="getUserTgId"></a>

## getUserTgId(telegramInitData) ⇒ <code>string</code>
Extracts the Telegram username from the provided Telegram Web App data.

**Kind**: global function  
**Returns**: <code>string</code> - The Telegram username.  

| Param | Type | Description |
| --- | --- | --- |
| telegramInitData | <code>string</code> | The Telegram Web App data to extract the username from. |

