ConnectVersa is a project built with a Node.js and Express.js backend and a MongoDB database. The backend handles user authentication, where users can register or log in using their email, username, and password. Passwords are securely stored in the database using bcrypt.

If a user forgets their password, they can use the "Forgot Password" feature. The backend will send a password reset link to the user's email using Nodemailer. The reset link includes a token generated by the crypto library, which is temporarily stored in the database. When the user clicks the link and enters a new password, the backend verifies the token and updates the password in the database.

The project also includes a "Remember Me" feature. If selected, the backend stores the user's email and password in a cookie, keeping them logged in for 30 days. Additionally, users can toggle the visibility of the password input while registering or logging in.

The frontend of the project is built with React.js and styled using Tailwind CSS, ensuring a responsive and user-friendly interface. Upon successful login, users are redirected to the dashboard
