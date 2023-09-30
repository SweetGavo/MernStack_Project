<html lang="en">
  <%- include("./partial/header.ejs") %>
  <body>
    <%- include("./partial/navbar.ejs") %>

    <div class="containerss">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6 registers">
          <div class="text-center">
            <h1>Sign In</h1>
          </div>
          <form action="/users/login" method="POST">
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
              />
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
          <hr />
          <p>Don't have an account? <a href="/register">SIGN UP</a></p>
        </div>
        <div class="col-md-3"></div>
      </div>
    </div>
  </body>
</html>
