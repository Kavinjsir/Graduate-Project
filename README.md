# Graduation Project
An email client for phishing detection and sensitive words filtering.

## Phase 1: Setup ENV --> A Simple Client
### steps
1. nodejs + js + prettier/eslint ✓
2. receive mail: node-imap ✓
3. send mail: nodemailer ✓
3. react + webpack ✓
4. electron ✓
### target
1. Receiving emails ✓
2. Send emails ✓
3. A server based on Koa for sending/receiving emails
   (With Restful api available) ✓
4. PostgreSQL for mails local storage ✓
5. Change view style through Semantic UI ✓

## Phase 2: Login/out
### steps
1. Server Refactor: redefine api and func for login, fetch, send, logout
2. A new page at frontend for welcome and login.
   User input his/her necessary mail info.
   The frontend then transport it to the server side.
3. A restful api for receiving login info.
   Server side should connect to the related mail server to fetch mails and store them in DB.
4. By the time server fetching mails from 3rd mail server, it should also send the received mails to trainging model system to do classification.
5. Another api for fetching data from DB, usually for frontend when it has login and want to fetch all mails.
6. A logout api: when user logout, the data in DB should be deleted.
7. Now we don't care the data consistency, we just fetch mails from 3rd server and do filering and display the result to users.
### target
1. A welcome page for login
2. A button for log out
3. Display the filtering result