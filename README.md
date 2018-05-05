# Graduation Project
An email client for phishing detection and sensitive words filtering.

## Phase 1: Setup ENV --> A Simple Client
### steps
1. nodejs + js + prettier/eslint ✓
2. receive mail: node-imap ✓
3. react + webpack ✓
### target
1. Receiving emails ✓
2. A server based on Koa for receiving emails
   (With Restful api available) ✓
3. PostgreSQL for mails local storage ✓
4. Change view style through Semantic UI ✓

## Phase 2: Login/out
### steps
1. Server Refactor: redefine api and func for login, fetch, logout
2. A restful api for receiving login info.  
   Server side should connect to the related mail server to fetch mails and store them in DB.
3. There is another button to for sending the received mails to the training model system to do classification.
4. Another api for fetching data from DB, usually for frontend when it has logged in and want to fetch all mails.
6. A logout api: when user logout, the data in DB should be deleted.
7. Now we don't care the data consistency, we just fetch mails from 3rd server and do filering and display the result to users.
### target
1. A button for login ✓
2. A button for log out ✓
3. A button for filtering ✓
4. A button for fetch all mails ✓
5. Display the filtering result ✓

## Phase 3: Work for the team: An Info Extraction UI Component & An Algorithm Monitor UI Component
### steps
1. Use superagent to fetch data.
2. Use componentDidMount and componentWillUnmount funcs to fetch data once per minute.
3. Use Semantic UI to arrange display.
### target
1. Four columns to for installation, uninstallation, calling, upgrading.
2. Update data every minute.