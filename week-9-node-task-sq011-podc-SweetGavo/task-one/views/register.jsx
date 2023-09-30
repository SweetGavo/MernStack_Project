<html lang="en">
  <%- include("./partial/header.ejs") %>
  <body>
    <%- include("./partial/navBar.ejs") %>

    <div class="containerss">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6 registers">
          <div class="text-center">
            <h1>Register</h1>
          </div>
          <form action="/users/register" method="POST">
            <div class="form-group">
              <label for="username">Firstname</label>
              <input
                type="text"
                class="form-control"
                id="username"
                name="firstName"
                placeholder="Firstname"
                required
              />
            </div>
            <div class="form-group">
              <label for="username">Lastname</label>
              <input
                type="text"
                class="form-control"
                id="username"
                name="lastName"
                placeholder="Lastname"
                required
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
                required
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                name="password"
                placeholder="Enter password"
                required
                pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                required
              />
            </div>
            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input
                type="password"
                class="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                required
              />
            </div>
            <div class="form-group">
              <label for="dob">Date of birth:</label>
              <input type="date" id="birthday" name="dob" required />
            </div>
            <div class="form-group">
              <label for="phone">Phone</label>
              <input
                type="text"
                class="form-control"
                id="phone"
                name="phone"
                placeholder="Enter phone"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
          </form>
          <hr />
          <p> Already have an account? <a href="/login">Login</a></p>
        </div>
        <div class="col-md-3"></div>
      </div>
    </div>
  </body>
</html>
