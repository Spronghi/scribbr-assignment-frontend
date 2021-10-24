# Frontend Scribbr Assignment
This is a Vue.js project made using the Composition API and TailwindCSS for the Scribbr frontend assignment.

It contains three main views:
 - `<base-url>`: this is the entry point of the system, it contains a list of invoices and the possibility to manage them. If clicked on the status is possible to update it, if clicked on the trash icon is possibile to delete the invoice, if clicked on the mail icon, it will fake to send an email;
 - `<base-url>/invoice/:id`: contains the overview of the single invoice. You can edit the status by clicking on it, or add items linked to the invoice;
 - `<base-url>/create-invoice`: it let's you create a new invoice.

The web app is very simple, I tried to make it as modular as possible and I didn't used a Vue.js UX library, so you can determinate my skill set.
I didn't implemented a test suite for it, I am sorry but please consider that I worked on this web app almost 4 hours.

## Project setup NPM
You can run the application using NPM

```
npm install
npm run serve
```

The app will be available at `http://localhost:8080/` and expect the server to be listening on `http://localhost:3000/`

## Improvements
A lot of improvements could be done:
 - at the moment there is not validation on forms, the validation is made only in the backends, but no warning are sent to the users, so it's not very user friendly;
 - test suite should be included as soon as possible.