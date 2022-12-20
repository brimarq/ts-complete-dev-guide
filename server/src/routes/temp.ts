import { Router, Request, Response, NextFunction } from "express";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send("Not permitted");
}

const router = Router();

router.get("/", (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <div>You are logged in</div>
        <a href="/logout">Logout</a>
      </div>
    `);
  } else {
    res.send(`
      <div>
        <div>You are not logged in</div>
        <a href="/login">Login</a>
      </div>
    `);
  }
});

router.get("/login", (req: Request, res: Response) => {
  res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email">
      </div>
      <div>
        <label>Pasword</label>
        <input name="password" type="password">
      </div>
      <button>Submit</button>
    </form>
  `);
});

router.post("/login", (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;
  if (email && password && email === "hi@hi.com" && password === "password") {
    req.session = { loggedIn: true };
    res.redirect("/");
  } else {
    res.send("Invalid email or password");
  }
});

@controller("/auth") // mark as controller, add a prefix to routes
class LoginController {
  @get("/login") // associate method with router
  getLogin(req: Request, res: Response): void {
    res.send("form");
  }

  @post("/login") // associate method with router
  @validateBody("email", "password") // validation and catch errors
  @use(requireAuth) // middleware for auth
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body;
    if (email && password && email === "hi@hi.com" && password === "password") {
      req.session = { loggedIn: true };
      res.redirect("/");
    } else {
      res.send("Invalid email or password");
    }
  }
}

function post(routeName: string) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    router.post(routeName, target[key]);
  };
}

function use(middleware: any) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    router.addMiddewareToHandlerWeJustCreated(middleware);
  };
}

router.get("/logout", (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect("/");
});

router.get("/protected", requireAuth, (req: Request, res: Response) => {
  res.send("Welcome to protected route, logged in user");
});

export { router };
